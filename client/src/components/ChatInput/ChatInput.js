import { useContext, useState, useEffect } from "react";
import "./ChatInput.css";
import { ChatContext } from "../../context/ChatContext";
import { createMessage } from "../../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatInput() {
    const [message, setMessage] = useState("");
    const { selectedChat, addMessage, socket } = useContext(ChatContext);

    // useEffect(() => {
    //     socket.on("newMessage", (message, chat) => {
    //         addMessage(message);
    //         toast.info(`You get a message from ${chat.firstName + ' ' + chat.lastName + ': ' + message.text}`);
    //     });

    //     return () => {
    //         socket.off("newMessage");
    //     };
    // }, [socket, addMessage]);

    useEffect(() => {
        const handleNewMessage = (message, chat) => {
            addMessage(message);
            // Унікальний ID для кожного toast
            const toastId = `newMessage-${chat._id}`;
            const containerId = "chatNotifications";

            if (!toast.isActive(toastId)) {
                toast.info(
                    `You got a message from ${
                        chat.firstName + " " + chat.lastName
                    }: ${message.text}`,
                    {
                        toastId: toastId,
                        containerId: containerId,
                    }
                );
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, addMessage]);

    const handleCreateMessage = async () => {
        try {
            const response = await createMessage(
                selectedChat._id,
                "me",
                message
            );
            const newMessage = response.data;
            addMessage(newMessage);
            setMessage("");
            console.log("emit autores");
            socket.emit("sendAutoMessage", selectedChat);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chat-input">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="chat-input__field"
                placeholder="Type your message"
            />
            <button
                onClick={handleCreateMessage}
                className="chat-input__send-btn"
            >
                ➤
            </button>
            <ToastContainer
                containerId="chatNotifications"
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />
        </div>
    );
}

export default ChatInput;
