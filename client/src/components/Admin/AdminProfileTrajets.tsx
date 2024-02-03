import React from 'react'
import ProfilUserBox from '../Profile/ProfilUserBox.tsx';
import ProfileEdit from '../Profile/ProfileEdit.tsx';
import Grid from '../Profile/Grid.tsx';




const AdminProfileTrajets = () => {
  return (
    /*ce n'est pas le vrai contenu just pour afficher le travail 
    ce code va etre deplacer a la page de modification de profil d'utilisateur */
    <div className='flex justify-center sm:flex-col lg:flex-row'>
     <ProfilUserBox/>
      <div className="mr-5"></div>
      <ProfileEdit />
    </div>
   
  

  )
}

export default AdminProfileTrajets
