import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar";

const createUsers: React.FC = () => {
  /* These lines of code are using the `useState` hook from React to create multiple state variables
  and their corresponding setter functions in a functional component. */
  const [Nombre, setNombre] = useState("");
  const [Apellios, setApellios] = useState("");
  const [Identificación, setIdentificación] = useState("");
  const [Mail, setMail] = useState("");
  const [Teléfono, setTeléfono] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const ShowAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Usuario creado con exito",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  /**
   * The function `handlerCreateUser` is an asynchronous function that creates a new user by sending a
   * POST request to an API endpoint with user data and then displays an alert message and resets input
   * fields.
   * @param {any} e - The `e` parameter in the `handlerCreateUser` function is typically an event
   * object that is passed when the function is called, often used in event handling functions for web
   * applications. In this case, it seems to be used to prevent the default behavior of a form
   * submission using `e.preventDefault()
   */
  const handlerCreateUser = async (e: any) => {
    e.preventDefault();
    const format = {
      Nombre,
      Apellios,
      Identificación,
      Mail,
      Teléfono,
      password,
    };

    let response = await fetch("/api/getUsers");
    let data = await response.json();
    const newArray = [...data.users, format];
    response = await fetch("/api/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArray),
    });
    data = await response.json();
    ShowAlert();
    setNombre("");
    setApellios("");
    setIdentificación("");
    setMail("");
    setTeléfono("");
    setPassword("");
  };

  const redirect = () => {
    router.push("/dashboard");
  };

  return (
    <Navbar>
      <div className="container mx-auto">
        <div className="newUsers-form">
          <h2>Nuevo Usuario</h2>
          <form onSubmit={handlerCreateUser}>
            <div className="form-user">
              <label>Nombre:</label>
              <input
                required
                type="text"
                id="Nombre"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Apellidos:</label>
              <input
                required
                type="text"
                id="Apellios"
                value={Apellios}
                onChange={(e) => setApellios(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Identificación:</label>
              <input
                required
                type="text"
                id="Identificación"
                value={Identificación}
                onChange={(e) => setIdentificación(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Correo electrónico:</label>
              <input
                required
                type="text"
                id="Mail"
                value={Mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Teléfono:</label>
              <input
                required
                type="text"
                id="Teléfono"
                value={Teléfono}
                onChange={(e) => setTeléfono(e.target.value)}
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
          <button type="submit" onClick={redirect}>
            Volver
          </button>
        </div>
      </div>
    </Navbar>
  );
};

export default createUsers;
