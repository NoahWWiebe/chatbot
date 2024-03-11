// purge.js

import { my_conversation } from "../../models";
import db_connect from "../../db-connection";
const db = db_connect();

export default async function handler(req, res) {
    if (req.method == "POST") {
        try {
            // Purge
            const result = await my_conversation.deleteMany({});

            res.status(200).json({ message: `${result.deletedCount} documents deleted successfully.` });
        } catch (error) {
            console.error('Error during purge:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
}