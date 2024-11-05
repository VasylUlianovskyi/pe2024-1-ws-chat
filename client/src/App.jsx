import { useEffect } from 'react';
import { getMessagesThunk } from './store/slices/messagesSlice';
import styles from './App.module.css';
import { connect } from 'react-redux';
import MessageList from './components/MessageList/MessageList';
import MessageForm from './components/MessageForm/MessageForm';

function App ({ messages, isFetching, error, limit, get }) {
  useEffect(() => {
    get(limit);
  }, [limit, get]);

  return (
    <article className={styles.appContainer}>
      <MessageList messages={messages} error={error} isFetching={isFetching} />
      <MessageForm />
    </article>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = dispatch => ({
  get: limit => dispatch(getMessagesThunk(limit)),
  create: values => dispatch(createMessageThunk(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
