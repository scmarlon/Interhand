import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Select } from "antd";

import Navbar from "@/components/Navbar";

const createCars: React.FC = () => {
  const [Color, setColor] = useState("");
  const [Año, setAño] = useState("");
  const [Cilindraje, setCilindraje] = useState("");
  const [Marca, setMarca] = useState("");
  const [Modelo, setModelo] = useState("");
  const [Kilimetraje, setKilimetraje] = useState("");
  const [Tipo, setType] = useState("");
  const [Caracteristicas, setCaracteristicas] = useState("");
  const [Estado, setEstado] = useState("Disponible");
  const [Cliente, setCliente] = useState("null");
  const [Vendedor, setVendedor] = useState("null");

  const router = useRouter();

  /**
   * The `ShowAlert` function displays a success message using the Swal library in React.
   */
  const ShowAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Auto creado con exito",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const handlerCreateCar = async (e: any) => {
    e.preventDefault();
    const format = {
      Color,
      Año,
      Cilindraje,
      Marca,
      Modelo,
      Kilimetraje,
      Tipo,
      Caracteristicas,
      Estado,
      Cliente,
      Vendedor,
    };
    let response = await fetch("/api/getCars");
    let data = await response.json();
    const newArray = [...data.cars, format];
    response = await fetch("/api/createCars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArray),
    });
    data = await response.json();
    setColor("");
    setAño("");
    setCilindraje("");
    setMarca("");
    setModelo("");
    setKilimetraje("");
    setType("");
    setCaracteristicas("");
    ShowAlert();
  };

  const redirect = () => {
    router.push("/dashboard");
  };

  return (
    <Navbar>
      <div className="container mx-auto">
        <div className="newUsers-form">
          <h2 className="text-4xl font-bold">Nuevo Auto</h2>
          <form onSubmit={handlerCreateCar}>
            <div className="form-user">
              <label>Color:</label>
              <input
                required
                type="text"
                id="Color"
                value={Color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Año:</label>
              <input
                required
                type="text"
                id="Año"
                value={Año}
                onChange={(e) => setAño(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Cilindraje:</label>
              <input
                required
                type="text"
                id="Cilindraje"
                value={Cilindraje}
                onChange={(e) => setCilindraje(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Marca:</label>
              <input
                required
                type="text"
                id="Marca"
                value={Marca}
                onChange={(e) => setMarca(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Modelo:</label>
              <input
                required
                type="text"
                id="Modelo"
                value={Modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Kilometraje:</label>
              <input
                required
                type="text"
                id="Kilimetraje"
                value={Kilimetraje}
                onChange={(e) => setKilimetraje(e.target.value)}
              />
            </div>
            <div className="form-user">
              <label>Características:</label>
              <input
                required
                type="text"
                id="Caracteristicas"
                value={Caracteristicas}
                onChange={(e) => setCaracteristicas(e.target.value)}
              />
            </div>

            <div className="form-user pr-[10px]">
              <label htmlFor="mySelect">Tipo:</label>
              {/* <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Suv">Suv</option>
              <option value="Sedan">Sedan </option>
              <option value="Hatchback">Hatchback</option>
            </select> */}
              <Select
                onChange={(e) => setType(e)}
                className="w-full h-[45px]"
                options={[
                  { label: "SUV", value: "Suv" },
                  { label: "Sedan", value: "Sedan" },
                  { label: "Hatchback", value: "Hatchback" },
                ]}
              />
            </div>
            <button type="submit">Crear Auto</button>
          </form>
          <button type="submit" onClick={redirect}>
            Volver
          </button>
        </div>
      </div>
    </Navbar>
  );
};

export default createCars;
