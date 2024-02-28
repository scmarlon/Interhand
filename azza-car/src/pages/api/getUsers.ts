// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const respose = await fetch("http://localhost:3000/users.txt");
    if (!respose) {
      res.status(200).json({ status: 400, respose });
    }
    const text = await respose.text();
    const users = JSON.parse(text);

    res.status(200).json({ status: 200, users });
  } catch (error) {
    res.status(200).json({ status: 400 });
  }
}
