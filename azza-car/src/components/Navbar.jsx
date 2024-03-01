"use client";
import Swal from "sweetalert2";

const Navbar = ({ children }) => {
  /**
   * The `ShowInfo` function displays a pop-up message using the `Swal.fire` method with information
   * about AzzaCar.
   */
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
