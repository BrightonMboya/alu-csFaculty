import pool from "~/utils/db";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      //hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // store the username and hashed password on the db
      const result = await pool.query(
        "INSERT INTO USERS(username, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword],
      );

      // if user is created succesfully return the success message
      res.status(201).json({ status: "Created", user: result.rows[0] });
    } catch (error) {
      // @ts-expect-error
      res.status(500).json({ status: "Error", message: error?.message });
    }
  } else {
    res.status(405).json({ status: "method not allowed" });
  }
}
