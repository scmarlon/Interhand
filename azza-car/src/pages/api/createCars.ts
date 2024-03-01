import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

/**
 * This TypeScript function handles incoming requests by checking for the existence of a file, writing
 * request body data to a file, and then responding with a JSON object.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!fs.existsSync("./public/cars.txt")) {
    res.status(200).json({ status: 400, mensaje: "no existe" });
  }

  fs.writeFileSync("./public/cars.txt", JSON.stringify(req.body), {
    flag: "w",
  });

  fs.readFile("./public/cars.txt", "utf8", (readErr, data) => {
    if (readErr) {
      return;
    }
  });
  res.status(200).json({ name: "John Doe" });
}
