import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This TypeScript function handles incoming requests by checking for the existence of a file, writing
 * request body data to a file, and then responding with a JSON object.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const respose = await fetch("http://localhost:3000/cars.txt");
    if (!respose) {
      res.status(200).json({ status: 400, respose });
    }
    const text = await respose.text();
    const cars = JSON.parse(text);

    res.status(200).json({ status: 200, cars });
  } catch (error) {
    res.status(200).json({ status: 400 });
  }
}
