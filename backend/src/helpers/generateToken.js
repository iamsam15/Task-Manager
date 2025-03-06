import jwt from "jsonwebtoken";

// genrate user id to genrate token

const genrateToken = (id) => {
  // token must be returned to the client

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default genrateToken;
