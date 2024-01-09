const db = require("../db/db_connection")

db.connect(function (err) {
    if (err) throw err;

    console.log("Database Connection Success - " + Date());

    // Links Table
    let linkTable = `CREATE TABLE url_links
                     (
                         id            int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         link_original VARCHAR(255),
                         link_short    VARCHAR(255),
                         link_status   TINYINT(1),
                         created_ip    VARCHAR(60),
                         created_date  VARCHAR(25)
                     )`;

    // Run Query
    db.query(linkTable, function (err, result) {
        if (err) throw err;
        console.log("Tables Created Success - " + Date());
    });
})