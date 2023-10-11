import pool from "~/utils/db";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      // get the user with the provided username
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);

      if (user.rows.length > 0) {
        const passwordMatches = await bcrypt.compare(
          password,
          user.rows[0].password,
        );

        if (passwordMatches) {
          res
            .status(200)
            .json({ status: "success", message: "login succesful" });
        } else {
          res.status(403).json({ status: "Error", message: "Invalid Passwd" });
        }
      } else {
        res.status(404).json({ status: "Error", message: "User not found" });
      }
    } catch (error) {
      // @ts-expect-error
      res.status(500).json({ status: "Error", message: error.message });
    }
  } else {
    res.status(405).json({ status: "Method Not Allowed" });
  }
}
