import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "antd/lib/modal";
import { GetCustomerList } from "@/utils/queries";
import { GetCarsList } from "@/utils/queries";
import Navbar from "@/components/Navbar";

const CustomerInformation: React.FC = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerSelect, setCustomerSelect] = useState([]);
  const [customersVC, setCustomersVC] = useState(0);
  const [customersVR, setSustomersVR] = useState(0);

  const router = useRouter();
  const redirect = () => {
    router.push("/dashboard");
  };

  const handeleModal = (e: any, index: any) => {
    setCustomerSelect(e);
    setIsModalOpen(true);
  };

  const getCustomer = async () => {
    const customerList = await GetCustomerList();
    setAllCustomers(customerList);
    // let number = 0;
    // customerList.map((n: any) => {
    //   if (n.VeC >= 1) {
    //     number = number + 1;
    //   }
    // });
    // setSustomersVC(number);

    // let number2 = 0;
    // customerList.map((n: any) => {
    //   if (n.VeR >= 1) {
    //     number2 = number2 + 1;
    //   }
    // });
    // setSustomersVR(number2);
  };

  const getCars = async () => {
    const carsList = await GetCarsList();
    setAllCars(carsList);
    let number = 0;
    carsList.map((n: any) => {
      console.log(n);
      if (n.Estado === "Vendido") {
        number = number + 1;
      }
    });
    setCustomersVC(number);

    let number2 = 0;
    carsList.map((n: any) => {
      if (n.Estado === "Reservado") {
        number2 = number2 + 1;
      }
    });
    setSustomersVR(number2);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getCustomer();
    getCars();
  }, []);

  return (
    <Navbar>
      <div className="container mx-auto">
        <div className="dashboard">
          <ul>
            {allCustomers.map((element, index) => (
              <li key={index}>
                <button
                  className="button-dash"
                  type="button"
                  onClick={() => handeleModal(element, index)}
                >
                  {element.Nombre} {element.Apellios}
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
          <p>Existen {allCustomers.length} de clientes registrados</p>
          <p>
            {allCustomers.map((element, index) => (
              <li key={index}>
                {element.Nombre} {element.Apellios}
              </li>
            ))}
          </p>
          <p>Hay {customersVC} clientes que compraron un vehículo </p>
          <p>Hay {customersVR} clientes que reservaron un vehículo </p>
        </div>
      </div>

      <Modal
        title="Información de Usuario"
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
              "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
            }
          />
          <div style={{ padding: 10 }}>
            {Object.entries(customerSelect).map(([property, value]) => {
              if (property === "password") {
                return;
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
    </Navbar>
  );
};

export default CustomerInformation;
