const URL = require('../models/url.model')
const shortid = require('shortid')
// I didn't use nanoid because it doesn't support require function.
// And nanoid is the updated and currentlu maintaning version of shortid

const GetAllUrls = async (req, res) => {
    try {
        const urls = await URL.find({})
        if (urls.length === 0) {
            return res.render('index', { urls: 0 })
        }
        return res.render('index', { urls })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    // try {
    //     const urls = await URL.find({});
    //     if (!urls || urls.length === 0) {
    //         return res.status(404).json({ message: "URLs not found." });
    //     }
    //     return res.status(200).json(urls);
    // } catch (error) {
    //     return res.status(500).json({ message: "Internal server error.", error: error.message });
    // }
}

const GetUrlAnalytics = async (req, res) => {
    try {
        const { shortId } = req.params;
        if (!shortId) {
            return res.status(400).json({ error: "Please provide a valid Id." });
        }
        const analytics = await URL.findOne({ shortId });
        return res.status(200).json({
            totalClick: analytics.visitorsHistory.length,
            analytics: analytics.visitorsHistory
        });
    } catch (error) {
        return res.status(500).json({ error: "An internal server error occurred.", message: error.message });
    }
}

const GenerateShortURL = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const shortId = shortid.generate()
        if (!originalUrl) {
            return res.status(400).json({ error: "Please provide a valid URL." });
        }
        const shortUrl = await URL.create({ originalUrl, shortId, createdBy: req.user.id });
        return res.render('index', { id: shortId });
        // return res.status(201).json({ shortId });
    } catch (error) {
        return res.status(500).json({ error: "An internal server error occurred.", message: error.message });
    }
}

const GetUrlByIdAndUpdate = async (req, res) => {
    try {
        const { shortId } = req.params;
        if (!shortId) {
            return res.status(400).json({ error: "Please provide a valid short Id." });
        }
        const url = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitorsHistory: { timestamp: Date.now() }
                }
            }
        );
        if (!url || url.length === 0) {
            return res.status(404).json({ error: "URL not found." });
        }
        return res.redirect(url.originalUrl);
    } catch (error) {
        console.error("Error retrieving URL:", error);
        return res.status(500).json({ error: "An internal server error occurred." });
    }
}

module.exports = {
    GetAllUrls,
    GetUrlAnalytics,
    GenerateShortURL,
    GetUrlByIdAndUpdate
}
