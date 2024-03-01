/**
 * This function asynchronously fetches a list of users from a specified API endpoint and returns the
 * list of users if the response status is 200.
 * @returns The function `GetUsersList` is returning the list of users fetched from the "/api/getUsers"
 * endpoint if the status in the response data is 200. If the status is not 200, it returns null.
 */
export const GetUsersList = async () => {
  const response = await fetch("/api/getUsers");
  const data: any = await response.json();
  if (data.status !== 200) return null;
  return data.users;
};

/**
 * The function `GetCarsList` makes an asynchronous request to fetch a list of cars from a specified
 * API endpoint and returns the list of cars if the response status is 200.
 * @returns The function `GetCarsList` is returning the list of cars fetched from the "/api/getCars"
 * endpoint if the status in the response data is 200. If the status is not 200, it will return null.
 */
export const GetCarsList = async () => {
  const response = await fetch("/api/getCars");
  const data: any = await response.json();
  if (data.status !== 200) return null;
  return data.cars;
};

/**
 * The function `GetCustomerList` makes an asynchronous request to fetch customer data from an API
 * endpoint and returns the customer list if the response status is 200.
 * @returns The function `GetCustomerList` is returning the list of customers fetched from the API
 * endpoint "/api/getCustomer" if the status code in the response is 200. If the status code is not
 * 200, it returns null.
 */
export const GetCustomerList = async () => {
  const response = await fetch("/api/getCustomer");
  const data: any = await response.json();
  if (data.status !== 200) return null;
  return data.customer;
};
