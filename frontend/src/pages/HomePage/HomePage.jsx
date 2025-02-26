import Hero from "../../components/Hero/Hero";
import StartGame from "../StartGame/StartGame";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";


export default function HomePage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div>
            {isLoggedIn ? <StartGame /> : <Hero />}</div>
    )
}