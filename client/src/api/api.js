import axios from "axios";

export const getChats = async () => {
    return await axios.get("http://localhost:5020/api/chats");
};

export const createChat = async (chat) => {
    return await axios.post("http://localhost:5020/api/chats", chat);
};

export const deleteChat = async (id) => {
    await axios.delete(`http://localhost:5020/api/chat/${id}`);
};

export const editChat = async (id, updatedChat) => {
    return axios.put(`http://localhost:5020/api/chat/${id}`, updatedChat);
};

export const getChat = async (id) => {
    return await axios.get(`http://localhost:5020/api/chat/${id}`);
};

export const createMessage = async (chatId, sender, text) => {
    return await axios.post(
        `http://localhost:5020/api/chat/${chatId}/messages`,
        { chatId, sender, text }
    );
};

export const getMessages = async (chatId) => {
    return await axios.get(`http://localhost:5020/api/chat/${chatId}/messages`);
};

export const getMessage = async (id) => {
    return await axios.get(`http://localhost:5020/api/chat/message/${id}`);
};

export const editMessage = async (id, updatedMessage) => {
    console.log(updatedMessage);
    return await axios.put(
        `http://localhost:5020/api/chat/message/${id}`,
        updatedMessage
    );
};