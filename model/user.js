const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * User Schema
 * - Password is stored HASHED, never in plain text.
 * - select: false means the password field is NOT returned by default
 *   in queries (so you never accidentally send it to the client).
 */

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // no two users can share an email
        lowercase: true, // store emails in lowercase for consistency
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false, // Hide password from normal query results
    },

   role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
},
{ timestamps: true } // adds createdAt / updatedAt automatically
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10); // generate a random salt
    this.password = await bcrypt.hash(this.password, salt); // hash + salt
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Third argument "users" forces the collection name to be exactly "users"
module.exports = mongoose.model("User", userSchema, "users");

