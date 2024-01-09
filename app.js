'use strict';
const express = require("express")
const router = express.Router();

const bodyParser = require("body-parser")
const linksModel = require("./model/Links")
const routers = require("./routes/linker")

// Port
const PORT = process.env.PORT || 4444

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());

// Index
app.get('/', (req, res) => {
    res.render("index", {found_status: 1});
});

// Link Ekleme
app.use("/linker", require("./routes/linker"))

// Link Yönlendirme
app.get('/:link', async (req, res) => {
    const redirectLink = req.params.link;

    const linksModel = require("./model/Links");

    let link = new linksModel();

    let result = await link.get_link(redirectLink);

    if (result) {
        res.redirect(result);
    } else {
        res.render("index", {show_info: 1, found_status: 0});
    }

});

app.listen(PORT, () => console.log(`Çalışan Port: ${PORT}`));