import MyButton from "../components/MyButton";
import {useNavigate} from "react-router-dom";
import {MENU} from "../logic/Names";
import {getEmoji} from "../logic/Functions";

function Dashboard(){

    const navigate = useNavigate();

    return(
        <div>
            <div className="title">
                <p> {getEmoji()} DashBoard Copy/Paste {getEmoji()}</p>
            </div>
            <MyButton text="Back" onPress={() => navigate(MENU)}/>
        </div>
    );
}
export default Dashboard;