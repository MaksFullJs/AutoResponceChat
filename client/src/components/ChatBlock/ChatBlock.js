import { useContext } from "react";
import ChatLayout from "../ChatLayout/ChatLayout";
import "./ChatBlock.css";
import { createMessage } from "../../api/api";
import { ChatContext } from "../../context/ChatContext";
import { toast, ToastContainer } from "react-toastify";

function ChatBlock() {
    const {
        selectedChat,
        socket,
        chats,
        addMessageToRandomChat,
        updateSelectedChat,
    } = useContext(ChatContext);

    const handleCreateHelloMessageToRandomChat = async () => {
        try {
            const randomChatNumber = Math.floor(Math.random() * chats.length);
            const randomChat = chats[randomChatNumber];
            const response = await createMessage(randomChat._id, "me", "Hello");
            const newMessage = response.data;
            updateSelectedChat(randomChat);

            addMessageToRandomChat(newMessage, randomChat);
            socket.emit(
                "sendRespondToHelloMessage",
                randomChat,
                newMessage.text
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chat__block">
            {selectedChat == null ? (
                <div>
                    <p>ChatBlock is empty! Choose chat OR</p>
                    <button onClick={handleCreateHelloMessageToRandomChat}>
                        send hello message to random chat
                    </button>
                </div>
            ) : (
                <ChatLayout chat={selectedChat} />
            )}
        </div>
    );
}

export default ChatBlock;
