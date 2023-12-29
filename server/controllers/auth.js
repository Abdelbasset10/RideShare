const prisma = require('../utils/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = async (req,res) => {
  try {
    const { email, first_name, last_name, n_tlph, type, matricule, password, confirmPassword } = req.body;
    if (!email || !first_name || !last_name || !n_tlph || !type || !matricule || !password || !confirmPassword) {
      return res.status(400).json({ message: "Make sure to fill all your informations!" });
    }

    const isExistsEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isExistsEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    if (confirmPassword !== password) {
      return res.status(400).json({ message: "Passwords incorrects!" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        first_name,
        last_name,
        n_tlph,
        type,
        matricule,
        password: hashPassword,
      },
    });

    return res.status(201).json({message:"User created successfully!"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing informations!" });
    }

    const isExistsUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!isExistsUser) {
      return res.status(404).json({ message: "Email does not exists!" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      isExistsUser.password
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = jwt.sign(
      { user: { 
        id: isExistsUser.id,
        first_name: isExistsUser.first_name,
        last_name:isExistsUser.last_name,
        email: isExistsUser.email,
        type:isExistsUser.type
      } },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    isExistsUser.password = undefined

    req.user = isExistsUser.id
    console.log(isExistsUser.id)
    res.status(201).json({user:isExistsUser,token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn
}