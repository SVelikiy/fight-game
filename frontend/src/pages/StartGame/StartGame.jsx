import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinBattle } from "../../redux/game/operations";
import {
  selectRoom,
  selectBattleStatus,
  selectBattleError,
} from "../../redux/game/selectors";
import { socket } from "../../utils/socket";
import { NavLink } from "react-router-dom";

const StartGame = () => {
  const dispatch = useDispatch();
  const room = useSelector(selectRoom);
  const status = useSelector(selectBattleStatus);
  const error = useSelector(selectBattleError);

  useEffect(() => {
    if (room) {
      socket.connect();
      socket.emit("join_battle", room._id);
    }
  }, [room, dispatch]);

  const handleJoinBattle = () => {
    dispatch(joinBattle());
  };

  return (
    <div>
      {status === "loading" && <p>Joining battle...</p>}
      {status === "error" && <p>Error: {error}</p>}
      <NavLink to='/gamepage' onClick={handleJoinBattle}>Start Game</NavLink>
    </div>
  );
};

export default StartGame;
