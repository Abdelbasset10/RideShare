import React from 'react'
import ProfilUserBox from '../Profile/ProfilUserBox.tsx';
import ProfileEdit from '../Profile/ProfileEdit.tsx';




const AdminProfileTrajets = () => {
  return (
    /*ce n'est pas le vrai contenu just pour afficher le travail*/
    <div className='flex  justify-center'>
     <ProfilUserBox/>
      <div className="mr-5"></div>
      <ProfileEdit />
    </div>
    
  

  )
}

export default AdminProfileTrajets
