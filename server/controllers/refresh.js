const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
const generateAccessToken = (req, res) => {
  try {
    const token = req.headers.Authorization || req.headers.authorization
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "Refresh Token does not exists!" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decode) => {
        if (err) {
          return res.status(403).json({ message: "FORBIDDEN" });
        }
        const user = decode.user;

        const isExistUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!isExistUser) {
          return res.status(404).json({ message: "User does not exists!" });
        }

        const accessToken = jwt.sign(
          { user: isExistUser },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        return res.status(201).json(accessToken);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateAccessToken,
};
