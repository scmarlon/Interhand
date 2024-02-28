import React, { useState } from "react";
//import { useRouter } from "next/router";

const createUsers: React.FC = () => {
  /* These lines of code are using the `useState` hook from React to create multiple state variables
  and their corresponding setter functions in a functional component. */
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [password, setPassword] = useState("");

  const handlerCreateUser = async (e: any) => {
    e.preventDefault();
    const format = { name, lastName, userId, userMail, userPhone, password };

    let response = await fetch("/api/getUsers");
    let data = await response.json();
    const newArray = [...data.users, format];
    response = await fetch("/api/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArray),
    });
    data = await response.json();
  };

  return (
    <div className="container">
      <div className="newUsers-form">
        <h2>Nuevo Usuario</h2>
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
          <div className="form-user">
            <label>Contraseña:</label>
            <input
              required
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Crear Usuario</button>
        </form>
      </div>
    </div>
  );
};

export default createUsers;
