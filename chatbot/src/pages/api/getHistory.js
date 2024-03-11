// getHistory.js

import { my_conversation } from "../../models";
import db_connect from "../../db-connection";
const db = db_connect();

export default async function handler(req, res) {
    if (req.method == "GET") {
        try {
            const history = await my_conversation.find({}, { _id: 0, __v: 0 });

            res.status(200).json(history);            
        } catch (error) {
            console.error('Error fetching conversation history:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(200).send(`${req.method} not implemented`);
    }
}