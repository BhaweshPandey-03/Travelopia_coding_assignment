import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAdminFill } from 'react-icons/ri';

const AdminIcon: React.FC = () => {
    const Navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const checkIsAdmin = () => {
        const email = localStorage.getItem('email');
        setIsAdmin(email === "admin@travelopia.com");
    };

    useEffect(() => {
        checkIsAdmin();
        const intervalId = setInterval(checkIsAdmin, 500);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {isAdmin && (
                <div className="overlay01">
                    <a className='admin' onClick={() => Navigate('/admin')}><RiAdminFill /></a>
                </div>
            )}
        </>
    );
};

export default AdminIcon;
