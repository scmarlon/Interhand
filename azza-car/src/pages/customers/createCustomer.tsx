import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { GetCustomerList } from "@/utils/queries";
import Navbar from "@/components/Navbar";

const createCustomer: React.FC = () => {
  /* These lines of code are using the `useState` hook from React to create multiple state variables
  and their corresponding setter functions in a functional component. */
  const [Nombre, setNombre] = useState("");
  const [Apellios, setApellios] = useState("");
  const [Identificación, setIdentificación] = useState("");
  const [Mail, setMail] = useState("");
  const [Teléfono, setTeléfono] = useState("");

  const router = useRouter();

  const ShowAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Cliente creado con exito",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  /**
   * The function `ShowAlertError` displays an error alert message using the Swal library in a React
   * application.
   */
  const ShowAlertError = () => {
    Swal.fire({
      icon: "error",
      title: "Existe cliente con esa cidentificación",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const handlerCreateUser = async (e: any) => {
    e.preventDefault();
    let foundMatch = false;
    const format = { Nombre, Apellios, Identificación, Mail, Teléfono };

    let response = await fetch("/api/getCustomer");
    let data = await response.json();

    const customers = await GetCustomerList();
    customers.map(async (customer: any) => {
      if (customer.Identificación === Identificación) {
        foundMatch = true;
        ShowAlertError();
        return;
      }
    });
    if (!foundMatch) {
      const newArray = [...data.customer, format];
      response = await fetch("/api/createCustomer", {
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
    }
  };

  const redirect = () => {
    router.push("/dashboard");
  };

  return (
    <Navbar>
      <div className="container mx-auto">
        <div className="newUsers-form">
          <h2>Nuevo Cliente</h2>
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

            <button type="submit">Crear Cliente</button>
          </form>
          <button type="submit" onClick={redirect}>
            Volver
          </button>
        </div>
      </div>
    </Navbar>
  );
};

export default createCustomer;
