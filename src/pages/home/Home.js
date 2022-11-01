import React from 'react';
import About from './about/About';
import Banner from './banner/Banner';
import Services from './services/Services';

const Home = () => {
    return (
        <div>
        <Banner/>
        <About/>
        <Services/>
        </div>
    );
};

export default Home;