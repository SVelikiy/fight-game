import { useDispatch, useSelector } from "react-redux";
import { sendPlayerAction } from "../../redux/game/operations";
import {
  selectRoom
} from "../../redux/game/selectors";
import { selectUser } from "../../redux/auth/selectors";

const GamePage = () => {
  const dispatch = useDispatch();
  const room = useSelector(selectRoom);
  const currentUser = useSelector(selectUser);
  console.log(currentUser._id);

  const handleAttack = (attack_zone, block_zone) => {
    if (room) {
      dispatch(sendPlayerAction({ roomId: room._id,playerId:currentUser._id, attack_zone, block_zone }));
    }
  };

  return (
    <div>
      <h2>Battle Room</h2>
      {room && (
        <>
          <button onClick={() => handleAttack("head", "body")}>
            Attack Head / Block Body
          </button>
          <button onClick={() => handleAttack("body", "head")}>
            Attack Body / Block Head
          </button>
        </>
      )}
    </div>
  );
};

export default GamePage;
