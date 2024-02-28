import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const createCustomer: React.FC = () => {
  /* These lines of code are using the `useState` hook from React to create multiple state variables
  and their corresponding setter functions in a functional component. */
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const router = useRouter();

  const ShowAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Cliente creado con exito",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const handlerCreateUser = async (e: any) => {
    e.preventDefault();
    const format = { name, lastName, userId, userMail, userPhone };

    let response = await fetch("/api/getCustomer");
    let data = await response.json();
    const newArray = [...data.customer, format];
    response = await fetch("/api/createCustomer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArray),
    });
    data = await response.json();
    ShowAlert();
  };

  const redirect = () => {
    router.push("/dashboard");
  };

  return (
    <div className="container">
      <div className="newUsers-form">
        <h2>Nuevo Cliente</h2>
        <form onSubmit={handlerCreateUser}>
          <div className="form-user">
            <label>Nombre:</label>
            <input
              required
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Apellidos:</label>
            <input
              required
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Identificación:</label>
            <input
              required
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Correo electrónico:</label>
            <input
              required
              type="text"
              id="userMail"
              value={userMail}
              onChange={(e) => setUserMail(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Teléfono:</label>
            <input
              required
              type="text"
              id="userPhone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>

          <button type="submit">Crear Cliente</button>
        </form>
        <button type="submit" onClick={redirect}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default createCustomer;
