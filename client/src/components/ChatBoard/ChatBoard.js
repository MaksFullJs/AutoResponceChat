import "./ChatBoard.css";
import { useState, useContext } from "react";
import { createChat } from "../../api/api";
import ChatCard from "../ChatCard/ChatCard";
import ModalWindow from "../ModalWindow/ModalWindow";
import { ChatContext } from "../../context/ChatContext";

function ChatBoard() {
    let {chats, addChat} = useContext(ChatContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleCreateChat = async () => {
        try {
            const response = await createChat(formValues);
            const newChat = response.data;
            addChat(newChat);
            closeModal();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chat-board">
            <div className="chat-board__search-block">
                <div className="chat-board__search">
                    <i className="search__icon"></i>
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search or start new chat"
                        className="search__field"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="chat-board__title-block">
                <h5 className="title-block__title">Chats</h5>
                <button onClick={openModal} className="title-block__button">
                    +
                </button>
            </div>
            <ModalWindow
                isOpen={isModalOpen}
                title={"Create new chat"}
                onClose={closeModal}
            >
                <input
                    onChange={handleChange}
                    name="firstName"
                    type="text"
                    placeholder="First name"
                ></input>
                <input
                    onChange={handleChange}
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                ></input>
                <button onClick={handleCreateChat}>Create</button>
            </ModalWindow>
            <div className="chat-board__chat-list-block">
                {chats
                    .filter((chat) => {
                        const lowerCaseSearchTerm = searchTerm.toLowerCase();
                        return lowerCaseSearchTerm === ""
                            ? true
                            : (chat.firstName &&
                                  chat.firstName
                                      .toLowerCase()
                                      .includes(lowerCaseSearchTerm)) ||
                                  (chat.lastName &&
                                      chat.lastName
                                          .toLowerCase()
                                          .includes(lowerCaseSearchTerm));
                    })
                    .map(({ _id, firstName, lastName }, idx) => (
                        <ChatCard
                            id={_id}
                            key={idx}
                            firstname={firstName}
                            lastname={lastName}
                        />
                    ))}
            </div>
        </div>
    );
}

export default ChatBoard;
