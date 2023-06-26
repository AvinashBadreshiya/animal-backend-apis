const { createSuperAdmin } = require("./Controller/superAdmin.controllers")
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const db = mongoose.connect("mongodb://localhost:27017/animalll", async (error, Db) => {
    if (error) {
        console.log("Database not connected", error);

    } else {
        console.log("Database Connceted");
        await createSuperAdmin()
    }
});

module.exports = db;