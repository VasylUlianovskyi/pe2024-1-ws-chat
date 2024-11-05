import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import {
  deleteMessageThunk,
  updateMessageThunk,
} from './../../store/slices/messagesSlice';
import styles from './MessageList.module.sass';

function MessageList ({
  messages,
  error,
  isFetching,
  updateMessage,
  deleteMessage,
}) {
  const scrollTo = useRef(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const [updatedBody, setUpdatedBody] = useState('');

  useEffect(() => {
    scrollTo?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEdit = message => {
    setEditMessageId(message._id);
    setUpdatedBody(message.body);
  };

  const handleUpdate = messageId => {
    console.log('Updating message ID:', messageId, 'with body:', updatedBody);
    updateMessage({ messageId, updatedBody });
    setEditMessageId(null);
  };

  return (
    <section className={styles.messageListContainer}>
      <ul className={styles.messageList}>
        {messages.map(m => (
          <li key={m._id} className={styles.messageItem}>
            {editMessageId === m._id ? (
              <>
                <input
                  className={styles.editInput}
                  value={updatedBody}
                  onChange={e => setUpdatedBody(e.target.value)}
                />
                <IoMdSend
                  onClick={() => handleUpdate(m._id)}
                  className={styles.saveButton}
                />
                <MdOutlineCancel
                  onClick={() => setEditMessageId(null)}
                  className={styles.cancelButton}
                />
              </>
            ) : (
              <>
                <p className={styles.senderId}>{m._id}</p>
                <p className={styles.messageText}>{m.body}</p>
                <p className={styles.sendDate}>{m.createdAt}</p>
                <MdEdit
                  onClick={() => handleEdit(m)}
                  className={styles.editButton}
                />
                <MdDeleteOutline
                  onClick={() => deleteMessage(m._id)}
                  className={styles.deleteButton}
                />
              </>
            )}
          </li>
        ))}
      </ul>
      <div ref={scrollTo} className={styles.errors}>
        {error && <div className={styles.error}>ERROR!!!</div>}
        {isFetching && <div>Messages are loading. Please, wait...</div>}
      </div>
    </section>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteMessage: messageId => dispatch(deleteMessageThunk(messageId)),
  updateMessage: ({ messageId, updatedBody }) =>
    dispatch(updateMessageThunk({ messageId, updatedBody })),
});

export default connect(null, mapDispatchToProps)(MessageList);
