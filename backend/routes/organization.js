const express = require("express");
const router = express.Router();
const Organization = require("../models/Organization");

// ✅ Add a new organization
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const organization = new Organization({ name });
    await organization.save();
    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all organizations
router.get("/", async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single organization by ID
router.get("/:id", async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) return res.status(404).json({ error: "Not Found" });
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete an organization
router.delete("/:id", async (req, res) => {
  try {
    await Organization.findByIdAndDelete(req.params.id);
    res.json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
