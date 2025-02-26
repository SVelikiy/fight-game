import { useDispatch, useSelector } from "react-redux";
import { sendPlayerAction } from "../../redux/game/operations";
import {
  selectRoom,
  selectBattleStatus,
} from "../../redux/game/selectors";

const GamePage = () => {
  const dispatch = useDispatch();
  const room = useSelector(selectRoom);
  const status = useSelector(selectBattleStatus);

  const handleAttack = (attack_zone, block_zone) => {
    if (room) {
      dispatch(sendPlayerAction({ roomId: room._id, attack_zone, block_zone }));
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
