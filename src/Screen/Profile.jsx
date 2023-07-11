import { useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';

import UploadProduct from '../assets/components/UploadProduct';
import Dashboard from './Dashboard';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) {
                navigate('/login'); // Redirect to login page if no user is logged in
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [user, navigate]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/');
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-8">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>

                {user && user.email === 'balajigv@gmail.com' && (
                    <div className="mb-4">
                        <UploadProduct />
                        {/* <Dashboard /> */}
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
