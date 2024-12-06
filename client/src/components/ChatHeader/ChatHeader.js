import "./ChatHeader.css";

function ChatHeader({sender}) {
    return (
        <div className="chat-header">
            <div className="chat-header__avatar"></div>
            <span className="chat-header__name">{sender}</span>
        </div>
    );
}

export default ChatHeader;
