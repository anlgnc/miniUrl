const db = require("../db/db_connection")

module.exports = class Links {
    constructor() {
        console.log("Model Çalıştı - " + Date())
    }

    // Link Kaydını Kontrol Et
    check_link(link) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT id
                 FROM url_links
                 WHERE link_short = ?`,
                [link],
                (err, result, fields) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        })
    }

    // Yeni Kayıt Ekleme
    async add_new(org_link, new_link, user_ip) {
        return new Promise((resolve, reject) => {
            // Original Link
            const firstLink = org_link;

            // New Link
            let shortLink = new_link;

            // Insert Date
            let date = Date.now();

            // User IP
            let ip = user_ip;

            const dbInsert = `INSERT INTO url_links (link_original, link_short, link_status, created_ip, created_date)
                              VALUES (?, ?, ?, ?, ?)`;

            const values = [firstLink, shortLink, 1, ip, date];

            // Insert
            db.query(dbInsert, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

    // Kaydı Getir
    async get_link(redirect_link) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT link_original
                 FROM url_links
                 WHERE link_short = ?
                   AND link_status = 1`,
                [redirect_link],
                (err, result, fields) => {

                    if (err) {
                        reject(false);
                    } else {
                        if (result.length > 0) {
                            return resolve(result[0].link_original)
                        } else {
                            return resolve(false);
                        }
                    }
                }
            );
        });
    }
}