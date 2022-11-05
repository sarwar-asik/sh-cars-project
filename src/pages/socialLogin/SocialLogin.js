import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/ProvideContext';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext)



    return (
        <div>
            <p className="text-center">Social Login</p>
            <p  onClick={googleSignIn} className="text-center">
                <button className="btn btn-ghost">
                    Google
                </button>
            </p>
        </div>
    );
};

export default SocialLogin;