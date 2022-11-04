import { prettyDOM } from "@testing-library/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/ProvideContext";
import OrderRow from "./OrderRow";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrder] = useState([]);

  // const url = `http://localhost:5000/orders?email=${user.email}`;

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("SHcarsToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          logout();
        }
        return res.json();
      })
      .then((data) => {
        console.log("receiverd", data);
        setOrder(data);
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you Sure ?");
    if (proceed) {
      fetch(`https://sh-cars-server.vercel.app/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast("deleted success");
            const remaining = orders.filter((odr) => odr._id !== id);
            setOrder(remaining);
          }
        });
    }
  };

  const statusUpdate = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("updated status");
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
      <ToastContainer />
    </div>
  );
};

export default Orders;
