import React, { useEffect, useState } from 'react';
import { RiAdminFill } from 'react-icons/ri'; // Assuming RiAdminFill is the icon component
import { useNavigate } from 'react-router-dom';
import "../styles/home.css";

const AdminIcon: React.FC = () => {
    const Navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const email = localStorage.getItem('email');

    useEffect(() => {
        if (email === "admin@travelopia.com") {
            setIsAdmin(true);
        }
    }, [email]);
  return (
   <>
    {isAdmin && (
        <div className="overlay01">
            <a className='admin' onClick={() => Navigate('/admin')}><RiAdminFill /></a>
        </div>
    )}
   </>
  );
}

export default AdminIcon;
