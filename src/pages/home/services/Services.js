import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState([])
    useEffect(()=>{
        fetch('https://sh-cars-server.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])

    console.log(services);
  return (
    <div>
      <div className="text-center my-4">
        <p className="text-2xl text-orange-500">Services {Services.length}</p>
        <p className="text-5xl my-5 font-semibold">Our Service Area</p>
        <p className="text-xl">
          The majority have suffered alteration in some form, by injected
          humour, or randomised <br /> words which don't look even slightly believable.{" "}
        </p>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {
            services.map(service => <ServiceCard service={service} key={service._id}/>)
        }
    </div>
    </div>
  );
};

export default Services;
