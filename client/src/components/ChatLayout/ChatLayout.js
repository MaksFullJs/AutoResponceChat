import { useContext, useState, useEffect } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatInput from "../ChatInput/ChatInput";
import "./ChatLayout.css";
import { ChatContext } from "../../context/ChatContext";
import { format } from "date-fns";
import { editMessage, getMessage } from "../../api/api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ChatLayout({ chat }) {
    const { messagesFromSelectedChat, selectedChat, updatedMessage } = useContext(ChatContext);
    const [formValue, setFormValue] = useState('')
    const [isEditMessageModalOpen, setEditMessageModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        messageId: null,
    });

    console.log(chat)

    const openEditMessageModal = () => setEditMessageModalOpen(true);
    const closeMessageEditModal = () => setEditMessageModalOpen(false);

    const handleChange = (e) => {
        setFormValue(e.target.value);
    };

    const handleContextMenu = (e, message) => {
        if(message.sender !== 'me') {
            toast.info(`You can not update bots message`);
            return;
        }
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            messageId: message._id,
        });
    };

    const closeContextMenu = () => {
        setContextMenu((prevState) => ({
            ...prevState,
            visible: false,
            x: 0,
            y: 0,
        }));
    };

    const handleClickOutside = () => {
        closeContextMenu();
    };

    useEffect(() => {
        const getMessageData = async (id) => {
            try {
                const response = await getMessage(id);
                if (response.data && response.data.text) {
                    setFormValue(response.data.text);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getMessageData(contextMenu.messageId);
    }, [contextMenu.messageId]);

    const handleEditMessage = async () => {
        try {
            const messageObject = {
                chatId: selectedChat._id,
                sender: 'me',
                text: formValue
            }
            console.log(contextMenu);
            const response = await editMessage(contextMenu.messageId, messageObject);
            console.log(response.data);
            const editedMessage = response.data;
            updatedMessage(editedMessage);
        } catch (error) {
            console.error("Failed to edit chat:", error);
        }
        closeMessageEditModal();
    };

    return (
        <div onClick={handleClickOutside} className="chat-layout">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="dark" />
            <ChatHeader sender={`${chat.firstName + " " + chat.lastName}`} />
            <div className="chat-content">
                {messagesFromSelectedChat &&
                    messagesFromSelectedChat.map((message, index) => (
                        <div
                            key={index}
                            onContextMenu={(e) =>
                                handleContextMenu(e, message)
                            }
                            className={`chat-message ${
                                message.sender === "me"
                                    ? "message-right"
                                    : "message-left"
                            }`}
                        >
                            <span className="message-text">{message.text}</span>
                            <br />
                            <span className="message-time">
                                {format(
                                    new Date(message.sentAt),
                                    "M/d/yy, h:mm a"
                                )}
                            </span>
                        </div>
                    ))}
                {contextMenu.visible && (
                    <div
                        className="context-menu"
                        style={{
                            top: contextMenu.y,
                            left: contextMenu.x,
                            position: "absolute",
                            background: "white",
                            border: "1px solid #ccc",
                            zIndex: 1,
                            padding: "5px",
                        }}
                    >
                        <button onClick={openEditMessageModal}>
                            Оновити
                        </button>
                    </div>
                )}
                <ModalWindow
                    isOpen={isEditMessageModalOpen}
                    title={"Edit this message"}
                    onClose={closeMessageEditModal}
                >
                    <input
                        onChange={handleChange}
                        value={formValue}
                        type="text"
                    ></input>
                    <button onClick={handleEditMessage}>Edit</button>
                </ModalWindow>
            </div>
            <ChatInput />
        </div>
    );
}

export default ChatLayout;
