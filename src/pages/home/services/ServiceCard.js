import React from 'react';
import {HiArrowRight} from "react-icons/hi";
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {

    const {img,price,title,_id} = service;


    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src={img} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">{title}</h2>
          <div className="card-actions flex items-center justify-end">
          <p className='text-2xl text-orange-600'>Price : $ {price}</p>

           <Link  to={`/checkout/${_id}`}> <button className="text-orange-600 text-3xl"><HiArrowRight/> </button></Link>
          </div>
        </div>
      </div>
    );
};

export default ServiceCard;