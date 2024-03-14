import { my_users } from "../../models";
import db_connect from "../../db-connection";
const db = db_connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user_id } = req.body;
      // Update last_login for the user identified by user_id
      await my_users.updateOne({ user_id: user_id }, { $set: { last_login: new Date() } });

      res.status(200).json({ message: "Last login updated successfully" });
    } catch (error) {
      console.error('Error updating last login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(200).send(`${req.method} not implemented`);
  }
}
