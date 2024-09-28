const organizationService = require("../services/organizationService");

const addOrganization = async (req, res) => {
  try {
    const organizationData = req.body;
    const userId = req.user.userId;

    console.log(userId);

    if (!organizationData.name || !organizationData.type) {
      return res.status(400).json({ error: "Name and type are required" });
    }

    const { data, error } = await organizationService.addOrganization(
      organizationData,
      userId
    );
    if (error) {
      throw error;
    }

    res.status(201).json({ message: "Organization added successfully" });
  } catch (error) {
    console.error("Error adding organization:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the organization" });
  }
};

module.exports = {
  addOrganization,
};
