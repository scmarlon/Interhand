"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetCarsList, GetUsersList } from "@/utils/queries";
import Modal from "antd/lib/modal";
import { GetCustomerList } from "@/utils/queries";
import Navbar from "@/components/Navbar";

const CarsState: React.FC = () => {
  const [allCars, setAllCars] = useState<any>([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carselect, setcarSelect] = useState([]);
  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState();
  const [seller, setSeller] = useState("");
  const [index, setIndex] = useState<number>(0);

  const [carsSold, setCarsSold] = useState(0);
  const [carsReserved, setCarsReserved] = useState(0);
  const [carsAvailable, setCarsAvailable] = useState(0);

  const [usersVeV, setUsersVeV] = useState(0);
  const [usersVeR, setUsersVeR] = useState(0);

  const router = useRouter();

  const getCasrs = async () => {
    const carsList = await GetCarsList();
    setAllCars(carsList);
    let carsS = 0;
    let carsR = 0;
    let carsA = 0;
    carsList.map((cars: any) => {
      if (cars.Estado === "Disponible") {
        carsA++;
      }
      if (cars.Estado === "Reservado") {
        carsR++;
      }
      if (cars.Estado === "Vendido") {
        carsS++;
      }
    });
    setCarsSold(carsS);
    setCarsReserved(carsR);
    setCarsAvailable(carsA);
  };

  const getCustomers = async () => {
    const customerList = await GetCustomerList();
    setAllCustomers(customerList);
  };

  const getUsers = async () => {
    const usersList = await GetUsersList();
    setAllUsers(usersList);
  };

  const handeleModal = (e: any, index: any) => {
    allCars[index].Vendedor = seller;
    setcarSelect(e);
    setIndex(index);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const redirect = () => {
    router.push("/dashboard");
  };

  const handleOk = () => {
    setIsModalOpen(false);
    editCarInformation();
  };

  const editCarInformation = async () => {
    //test();
    //allCars, index, carselect  allCars[index].Vendedor = seller;

    console.log(allCars);

    const response = await fetch("/api/createCars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allCars),
    });

    const data = await response.json();
    if (data.status !== 200) return "Error";

    // const data = await response.json();
    // const data = await response.json();
    // if (data.status !== 200) return "Error";
    // const response = await fetch("/api/createCars", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newArray),
    // });
    // const data = await response.json();
    // if (data.status !== 200) return "Error";
    //return newArray;
    /*
    El post de la nueva lista de los carros a la 'base de datos'
    const response = await fetch('url', configuracion);
    const data = await response.json();
    if(data.status !== 200)
        return alerta de que algo salio mal
    
    // limpiar el form
    
    // cerrar el modal
    }
    
    */
  };

  useEffect(() => {
    const sellerUser = localStorage.getItem("usuario") ?? "";
    setSeller(sellerUser);
    getCasrs();
    getCustomers();
    getUsers();
  }, []);

  return (
    <Navbar>
      <div className="container mx-auto">
        <div className="dashboard">
          <ul>
            {allCars.map((element, index) => (
              <li key={index}>
                <button
                  className="button-dash"
                  type="button"
                  onClick={() => handeleModal(element, index)}
                >
                  {element.Marca}, Año: {element.Año}, Color: {element.Color}
                </button>
              </li>
            ))}
          </ul>

          <button type="submit" onClick={redirect}>
            Volver
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="dashboard">
          <div className="carsDash">
            {allUsers.map((element, index) => (
              <li key={index}>
                {element.Nombre} {element.Apellios} realizó {element.VeV}{" "}
                reservaciones de vehículos
              </li>
            ))}
            <p className="carsP">
              Catidad de vehículos Disponibles: {carsAvailable}
            </p>
            <p className="carsP">
              Catidad de vehículos Reservados: {carsReserved}
            </p>
            <p className="carsP">Catidad de vehículos Vendidos: {carsSold}</p>
          </div>
        </div>
      </div>

      <Modal
        title="Información del Vehículo"
        open={isModalOpen}
        onCancel={() => {
          handleCancel();
        }}
        footer={[]}
      >
        <div style={{ display: "flex" }}>
          <img
            style={{
              width: "clamp(10em, 20vw, 15em)",
            }}
            className="imgs"
            src={
              "https://img.freepik.com/foto-gratis/vista-coche-3d_23-2150796894.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1709078400&semt=sph"
            }
          />

          <div style={{ padding: 10 }}>
            {Object.entries(carselect).map(([property, value]) => {
              if (carselect.Estado !== "Vendido") {
                if (property === "Estado") {
                  return (
                    <div style={{ fontSize: 20 }}>
                      <h1>Estado: </h1>
                      <select
                        id="status"
                        value={allCars[index].Estado}
                        onChange={(e) => {
                          allCars[index].Estado = e.target.value;
                          setStatus(e.target.value);
                        }}
                      >
                        <option value="Disponible">Disponible</option>
                        <option value="Reservado">Reservado </option>
                        <option value="Vendido">Vendido</option>
                      </select>
                    </div>
                  );
                }
                if (property === "Cliente") {
                  return (
                    <div style={{ fontSize: 20 }}>
                      <h1>Cliente: </h1>
                      <select
                        id="customer"
                        value={allCars[index].Cliente}
                        onChange={(e: any) => {
                          allCars[index].Cliente = e.target.value;
                          setCustomer(e.target.value);
                        }}
                      >
                        {allCustomers.map((cutomer: any) => {
                          return (
                            <option value={cutomer.Identificación}>
                              {cutomer.Nombre}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }
              }

              if (property === "Vendedor") {
                return (
                  <div style={{ fontSize: 20 }}>
                    <h1>Vendedor: </h1>
                    <p style={{ fontSize: 20 }}>{seller}</p>
                  </div>
                );
              }
              return (
                <p key={property} style={{ fontSize: 20 }}>
                  {property}: {value}
                </p>
              );
            })}
          </div>
        </div>

        <button onClick={handleOk} className="button-dash" type="button">
          okey
        </button>
      </Modal>
    </Navbar>
  );
};

export default CarsState;
