function GetAllUrls(req, res) {
    res.status(200).send('Hello, World!')
}

function GenerateShortURL(req, res) {
    res.status(200).send('Hello, World!')
}

module.exports = {
    GetAllUrls,
    GenerateShortURL
}
