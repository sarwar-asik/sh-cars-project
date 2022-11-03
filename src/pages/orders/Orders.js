import { prettyDOM } from "@testing-library/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/ProvideContext";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrder] = useState([]);

  // const url = `http://localhost:5000/orders?email=${user.email}`;

  useEffect(() => {
    fetch(`https://sh-cars-server.vercel.app/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [user?.email]);

  const handleDelete = (id) => {
    const proceed = window.confirm("are you Sure ?");
    if (proceed) {
      fetch(`https://sh-cars-server.vercel.app/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted success");
            const remaining = orders.filter((odr) => odr._id !== id);
            setOrder(remaining);
          }
        });
    }
  };

  const statusUpdate = (id) => {
    fetch(`https://sh-cars-server.vercel.app/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("updated status");
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((odr) => odr._id !== id);
          const approving = orders.find((odr) => odr._id === id);
          approving.status = "Approved";
          const newOrders = [approving, ...remaining];
          setOrder(newOrders);
        }
      });
  };
  // console.log(orders[0]);
  return (
    <div>
      <h1>Your Order </h1>
      <h2 className="text-3xl">Your Order {orders.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <button className="btn btn-ghost text-2xl">X</button>
                </label>
              </th>
              <th>Name</th>
              <th>Cost</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders[0]?.email ? (
              orders.map((order) => (
                <OrderRow
                  order={order}
                  handleDelete={handleDelete}
                  statusUpdate={statusUpdate}
                  key={order._id}
                />
              ))
            ) : (
              <h2 className="text-3xl font-bold my-3">Please Order...</h2>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
