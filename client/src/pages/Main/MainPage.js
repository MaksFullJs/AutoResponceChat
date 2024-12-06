import ChatBlock from "../../components/ChatBlock/ChatBlock";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./MainPage.css";

function MainPage() {
    return (
        <section className="chat">
            <div className="chat__container chat__flex-container">
                <Sidebar/>
                <ChatBlock/>
            </div>
        </section>
    );
}

export default MainPage;
