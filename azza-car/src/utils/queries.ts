export const GetUsersList = async () => {
  const response = await fetch("/api/getUsers");
  const data: any = await response.json();
  if (data.status !== 200) return null;
  return data.users;
};

export const GetCarsList = async () => {
  const response = await fetch("/api/getCars");
  const data: any = await response.json();
  if (data.status !== 200) return null;
  return data.cars;
};

export const GetCustomerList = async () => {
  const response = await fetch("/api/getCustomer");
  const data: any = await response.json();
  if (data.status !== 200) return null;
  return data.customer;
};
