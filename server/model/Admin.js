const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
    },
    {
        timestamps: true
    })

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin;