// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../models");

const JWT_SECRET = "your_jwt_secret_key";

// User registration
router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await db.User.create({
			username,
			password: hashedPassword,
		});
		res.json({ message: "User registered successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// User login
router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await db.User.findOne({ where: { username } });
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ id: user.id }, JWT_SECRET, {
				expiresIn: "1h",
			});
			res.json({ token });
		} else {
			res.status(400).json({ error: "Invalid username or password" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
