const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true, uppercase: true },
    paternal_lastname: { type: String, required: true, uppercase: true },
    mother_lastname: { type: String, required: true, uppercase: true },
    age: { type: Number, required: true, min: 18, index: true },
    birthdate: { type: Date, required: true },
    phone: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true, minLength: 5, maxLength: 6 },
    language: { type: String, required: true },
    marital_status: { type: String, required: true },
    hobbies: { type: [String], required: true },
    preferences: { type: [String], required: true },
    deleted_at: { type: Boolean, required: false, default: false }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('users', userSchema)