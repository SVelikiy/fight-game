import Hero from "../../components/Hero/Hero";
import StartGame from "../StartGame/StartGame";
import { useSelector } from "react-redux";
import { selectIsLoggedIn,selectToken} from "../../redux/auth/selectors";


export default function HomePage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = useSelector(selectToken);
    console.log(token);
    return (
        <div>{isLoggedIn ? <StartGame/> : <Hero/>}</div>
    )
}