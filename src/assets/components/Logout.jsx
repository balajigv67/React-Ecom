import { useEffect } from 'react';
import { auth } from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Sign out the user
        auth.signOut().then(() => {
            // Redirect to home page after logout
            navigate('/');
        });
    }, [navigate]);

    return <div>Logout</div>;
};

export default Logout;
