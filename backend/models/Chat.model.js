// models/Chat.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
// const chats = [
//     {
//         sender: '6728871f3a1b74fe05545e37',
//         receiver: '672b85b4fdf5feff81934a5a',
//         message: 'Hello, how are you?',
//     },
//     {
//         sender: '672b85b4fdf5feff81934a5a',
//         receiver: '6728871f3a1b74fe05545e37',
//         message: 'I am good, thanks!',
//     }
// ];