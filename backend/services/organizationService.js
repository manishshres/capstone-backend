const supabase = require("../config/supabaseClient");

const addOrganization = async (organizationData, userId) => {
  const {
    name,
    type,
    address,
    city,
    state,
    zip_code,
    latitude,
    longitude,
    phone_number,
    email,
    website,
    description,
    services,
    hours_of_operation,
    capacity,
    restrictions,
    requirements,
    external_id,
    status,
  } = organizationData;

  const { data, error } = await supabase.from("organizations").insert([
    {
      name,
      type,
      address,
      city,
      state,
      zip_code,
      latitude,
      longitude,
      phone_number,
      email,
      website,
      description,
      services,
      hours_of_operation,
      capacity,
      restrictions,
      requirements,
      user_id: userId,
      external_id,
      status,
    },
  ]);

  if (error) {
    console.error("Error inserting organization into the database:", error);
    return error;
  }

  return data;
};

module.exports = {
  addOrganization,
};
