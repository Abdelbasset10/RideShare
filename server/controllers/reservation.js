const prisma = require('../utils/prisma')

const getUserReservations = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"User id is required!"})
        }

        const reservations = await prisma.reservation.findMany({
            where:{
                user_id:id
            }
        })
        return res.status(200).json(reservations)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    getUserReservations
}