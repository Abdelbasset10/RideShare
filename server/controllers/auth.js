const prisma = require('../utils/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = async (req,res) => {
  try {
    console.log(req.body)
    const { email, firstName, lastName, phoneNumber, type, matricule, password, passwordConfirm,gender,vehicleBrand,vehicleYear,vehicleMatricule,vehicleModel,vehicleMaxPlace } = req.body;
    if (!email || !firstName || !lastName || !phoneNumber || !type || !matricule || !password || !passwordConfirm ||!gender) {
      return res.status(400).json({ message: "Make sure to fill all your informations!" });
    }

    if(type !=="CHAUFFEUR" && type !=="VOYAGEUR"){
      return res.status(400).json({message:"User must be chauffeur or voyageur!"})
    }

    if(type === "CHAUFFEUR" && (!vehicleBrand || !vehicleMatricule || !vehicleModel || !vehicleYear || !vehicleMaxPlace) ){
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

    const isExistsNumber = await prisma.user.findFirst({
      where: {
        n_tlph:phoneNumber,
      },
    });
    

    if (isExistsNumber) {
      return res.status(400).json({ message: "phone already exists!" });
    }

    if (passwordConfirm !== password) {
      return res.status(400).json({ message: "Passwords incorrects!" });
    }

    

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        first_name:firstName,
        last_name:lastName,
        n_tlph:phoneNumber,
        type,
        matricule,
        password: hashPassword,
        gender,
      },
    });

    if(type === "CHAUFFEUR"){
      try {
        await prisma.car.create({
          data:{
            owner_id:newUser.id,
            marque:vehicleBrand,
            year:vehicleYear,
            matricule:vehicleMatricule,
            model:vehicleModel,
            max_places:Number(vehicleMaxPlace)
          }
        })
      } catch (error) {
        await prisma.user.delete({
          where:{
            id:newUser.id
          }
        })
        return res.status(500).json({message:error.message})
      }
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