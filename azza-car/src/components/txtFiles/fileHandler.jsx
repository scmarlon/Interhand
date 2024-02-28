import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

const FileHandler = () => {
  const [archivoObjeto, setArchivoObjeto] = useState(null);

  useEffect(() => {
    loadData();
  }, []);
  let data = "";
  const loadData = async () => {
    const response = await fetch("/api/getUsers");
    data = await response.json();
    setTimeout(async () => {
      const newArray = [...data.users, { nombre: "Lerq" }];
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArray),
      });
    }, 2000);
  };

  return (
    <div>
      {archivoObjeto && (
        <div>
          <h1>Contenido del Archivo de Texto Convertido en Objeto:</h1>
          {<pre>{JSON.stringify(archivoObjeto, null, 2)}</pre>}
          <div>
            {/* <button onClick={createFile}>Guardar archivo</button> */}
          </div>
        </div>
      )}
    </div>
  );
};
export default FileHandler;
