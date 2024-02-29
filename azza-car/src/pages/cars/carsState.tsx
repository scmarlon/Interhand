"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetCarsList } from "@/utils/queries";
import { Modal } from "antd";
import { GetCustomerList } from "@/utils/queries";

const CarsState: React.FC = () => {
  const [allCars, setAllCars] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [carselect, setcarSelect] = useState([]);

  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState("null");

  const router = useRouter();

  const getCasrs = async () => {
    const carsList = await GetCarsList();
    setAllCars(carsList);
    carsList.map((cars: any) => {
      //console.log(cars);
    });
  };

  const getCustomers = async () => {
    const customerList = await GetCustomerList();
    console.log(customerList);
    setAllCustomers(customerList);
  };

  const test = (e) => {
    setIsModalOpen(true);
    setcarSelect(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const redirect = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    getCasrs();
    getCustomers();
  }, []);

  return (
    <>
      <div className="container">
        <div className="dashboard">
          <ul>
            {allCars.map((element, index) => (
              <li key={index}>
                <button
                  className="button-dash"
                  type="button"
                  onClick={() => test(element)}
                >
                  {element.brand}, Año: {element.year}, Color: {element.color}
                </button>
              </li>
            ))}
          </ul>

          <button type="submit" onClick={redirect}>
            Volver
          </button>
        </div>
      </div>
      <Modal
        title="Información del Vehículo"
        open={isModalOpen}
        onCancel={() => {
          handleCancel();
        }}
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
              if (property === "status") {
                return (
                  <div style={{ fontSize: 20 }}>
                    <h1>Estado: </h1>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Disponible">Disponible</option>
                      <option value="Reservado">Reservado </option>
                      <option value="Vendido">Vendido</option>
                    </select>
                  </div>
                );
              }
              if (property === "customer") {
                return (
                  <div style={{ fontSize: 20 }}>
                    <select
                      id="customer"
                      value={customer}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setCustomer(e.target.value);
                      }}
                    >
                      {allCustomers.map((cutomer: any) => {
                        return <option value={cutomer}>{cutomer.name}</option>;
                      })}
                    </select>
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
      </Modal>
    </>
  );
};

export default CarsState;

// type ModalProps = { open: any; setOpen: any };
// const ModalComponet: React.FC<ModalProps> = ({ open, setOpen }) => {
//   return (
//     <Modal
//       title="Información del Vehículo"
//       open={open}
//       onCancel={() => {
//         setOpen(false);
//       }}
//     ></Modal>
//   );
// };
