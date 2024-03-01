import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "antd/lib/modal";
import { GetUsersList } from "@/utils/queries";

const CarsState: React.FC = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelect, setUserSelect] = useState([]);

  const router = useRouter();
  const redirect = () => {
    router.push("/dashboard");
  };

  const handeleModal = (e: any, index: any) => {
    setUserSelect(e);
    setIsModalOpen(true);
  };

  /**
   * The function `getUsers` asynchronously fetches a list of users and sets them in the state variable
   * `allUsers`.
   */
  const getUsers = async () => {
    const customerList = await GetUsersList();
    setAllUsers(customerList);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <div className="dashboard">
          <ul>
            {allUsers.map((element, index) => (
              <li key={index}>
                <button
                  className="button-dash"
                  type="button"
                  onClick={() => handeleModal(element, index)}
                >
                  {element.Nombre} {element.Apellios}
                  {/* {element.name}, Año: {element.Año}, Color: {element.Color} */}
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
            {Object.entries(userSelect).map(([property, value]) => {
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
    </>
  );
};

export default CarsState;
