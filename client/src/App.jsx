import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { getMessagesThunk } from './store/slices/messagesSlice';
import styles from './App.module.css';
import { connect } from 'react-redux';
import { createMessage } from './api';

function App ({ messages, isFetching, error, limit, create, get }) {
  useEffect(() => {
    get(limit);
  }, [limit]);

  const addMessage = (values, formikBag) => {
    // create(values);
    createMessage(values);
    formikBag.resetForm();
  };

  return (
    <article>
      <section>
        <ul>
          {messages.map(m => (
            <li key={m._id} className={styles.messageItem}>
              <p>{m._id}</p>
              <p>{m.body}</p>
              <p>{m.createdAt}</p>
            </li>
          ))}
        </ul>
        <div>
          {error && <div style={{ color: 'red' }}>ERROR!!!</div>}
          {isFetching && <div>Messages is loading. Please, wait...</div>}
        </div>
      </section>

      <section className={styles.formContainer}>
        <Formik initialValues={{ body: '' }} onSubmit={addMessage}>
          <Form>
            <Field name='body'></Field>
            <button type='submit'>Send</button>
          </Form>
        </Formik>
      </section>
    </article>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = dispatch => ({
  get: limit => dispatch(getMessagesThunk(limit)),
  create: values => dispatch(createMessageThunk(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
