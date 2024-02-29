"use client";
import Swal from "sweetalert2";

const Navbar = ({ children }) => {
  const ShowInfo = () => {
    Swal.fire({
      title: "AzzaCar",
      html: "Teléfono: 8888-8888.<br/>Dirección: Cartago, Cartago, Occidental.",
    });
  };

  return (
    <div>
      <div className="navbar">
        <div className="test">
          <i onClick={ShowInfo}>AzzaCar</i>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Navbar;
