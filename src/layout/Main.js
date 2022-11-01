import React from 'react';
import { Outlet } from 'react-router-dom';
import Footers from '../pages/shared/footer/Footers';
import Headers from '../pages/shared/headers/Headers';

const Main = () => {
    return (
        <div>
            <Headers/>
            <Outlet/>
            <Footers/>

        </div>
    );
};

export default Main;