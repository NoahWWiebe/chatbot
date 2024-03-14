// converse.js

import { my_conversation } from "@/models";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const messages = [];

export default async function (req, res) {
  try {
    if (messages.length === 0) {
      const conversation = await my_conversation.find({});
      conversation.map((message) => {
        messages.push({ role: message.who, content: message.dialog });
      });
    }
  } catch (error) {
    console.error("Error while fetching conversation:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  messages.push({ role: "user", content: req.body.query });

  let completion = {};

  try {
    let messages_data = {
      model: "gpt-3.5-turbo",
      messages: messages,
    };

    completion = await openai.createChatCompletion(messages_data);
  } catch (err) {
    console.log(err);
    return;
  }

  messages.push(completion.data.choices[0].message);
  res.status(200).json({ result: messages });
}
