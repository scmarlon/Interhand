import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const createCars: React.FC = () => {
  const [idCar, setIdCar] = useState(Math.random().toString(36).substr(2, 4));
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [cylinder, setCylinder] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [type, setType] = useState("");
  const [features, setFeatures] = useState("");
  const [status, setStatus] = useState("disponible");
  const [customer, setCustomer] = useState("null");
  const [seller, setSeller] = useState("null");

  const router = useRouter();

  const ShowAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Auto creado con exito",
      showConfirmButton: false,
      timer: 2500,
    });
  };
  const id = Math.random().toString(36).substr(2, 4);

  const handlerCreateCar = async (e: any) => {
    e.preventDefault();

    const format = {
      idCar,
      color,
      year,
      cylinder,
      brand,
      model,
      mileage,
      type,
      features,
      status,
      customer,
      seller,
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
    setYear("");
    setCylinder("");
    setBrand("");
    setModel("");
    setMileage("");
    setType("");
    setFeatures("");
    ShowAlert();
  };

  const redirect = () => {
    router.push("/dashboard");
  };

  return (
    <div className="container">
      <div className="newUsers-form">
        <h2>Nuevo Auto</h2>
        <form onSubmit={handlerCreateCar}>
          <div className="form-user">
            <label>Color:</label>
            <input
              required
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Año:</label>
            <input
              required
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Cilindraje:</label>
            <input
              required
              type="text"
              id="cylinder"
              value={cylinder}
              onChange={(e) => setCylinder(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Marca:</label>
            <input
              required
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Modelo:</label>
            <input
              required
              type="text"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Kilometraje:</label>
            <input
              required
              type="text"
              id="mileage"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </div>
          <div className="form-user">
            <label>Características:</label>
            <input
              required
              type="text"
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>

          <div className="form-user">
            <label htmlFor="mySelect">Tipo:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Suv">Suv</option>
              <option value="Sedan">Sedan </option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>
          <button type="submit">Crear Auto</button>
        </form>
        <button type="submit" onClick={redirect}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default createCars;
