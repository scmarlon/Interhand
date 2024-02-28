import React, { useState } from "react";
import { useRouter } from "next/router";

const Dashboard: React.FC = () => {
  const router = useRouter();
  /**
   * The handleNewUser function redirects the user to the createUsers page in a TypeScript React
   * application.
   */
  const handleNewUser = () => {
    router.push("/users/createUsers");
  };

  const handleNewCar = () => {
    router.push("/cars/createCars");
  };

  const handleNewCustomer = () => {
    router.push("/customers/createCustomer");
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="test">
          <button className="button-dash" type="button" onClick={handleNewUser}>
            Crear nuevo Usuario
          </button>
          <button className="button-dash" type="button" onClick={handleNewCar}>
            Crear nuevo Vehículo
          </button>
          <button className="button-dash" type="button" onClick={handleNewUser}>
            Actualizar estado de vehículo
          </button>
          <button className="button-dash" type="button" onClick={handleNewUser}>
            Ver listado de vehículos
          </button>
          <button
            className="button-dash"
            type="button"
            onClick={handleNewCustomer}
          >
            Crear clientes
          </button>
          <button className="button-dash" type="button" onClick={handleNewUser}>
            Ver listado de clientes
          </button>
          <button className="button-dash" type="button" onClick={handleNewUser}>
            Consultar reportes
          </button>
          <button className="button-dash" type="button" onClick={handleNewUser}>
            Salir del sistema
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
