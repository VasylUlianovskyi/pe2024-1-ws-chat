import { useState } from 'react';
import styles from './RoomSelector.module.sass';

function RoomSelector ({ room, joinRoom, leaveRoom }) {
  const [roomInput, setRoomInput] = useState('');

  const handleJoin = () => {
    if (roomInput) {
      joinRoom(roomInput);
      setRoomInput('');
    }
  };

  return (
    <div className={styles.roomSelector}>
      {room ? (
        <div>
          <p>Joined room: {room}</p>
          <button onClick={leaveRoom}>Leave Room</button>
        </div>
      ) : (
        <div>
          <input
            type='text'
            placeholder='Enter room name'
            value={roomInput}
            onChange={e => setRoomInput(e.target.value)}
          />
          <button onClick={handleJoin}>Join Room</button>
        </div>
      )}
    </div>
  );
}

export default RoomSelector;
