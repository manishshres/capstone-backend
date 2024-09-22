const shelterService = require("../services/shelterService");

const getShelters = async (req, res) => {
  try {
    const { zipcode } = req.query;
    if (!zipcode) {
      return res.status(400).json({ error: "Zipcode is required" });
    }

    const shelters = await shelterService.getSheltersByZipcode(zipcode);
    res.json(shelters);
  } catch (error) {
    console.error("Error fetching shelters:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching shelters" });
  }
};

module.exports = {
  getShelters,
};
