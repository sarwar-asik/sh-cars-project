import React, { useEffect, useState } from "react";
// import Orders from './Orders';

const OrderRow = ({ order ,handleDelete,statusUpdate}) => {
  console.log(order);
  const { customer, _id, email, serviceName, price, phone, service,status } = order;
  console.log(service);
  const [orderService, setOrderService] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/services/${service}`)
      .then((res) => res.json())
      .then((data) => setOrderService(data));
  }, [service]);

  

  return (
    <tr>
      <th>
        <label>
          <button onClick={()=>handleDelete(_id)} className="btn btn-ghost">
            X
          </button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {orderService?.img ? (
                <img
                className=""
                  src={orderService.img}
                  alt="Avatar Tailwind CSS Component"
                />
              ) : (
                <h2>Insert img</h2>
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <div className="text-sm opacity-50">{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="badge badge-ghost ">${price}</span>
      </td>
      <td>{email}</td>
      <th>
        <button onClick={()=> statusUpdate(_id)} className="btn tbn-ghost btn-xs "> {status?status:'pending'}</button>
      </th>
     
    </tr>
  );
};

export default OrderRow;
