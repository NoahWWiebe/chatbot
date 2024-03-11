const mongoose = require("mongoose");

const MyUserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  last_login: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const MyConversationSchema = new mongoose.Schema({
  message_id: {
    type: Number,
    required: true,
    unique: true,
  },
  who: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    required: true
  },    
  dialog: {
    type: String,
    required: true
  }
});

export const my_users = mongoose.models.users || mongoose.model("users", MyUserSchema);
export const my_conversation = mongoose.models.conversation || mongoose.model("conversation", MyConversationSchema);
  
export default my_users;