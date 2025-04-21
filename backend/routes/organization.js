const express = require("express");
const {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  deleteOrganization,
  selectOrganization,
  getUsersByOrganization
} = require("../controllers/organizationController");

const router = express.Router();

router.post("/", createOrganization);
router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);
router.delete("/:id", deleteOrganization);
router.post("/selectOrg", selectOrganization);
router.get("/:organizationId/users", getUsersByOrganization);

module.exports = router;
