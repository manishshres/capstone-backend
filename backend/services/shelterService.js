const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

const getSheltersByZipcode = (zipcode) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      hostname: "homeless-shelter.p.rapidapi.com",
      port: null,
      path: `/zipcode?zipcode=${zipcode}`,
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "homeless-shelter.p.rapidapi.com",
      },
    };

    const req = https.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        resolve(JSON.parse(body.toString()));
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

module.exports = {
  getSheltersByZipcode,
};
