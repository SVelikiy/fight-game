import { useState, useEffect } from "react";
import { socket } from "../../utils/socket";
import { joinBattle } from "../../redux/auth/operations";

export default function GamePage () {
  const [roomId, setRoomId] = useState(null);
  const [hp, setHp] = useState({ player1: 10, player2: 10 });
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.connect();
    socket.on("round_result", (data) => {
      setHp(data.hp);
      if (data.status === "finished") setWinner(data.winner);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoinBattle = async () => {
      const response = await joinBattle();
      console.log(response.data)
    setRoomId(response.data._id);
    socket.emit("join_battle", response.data._id);
  };

  const handleAction = (attack, block) => {
    socket.emit("player_action", {
      roomId,
      player1: "player1_id",
      player2: "player2_id",
      action1: { attack_zone: attack, block_zone: block },
      action2: { attack_zone: "body", block_zone: "head" },
    });
  };

  return (
    <div>
      <h2>Battle Room</h2>
      {!roomId && <button onClick={handleJoinBattle}>Join Battle</button>}
      {roomId && (
        <>
          <h3>
            HP: {hp.player1} vs {hp.player2}
          </h3>
          <button onClick={() => handleAction("head", "body")}>
            Attack Head / Block Body
          </button>
          <button onClick={() => handleAction("body", "head")}>
            Attack Body / Block Head
          </button>
        </>
      )}
      {winner && <h3>Winner: {winner}</h3>}
    </div>
  );
};

