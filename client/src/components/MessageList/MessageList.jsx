import { useEffect, useRef } from 'react';
import styles from './MessageList.module.sass';

function MessageList ({ messages, error, isFetching }) {
  const scrollTo = useRef(null);

  useEffect(() => {
    scrollTo?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className={styles.messageListContainer}>
      <ul className={styles.messageList}>
        {messages.map(m => (
          <li key={m._id} className={styles.messageItem}>
            <p className={styles.senderId}>{m._id}</p>
            <p className={styles.messageText}>{m.body}</p>
            <p className={styles.sendDate}>{m.createdAt}</p>
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

export default MessageList;
