import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from './useAxiosSecure';

const useHandleFollow = ({insID,type,role,userID,profileRefetch}) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    
        const handleFollow = (insID,type) => {
        if (!role) {
            Swal.fire(
                'No Profile',
                'Your must Login .',
                'warning'
            )

            navigate("/login", { replace: true })
        } else {

            if (role !== "Student") {
                Swal.fire(
                    'Unauthorized',
                    'Only student can follow',
                    'warning'
                )

            } else {

                const data = {
                    insID : insID,
                    type : type,
                    _id : userID
                }

              axiosSecure.patch('/followings',data)
              .then(data=>{
                profileRefetch();
                // toast.success()
              })
              .catch(e=>console.error(e))
                
               
            }
        }
    }

    return {handleFollow}
};

export default useHandleFollow;