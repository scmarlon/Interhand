import React, { useState } from "react";
//import { useRouter } from "next/router";

const createUsers: React.FC = () => {
  /* These lines of code are using the `useState` hook from React to create multiple state variables
  and their corresponding setter functions in a functional component. */
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <div className="newUsers-form">
        <h2>Nuevo Usuario</h2>
        <form>
          <div className="form-user">
            <label>Nombre:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Apellidos:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Identificación:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Correo electrónico:</label>
            <input
              type="text"
              id="userMail"
              value={userMail}
              onChange={(e) => setUserMail(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Teléfono:</label>
            <input
              type="text"
              id="userPhone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Contraseña:</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default createUsers;
