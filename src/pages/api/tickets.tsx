import type { NextApiRequest, NextApiResponse } from "next";
import pool from "~/utils/db";

export default async function tickets(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { facilitatorName, ticket } = req.body;
    console.log(facilitatorName, ticket);
    try {
      const result = await pool.query(
        "INSERT INTO tickets(facilitatorName, name) VALUES ($1, $2) RETURNING *",
        [facilitatorName, ticket],
      );

      res.status(201).json({ status: "Created succesfully" });
    } catch (cause) {
      console.log(cause);
      res.status(500).json({ status: "Error", message: "Sth bad went wrong" });
    }
  } else if (req.method === "GET") {
    try {
      const result = await pool.query("SELECT * FROM tickets");
      console.log(result.rows, "from the server");
      res.status(201).json(JSON.stringify(result.rows));
    } catch (cause) {
      console.log(cause);
      res.status(500).json({ status: "Error", message: "Sth bad went wrong" });
    }
  }
}
