"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetCarsList, GetUsersList } from "@/utils/queries";
import Modal from "antd/lib/modal";
import { GetCustomerList } from "@/utils/queries";
import Navbar from "@/components/Navbar";
import { getCarsAndUsers } from "@/utils/getCarsAndUsers ";

const CarsState: React.FC = () => {
  const [allCars, setAllCars] = useState<any>([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carselect, setcarSelect] = useState<any>([]);
  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState();
  const [seller, setSeller] = useState("");
  const [index, setIndex] = useState<number>(0);

  const [carsSold, setCarsSold] = useState(0);
  const [carsReserved, setCarsReserved] = useState(0);
  const [carsAvailable, setCarsAvailable] = useState(0);
  const [sellersInformation, setSellersInformation] = useState([]);

  const router = useRouter();

  /**
   * The function `getCars` fetches a list of cars, categorizes them based on their status, and updates
   * the state with the counts of available, reserved, and sold cars.
   */
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

  /**
   * The function `getCustomers` asynchronously fetches a list of customers and sets them in the state.
   */
  const getCustomers = async () => {
    const customerList = await GetCustomerList();
    setAllCustomers(customerList);
  };

  /**
   * The function `getUsers` asynchronously fetches a list of users and sets them in the state variable
   * `allUsers`.
   */
  const getUsers = async () => {
    const usersList = await GetUsersList();
    setAllUsers(usersList);
  };

  /**
   * The function `handleModal` sets the selected car, index, and opens a modal in a TypeScript React
   */
  const handeleModal = (e: any, index: any) => {
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

  /**
   * The function `editCarInformation` sends a POST request to a specified API endpoint with car
   * information and returns an error message if the response status is not 200.
   * @returns If the `data.status` is not equal to 200, the function will return the string "Error".
   */
  const editCarInformation = async () => {
    const response = await fetch("/api/createCars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allCars),
    });

    const data = await response.json();
    if (data.status !== 200) return "Error";
  };

  useEffect(() => {
    const sellerUser = localStorage.getItem("usuario") ?? "";
    setSeller(sellerUser);
    getCasrs();
    getCustomers();
    getUsers();
  }, []);

  useEffect(() => {
    if (allCars) {
      setSellersInformation(getCarsAndUsers(allCars, allUsers) as any);
    }
  }, [allCars]);

  return (
    <Navbar>
      <div className="container mx-auto">
        <div className="dashboard">
          <ul>
            {allCars.map((element: any, index: any) => (
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
            <li>Marlon realizó la reserva de 1 vehículo</li>
            {/* {sellersInformation.map(
              (element: { Nombre: string; Cantidad: number; Tipo: String }) => (
                <li key={index}>
                  {element.Nombre} realizó {element.Cantidad} {element.Tipo} de
                  vehículos
                </li>
              )
            )} */}
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
            {Object.entries(carselect).map(
              ([property, value]: [string, any]) => {
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
                            allCars[index].Vendedor = seller;
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

                  if (property === "Vendedor") {
                    return (
                      <div style={{ fontSize: 20 }}>
                        <h1>Vendedor: </h1>
                        <p style={{ fontSize: 20 }}>{seller}</p>
                      </div>
                    );
                  }
                }

                if (property === "Cliente") {
                  {
                    let bool = false;
                    let nameCustomer = "";
                    allCustomers.map((customer: any) => {
                      if (customer.Identificación === carselect.Cliente) {
                        bool = true;
                        nameCustomer = customer.Nombre;
                      }
                    });
                    if (bool) {
                      return (
                        <div style={{ fontSize: 20 }}>
                          <h1>Cliente: </h1>
                          <p style={{ fontSize: 20 }}>{nameCustomer}</p>
                        </div>
                      );
                    }
                  }
                }
                if (property === "idCar") {
                  return;
                }
                return (
                  <p key={property} style={{ fontSize: 20 }}>
                    {property}: {value}
                  </p>
                );
              }
            )}
          </div>
        </div>

        <button onClick={handleOk} className="button-dash" type="button">
          Actualizar
        </button>
      </Modal>
    </Navbar>
  );
};

export default CarsState;
