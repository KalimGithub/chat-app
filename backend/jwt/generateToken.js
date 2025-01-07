const jwt = require("jsonwebtoken");

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // Ensures the cookie is not accessible via JavaScript
    secure: true, // Ensures the cookie is sent over HTTPS (set `false` in development if using HTTP)
    sameSite: "strict", // Prevents CSRF (optional: can be 'lax' for login pages)
    // maxAge: 60 * 60 * 1000 // Expiry time (1 hour)
  });
};

module.exports = { createTokenAndSaveCookies };
