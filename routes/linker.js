const express = require("express")
const router = express.Router()
const linksModel = require("../model/Links")

// Random
function generateRandom(length = 2) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

// Kısa Link Fonksiyonu
async function uniqueShortLink(firstLink) {
    let isLinkUnique = false;

    let link = new linksModel();

    while (!isLinkUnique) {

        let shortLink = firstLink[firstLink.length - 2] + Date.now().toString().substring(7, 11) + firstLink[firstLink.length - 1] + generateRandom(2);

        const result = await link.check_link(shortLink);

        if (result.length === 0) {
            isLinkUnique = true;

            return shortLink;
        }
    }
}

// Link Oluşturma
router.post('/create', async (req, res) => {

    // Gelen Link
    const getUserLink = req.body.firstLink;

    // Yeni Link
    let shortLink = await uniqueShortLink(getUserLink);

    // Kullanıcı IP
    let getUserIp = req.socket.remoteAddress;

    // Model
    let link = new linksModel();

    // İşlem
    let result = await link.add_new(getUserLink, shortLink, getUserIp);

    if (result) {
        return res.status(200).json({
            response: "success", msg: "Link başarılı bir şekilde oluşturuldu.", data: shortLink
        });
    } else {
        return res.status(500).json({
            response: "error", msg: "Ooops! Bir sorun meydana geldi."
        });
    }

});

module.exports = router