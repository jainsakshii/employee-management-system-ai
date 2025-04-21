const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, organizationId } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = organizationId ? "admin" : "employee";

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword, role, organization_id: organizationId || null });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", role });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, organizationId } = req.body;

    const user = await User.findOne({ email });
    console.log("!!!!!USER!!!:", user);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    if (user.role === "admin" && organizationId !== String(user.organization_id)) {
      return res.status(403).json({ error: "Invalid organization ID for admin" });
    }

    if (user.role === "employee" && !user.organization_id) {
      return res.json({ requiresOrgSelection: true, userId: user._id });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, organizationId: user.organization_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, role: user.role, organizationId: user.organization_id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
