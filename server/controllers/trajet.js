const prisma = require('../utils/prisma')

const createTrajet = async (req,res) => {
    try {
        const { start_date,hour_start,hour_end,nb_place,chauffeur_id,start_lat,start_long,end_lat,end_long } = req.body;

        if (!start_date || !hour_end || !hour_start || !nb_place || !chauffeur_id ||!start_lat || !start_long || !end_lat || !end_long) {
          return res.status(400).json({ message: "Make sure to fill all trajets informations!" });
        }

        const user = await prisma.user.findUnique({
            where:{
                id:chauffeur_id
            }
        })

        if(!user){
            return res.status(404).json({message:"Chauffeur does not exists!"})
        }
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            const day = currentDate.getDate().toString().padStart(2, '0');
            const formattedDate = year + "-" + month + "-" + day;

        if(formattedDate>start_date){
            return res.status(400).json({message:"You can't pick day that is gone!"})
        }

        if(hour_start>hour_end){
            return res.status(400).json({message:"Confirm your hours trajet!"})
        }

        const start_position = await prisma.position.create({
            data:{
                latitude:start_lat,
                longitude:start_long
            }
        })
        const end_position = await prisma.position.create({
            data:{
                latitude:end_lat,
                longitude:end_long
            }
        })

       await prisma.trajet.create({
        data:{
            start_date,
            hour_end,
            hour_start,
            nb_place,
            chauffeur_id,
            position_startId:start_position.id,
            position_endId:end_position.id
        }
       })

       return res.status(201).json({message:"Trajet created successfully!"})

    } catch (error) {
        return res.status(500).json({message:error.messaeg})
    }
}

const getCloseTrajets = async (req,res) => {
    try {
        const {lat} = req.body
    const min_shape = lat -1
    const max_shape = lat +1
    
    const close_trajets = await prisma.trajet.findMany({
        where:{
            position_start:{
                latitude:{
                    lte:max_shape,
                    gte:min_shape
                }
            }
        }
    })
    return res.status(200).json(close_trajets)
    } catch (error) {
        return res.status(500).json({messaeg:error.messaeg})
    }
}



const updateTrajet = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"Trajet id is required"})
        }

    const trajet = await prisma.trajet.findUnique({
        where:{
            id
        }
    })

    if(!trajet){
        return res.status(404).json({message:"Trajet does not exists!"})
    }

    if(req.body.start_date){
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = year + "-" + month + "-" + day;

        if(formattedDate>req.body.start_date){
            return res.status(400).json({message:"You can't pick day that is gone!"})
        }
    }

    if(req.body.hour_start || req.body.hour_end){
        if((req.body.hour_start>req.body.hour_end) || (req.body.hour_start > trajet.hour_end) || (req.body.hour_end < trajet.hour_start)){
            return res.status(400).json({message:"Confirm your hours trajet!"})
        }
    }

    const updatedTrajet = await prisma.trajet.update({
        where:{
            id
        },
        data : {
            ...req.body
        }
    })

    return res.status(200).json(updatedTrajet)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getAllTrajets = async (req,res) => {
    try {
        const trajets = await prisma.trajet.findMany({
            include:{
             position_start:true,
             position_end:true
            }
         })
         return res.status(200).json(trajets)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getTrajet = async (req,res) => {
    try {
        const {id} = req.params

    if(!id){
        return res.status(400).json({message:"Trajet id is required"})
    }

    const trajet = await prisma.trajet.findUnique({
        where:{
            id
        }
    })

    if(!trajet){
        return res.status(404).json({message:"Trajet does not exists!"})
    }

    return res.status(200).json(trajet)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deleteTrajet = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"Trajet id is required"})
        }

        const {userId} = req.body

        if(!userId){
            return res.status(400).json({message:"Owner of this trajet is required!"})
        }

        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user){
            return res.status(404).json({message:"User does not exists!"})
        }

        const trajet = await prisma.trajet.findUnique({
            where:{
                id,
                chauffeur_id:userId
            },
            include:{
                position_start:true,
                position_end:true
            }
        })

        if(!trajet){
            return res.status(401).json({message:"You can't delete trajet that's you are not the owner!"})
        }
        await prisma.trajet.delete({
            where:{
                id
            },
        })
         
        

        return res.status(200).json({message:'Trajet has been deleted successfully!'})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    createTrajet,
    getCloseTrajets,
    getAllTrajets,
    getTrajet,
    updateTrajet,
    deleteTrajet
}