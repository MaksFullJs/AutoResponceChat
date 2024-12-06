import React, { createContext, useState, useEffect } from "react";
import { getChats, getMessages } from "../api/api";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [messagesFromSelectedChat, setMessagesFromSelectedChat] = useState(
        []
    );
    const [selectedChat, setSelectedChat] = useState(null);
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        const newSocket = io("http://localhost:5020");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);


    const getChatsData = async () => {
        try {
            const response = await getChats();
            setChats(response.data);
        } catch (err) {
            console.log(err.message || "Failed to load chats");
        }
    };

    useEffect(() => {
        getChatsData();
    }, []);

    useEffect(() => {
        const getMessagesData = async () => {
            try {
                const response = await getMessages(selectedChat._id);
                if (response.status === 201) {
                    setMessagesFromSelectedChat(response.data);
                }
            } catch (err) {
                console.log(err.message + "Failed to load chats");
            }
        };

        if (selectedChat) {
            getMessagesData();
        }
    }, [selectedChat]);

    const addChat = (newChat) => setChats((prev) => [...prev, newChat]);

    const updateChat = (updatedChat) => {
        setChats((prev) =>
            prev.map((chat) =>
                chat._id === updatedChat._id ? updatedChat : chat
            )
        );
    };

    const destroyChat = (id) => {
        setChats((prev) => prev.filter((chat) => chat._id !== id));
    };

    const updateSelectedChat = (chat) => {
        setSelectedChat(chat);
    };

    const addMessage = (newMessage) => {
        if (newMessage.chatId === selectedChat._id) {
            setMessagesFromSelectedChat((prev) => [...prev, newMessage]);
        } else {
            setMessagesFromSelectedChat((prev) => [...prev]);
        }
    };

    // const addMessageToRandomChat = (newMessage, randomChat) => {
    //     // console.log(randomChat)
    //     // updateSelectedChat(randomChat);
    //     // console.log(selectedChat)
    //     // if (newMessage.chatId === selectedChat._id) {
    //     setMessagesFromSelectedChat((prev) => [...prev, newMessage]);
    //     // } else {
    //     //     setMessagesFromSelectedChat((prev) => [...prev]);
    //     // }
    // };

    const addMessageToRandomChat = (newMessage, randomChat) => {
        // Оновлення списку повідомлень для конкретного чату
        if (newMessage.chatId === randomChat._id) {
            setMessagesFromSelectedChat((prev) => [...prev, newMessage]);
        } else {
            setMessagesFromSelectedChat((prev) => [...prev]);
        }
    };

    const updatedMessage = (updatedMessage) => {
        setMessagesFromSelectedChat((prev) =>
            prev.map((message) =>
                message._id === updatedMessage._id ? updatedMessage : message
            )
        );
    };

    return (
        <ChatContext.Provider
            value={{
                chats,
                getChatsData,
                addChat,
                updateChat,
                destroyChat,
                updateSelectedChat,
                selectedChat,
                messagesFromSelectedChat,
                addMessage,
                socket,
                updatedMessage,
                addMessageToRandomChat
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
