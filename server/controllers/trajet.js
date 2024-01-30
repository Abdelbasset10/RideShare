const prisma = require('../utils/prisma')

const createTrajet = async (req,res) => {
    try {
        const { start_date,hour_start,nb_place,chauffeur_id,start_lat,start_long,end_lat,end_long,price } = req.body;

        if (!start_date  || !hour_start || !nb_place || !chauffeur_id ||!start_lat || !start_long || !end_lat || !end_long || !price) {
          return res.status(400).json({ message: "Make sure to fill all trajets informations!" });
        }

        const user = await prisma.user.findUnique({
            where:{
                id:chauffeur_id
            },
            include:{
                car:true
            }
        })

        if(!user){
            return res.status(404).json({message:"Chauffeur does not exists!"})
        }

        if(user.type !=="CHAUFFEUR"){
            return res.status(400).json({message:"You have to be chauffeur to create trajet!"})
        }
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            const day = currentDate.getDate().toString().padStart(2, '0');
            const formattedDate = year + "-" + month + "-" + day;

        if(formattedDate>start_date){
            return res.status(400).json({message:"You can't pick day that is gone!"})
        }

        if(nb_place >user.car.max_places){
            return res.status(400).json({message:`nb places must be ${user.car.max_places}`})
        }

        if(price < 0){
            return res.status(400).json({message:`price cant be < 0`})
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
            hour_end:"18:00",
            hour_start,
            nb_place,
            chauffeur_id,
            position_startId:start_position.id,
            position_endId:end_position.id,
            car_id:user.car.id
        }
       })

       return res.status(201).json({message:"Trajet created successfully!"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const reserverTrajet = async (req,res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message:'Trajet is required!'})
        }

        const {userId,nb_places} = req.body

        if(!userId){
            return res.status(400).json({message:"User is required!"})
        }

        if(nb_places === 0){
            return res.status(400).json({message:"You have to select number of places"})
        }

        const trajet = await prisma.trajet.findUnique({
            where:{
                id
            }
        })

        if(!trajet){
            return res.status(404).json({message:"Trajet does not exists!"})
        }

        if(nb_places > trajet.nb_place){
            return res.status(400).json({message:"Your number of places is grater then rest of trajets left!"})
        }

        await prisma.reservation.create({
            data:{
                nb_place:nb_places,
                user_id:userId,
                trajet_id:id
            }
        })

        await prisma.trajet.update({
            where:{
                id
            },
            data:{
                nb_place:trajet.nb_place - nb_places
            }
        })

        return res.status(200).json({message:"Reservation has been created successfully!"})


    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const getCloseTrajets = async (req,res) => {
    try {
        const {lat,long} = req.body
        const min_shape_lat = lat -1
        const max_shape_lat = lat +1

        const min_shape_long = long -1
        const max_shape_long = long +1
    
    const close_trajets = await prisma.trajet.findMany({
        where:{
            position_start:{
                latitude:{
                    lte:max_shape_lat,
                    gte:min_shape_lat
                },
                longitude:{
                    lte:max_shape_long,
                    gte:min_shape_long
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

        const {userId} = req.body

        if(!id){
            return res.status(400).json({message:"Trajet id is required"})
        }

    const trajet = await prisma.trajet.findUnique({
        where:{
            id,
        }
    })

    if(!trajet){
        return res.status(404).json({message:"Trajet does not exists!"})
    }

    if(trajet.chauffeur_id !== userId){
        return res.status(400).json({message:"You can't update trajet that's not yours!!"})
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

const getUserTrajets = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"User id is required!"})
        }

        const trajets = await prisma.trajet.findMany({
            where:{
                chauffeur_id:id
            }
        })



        return res.status(200).json(trajets)
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
            },
            include:{
                position_start:true,
                position_end:true
            }
        })

        if(!trajet){
            return res.status(401).json({message:"Trajet does not exists!"})
        }

        if(trajet.chauffeur_id !== userId){
            return res.status(400).json({message:"You can't delete trajet that's you are not the owner!"})
        }

        await prisma.position.delete({
            where:{
                start_trajets:trajet.position_start,
                end_trajets:trajet.position_end
            }
        })

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
    deleteTrajet,
    reserverTrajet,
    getUserTrajets
}