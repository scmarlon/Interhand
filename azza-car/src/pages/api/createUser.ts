// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!fs.existsSync("./public/users.txt")) {
    res.status(200).json({ status: 400, mensaje: "no existe" });
  }

  fs.writeFileSync("./public/users.txt", JSON.stringify(req.body), {
    flag: "w",
  });

  fs.readFile("./public/users.txt", "utf8", (readErr, data) => {
    if (readErr) {
      return;
    }
  });

  res.status(200).json({ name: "John Doe" });
}
