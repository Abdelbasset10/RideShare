const prisma = require('../utils/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = async (req,res) => {
  try {
    const { email, first_name, last_name, n_tlph, type, matricule, password, confirmPassword,gender,car_year,car_matricule,car_model,car_marque,car_places } = req.body;
    if (!email || !first_name || !last_name || !n_tlph || !type || !matricule || !password || !confirmPassword ||!gender) {
      return res.status(400).json({ message: "Make sure to fill all your informations!" });
    }

    if(type !=="CHAUFFEUR" && type !=="VOYAGEUR"){
      return res.status(400).json({message:"User must be chauffeur or voyageur!"})
    }

    if(type === "CHAUFFEUR" && (!car_marque || !car_matricule || !car_model || !car_year || !car_places) ){
      return res.status(400).json({message:"You have to enter your car informations!"})
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

    const newUser = await prisma.user.create({
      data: {
        email,
        first_name,
        last_name,
        n_tlph,
        type,
        matricule,
        password: hashPassword,
        gender,
      },
    });

    if(type === "CHAUFFEUR"){
      await prisma.car.create({
        data:{
          owner_id:newUser.id,
          marque:car_marque,
          year:car_year,
          matricule:car_matricule,
          model:car_model,
          max_places:car_places
        }
      })
    }

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