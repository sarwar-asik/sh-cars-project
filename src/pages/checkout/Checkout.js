import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/ProvideContext";

const Checkout = () => {
  const services = useLoaderData();
  const { title, img, description, facility, price, _id } = services;

  const { user } = useContext(AuthContext);
  // console.log(user,services);

  const onOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      email,
      customer: name,
      phone,
      message,
    };
    //  if(phone.length>10){
    //   alert('Phone numbers should be 10 character')
    //  }

    fetch("https://sh-cars-server.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("SHcarsToken")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          form.reset();
          alert("success orders");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <form onSubmit={onOrder} action="" className="my-3">
        <h2 className="text-4xl">{title}</h2>
        <h4 className="text-3xl"> Price : {price}</h4>
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 ">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered w-full "
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Your Email"
            defaultValue={user?.email}
            className="input input-bordered w-full"
          />
        </div>
        <textarea
          className="textarea textarea-primary h-24 w-full"
          name="message"
          placeholder="Your Message "
        ></textarea>
        <input
          className="btn btn-error w-full my-3"
          type="submit"
          value="Place Your Order"
        />
      </form>
      <Link to={"/orders"} className="btn btn-outline btn-warning my-3 w-full">
        Your Order
      </Link>
    </div>
  );
};

export default Checkout;
