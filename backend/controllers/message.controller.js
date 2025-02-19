import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { textMessage: message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Establish conversation if not found  (participants must be unique)
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    // Implement real-time updates using websockets
    const recieverSocketId = getReceiverSocketId(receiverId); 
    if(recieverSocketId){
      io.to(recieverSocketId).emit('newMessage', newMessage);
    }

    return res
      .status(201)
      .json({
        success: true,
        newMessage
       
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('messages');

    if (!conversation)
      return res.status(404).json({ message: "Conversation not found" });

    return res.status(200).json({ messages: conversation?.messages, success: true });



  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
