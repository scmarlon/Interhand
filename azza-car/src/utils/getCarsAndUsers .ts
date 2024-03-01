/**
 * The function `getCarsAndUsers` processes an array of cars and users to return a formatted array with
 * information about sold or reserved cars grouped by seller and status.
 */
export const getCarsAndUsers = (allCars: any[], allUsers: any[]) => {
  let format: any[] = [];
  allCars.map((car: { Estado?: string; Vendedor?: string }) => {
    const { Estado, Vendedor } = car;
    if (["Vendido", "Reservado"].includes(Estado ?? "")) {
      if (!format.length) {
        format.push({ Nombre: Vendedor, Tipo: Estado, Cantidad: 0 });
      } else {
        format.map(
          (userInfo: { Nombre: string; Tipo: string; Cantidad: number }) => {
            if (userInfo.Nombre === Vendedor && userInfo.Tipo === Estado) {
              userInfo.Cantidad++;
            } else {
              format.push(userInfo);
            }
          }
        );
      }
    }
  });

  return format;
};
