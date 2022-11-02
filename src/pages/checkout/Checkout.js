import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
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
      customer: name,
      phone,
      message,
    };
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
    </div>
  );
};

export default Checkout;
