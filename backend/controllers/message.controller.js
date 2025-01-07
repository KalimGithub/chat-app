const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");

const sendMessage = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const { message } = req.body;

    const senderId = req.user._id; // current Logged in user.
    /// console.log(message, recieverId, senderId);

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, recieverId],
      });
    }
    const newMessage = Message({
      recieverId,
      senderId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save()

    await Promise.all([conversation.save(), newMessage.save()]); // save both in parallel

    // console.log(conversation);
    // console.log(newMessage);

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in send message", error);
    return res.status(500).json("Internal server error");
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current Logged in user

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    // console.log(conversation);
    const messages = conversation.messages;
    return res.status(201).json(messages);
  } catch (error) {
    console.log("error in get message controller", error);
    return res.status(500).json("Internal server error");
  }
};

module.exports = { sendMessage, getMessage };
