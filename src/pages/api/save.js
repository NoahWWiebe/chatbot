// save.js

import { my_conversation } from "../../models";
import db_connect from "../../db-connection";
const db = db_connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { who, when, dialog } = req.body;

      const maxIdItem = await my_conversation.findOne({}).sort({ message_id: -1 }).limit(1);
      let newId = 0; // Default id if no items exist in the collection
      if (maxIdItem) {
        newId = maxIdItem.message_id + 1;
      }

      const message_id = newId;

      const newMessage = new my_conversation({
        message_id,
        who,
        when,
        dialog,
      });

      const savedMessage = await newMessage.save();

      res.status(201).json({ success: true, message: 'Message saved successfully', savedMessage });
    } catch (error) {
      console.error("Error while saving message:", error);
      return res.status(500).json({ success: false, reason: "Internal Server Error, Failure Saving." });
    }
  } else {
    return res.status(405).send(`${req.method} not allowed`);
  }
}
