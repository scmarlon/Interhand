import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

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

  const handleExixt = () => {
    localStorage.setItem("usuario", "");
    router.push("/");
  };

  const handleCarsState = () => {
    router.push("/cars/carsState");
  };

  const handleCustomer = () => {
    router.push("/customers/customerInformation");
  };

  return (
    <Navbar>
      <div className="container mx-auto">
        <div className="dashboard">
          <div className="test">
            <button
              className="button-dash"
              type="button"
              onClick={handleNewUser}
            >
              Crear nuevo Usuario
            </button>
            <button
              className="button-dash"
              type="button"
              onClick={handleNewCar}
            >
              Crear nuevo Vehículo
            </button>
            <button
              className="button-dash"
              type="button"
              onClick={handleCarsState}
            >
              Actualizar estado de vehículo
            </button>

            <button
              className="button-dash"
              type="button"
              onClick={handleNewCustomer}
            >
              Crear clientes
            </button>

            <button
              className="button-dash"
              type="button"
              onClick={handleCustomer}
            >
              Ver listado de clientes
            </button>
            <button
              className="button-dash"
              type="button"
              onClick={handleNewUser}
            >
              Consultar reportes
            </button>
            <button className="button-dash" type="button" onClick={handleExixt}>
              Salir del sistema
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Dashboard;
