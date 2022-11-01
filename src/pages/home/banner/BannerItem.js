import React from 'react';
// import img1 from '../../../assets/images/banner/1.jpg'

import './BannnerItems.css'

const BannerItem = ({slide}) => {
    const {image,id,prev,next} =slide;

    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
        <div className="carousel-image">
          <img src={image} className="w-full rounded-xl" alt="" />
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-24  top-1/4">
          <h1 className="text-6xl font-bold text-white ">
            Affordable <br />
            Price for servicing
          </h1>
        </div>
        <div className="absolute flex justify-end transform -translate-y-1/2 left-24 w-2/5 top-1/2 ">
          <p className="text-white text-xl  font-normal">
            There are many variations of passages of available, but the
            majority have suffered alteration in some form
          </p>
        </div>
        <div className="absolute flex justify-start transform -translate-y-1/2 left-24 w-2/5 top-3/4">
          <button className="btn btn-error text-white mr-20">
            Discover More
          </button>
          <button className="btn btn-outline  text-white">
            Latest Project
          </button>
        </div>

        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
          <a href={`#slide${prev}`} className="btn btn-circle mr-5">
            ❮
          </a>
          <a href={`#slide${next}`} className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    );
};

export default BannerItem;