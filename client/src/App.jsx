import { useEffect, useState } from 'react';
import { getMessagesThunk } from './store/slices/messagesSlice';
import styles from './App.module.css';
import { connect } from 'react-redux';
import MessageList from './components/MessageList/MessageList';
import MessageForm from './components/MessageForm/MessageForm';
import RoomSelector from './components/RoomSelector/RoomSelector';
import { ws } from './api';

function App ({ messages, isFetching, error, limit, get }) {
  const [room, setRoom] = useState('');

  useEffect(() => {
    get(limit);
  }, [limit, get]);

  const handleJoinRoom = roomName => {
    ws.joinRoom(room);
    setRoom(roomName);
  };

  const handleLeaveRoom = () => {
    ws.leaveRoom(room);
    setRoom('');
    console.log(room);
  };

  return (
    <article className={styles.appContainer}>
      <RoomSelector
        room={room}
        joinRoom={handleJoinRoom}
        leaveRoom={handleLeaveRoom}
      />
      <MessageList messages={messages} error={error} isFetching={isFetching} />
      <MessageForm room={room} />
    </article>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = dispatch => ({
  get: limit => dispatch(getMessagesThunk(limit)),
  create: values => dispatch(createMessageThunk(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
