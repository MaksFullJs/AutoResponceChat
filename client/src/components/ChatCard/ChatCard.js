import ModalWindow from "../ModalWindow/ModalWindow";
import "./ChatCard.css";
import { useState, useEffect, useContext } from "react";
import { getChat, editChat, deleteChat, getMessage } from "../../api/api";
import { ChatContext } from "../../context/ChatContext";
import { format } from "date-fns";

function ChatCard({ id, firstname, lastname }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    let {
        updateChat,
        destroyChat,
        updateSelectedChat,
        selectedChat,
        messagesFromSelectedChat,
    } = useContext(ChatContext);
    const [chat, setChat] = useState(null);
    const [lastMessage, setLastMessage] = useState("");
    const [lastMessageTime, setLastMessageTime] = useState("");
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
    });

    console.log(messagesFromSelectedChat);

    const openEditModal = () => setEditModalOpen(true);
    const closeEditModal = () => setEditModalOpen(false);
    const openDeleteModal = () => setDeleteModalOpen(true);
    const closeDeleteModal = () => setDeleteModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleEditChat = async () => {
        try {
            const response = await editChat(id, formValues);
            const editedChat = response.data;
            updateChat(editedChat);
        } catch (error) {
            console.error("Failed to edit chat:", error);
        }
        closeEditModal();
    };

    const handleDeleteChat = async () => {
        try {
            await deleteChat(id);
            destroyChat(id);
        } catch (error) {
            console.error("Failed to delete chat:", error);
        }
    };

    const getLastMessageInfo = async (chat) => {

        if (chat.messages.length === 0) {
            setLastMessage("");
            return;
        }
        try {
            const lastMessageId = chat.messages[chat.messages.length - 1];
            const response = await getMessage(lastMessageId);
            setLastMessage(response.data.text);
            const formattedDate = format(
                new Date(response.data.sentAt),
                "MMM d, yyyy"
            );
            setLastMessageTime(formattedDate);
        } catch (error) {
            console.error("Failed to fetch last message:", error);
        }
    };

    useEffect(() => {
        const getChatData = async (id) => {
            try {
                const response = await getChat(id);
                const data = response.data;
                setChat(data);
                setFormValues({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                });
                getLastMessageInfo(data);
            } catch (err) {
                console.log(err);
            }
        };
        getChatData(id);
    }, [id, messagesFromSelectedChat]);

    return (
        <div
            onClick={() => updateSelectedChat(chat)}
            className={`chat-card ${
                id === selectedChat?._id ? "selected" : ""
            }`}
        >
            <div className="chat-card__avatar"></div>
            <div className="chat-card__content">
                <div className="chat-card__header">
                    <span className="chat-card__name">
                        {firstname + " " + lastname}
                    </span>
                    <span className="chat-card__date">{lastMessageTime}</span>
                </div>
                <div className="chat-card__body">
                    <div className="chat-card__message">{lastMessage}</div>
                    <div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                openDeleteModal();
                            }}
                            className="chat-card__delete-btn"
                        >
                            ×
                        </button>
                        <ModalWindow
                            isOpen={isDeleteModalOpen}
                            title={"Do you really want to delete this chat?"}
                            onClose={closeDeleteModal}
                        >
                            <button onClick={handleDeleteChat}>Yes</button>
                        </ModalWindow>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                openEditModal();
                            }}
                            className="chat-card__edit-btn"
                        >
                            <i className="chat-card__edit-icon"></i>
                        </button>
                        <ModalWindow
                            isOpen={isEditModalOpen}
                            title={"Edit this chat"}
                            onClose={closeEditModal}
                        >
                            <input
                                onChange={handleChange}
                                value={formValues.firstName}
                                name="firstName"
                                type="text"
                                placeholder="First name"
                            ></input>
                            <input
                                onChange={handleChange}
                                value={formValues.lastName}
                                name="lastName"
                                type="text"
                                placeholder="Last name"
                            ></input>
                            <button onClick={handleEditChat}>Edit</button>
                        </ModalWindow>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatCard;
