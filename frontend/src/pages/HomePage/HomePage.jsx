import Hero from "../../components/Hero/Hero";
import StartGame from "../StartGame/StartGame";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useDispatch } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";


export default function HomePage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const handleRefresh = () => {
        dispatch(refreshUser())
    }



    return (
        <div>
            <button type="button" onClick={handleRefresh}>Refresh</button>
            {isLoggedIn ? <StartGame /> : <Hero />}</div>
    )
}