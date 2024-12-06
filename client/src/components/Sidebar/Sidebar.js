
import ChatBoard from "../ChatBoard/ChatBoard";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className='chat__sidebar'>
            <div className='profile'>
                <div className='profile__avatar'>

                </div>
                <button className='profile__login'>
                    Log in
                </button>
            </div>
            <ChatBoard/>

        </div>
    );
}

export default Sidebar;

