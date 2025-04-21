const Organization = require("../models/Organization");
const User = require("../models/User");

exports.createOrganization = async (req, res) => {
  try {
    const { name } = req.body;
    const organization = new Organization({ name });
    await organization.save();
    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) return res.status(404).json({ error: "Not Found" });
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    await Organization.findByIdAndDelete(req.params.id);
    res.json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.selectOrganization = async (req, res) => {
  try {
    const { userId, organizationId } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.organization_id = organizationId;
    await user.save();

    res.json({ message: "Organization selected successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUsersByOrganization = async (req, res) => {
  try{
    const { organizationId } = req.params;

    const users = await User.find({ organization_id: organizationId });

    res.json(users);
  } catch (error) {
    res.status (500).json({error: "Internal Server Error"})
  }
};
