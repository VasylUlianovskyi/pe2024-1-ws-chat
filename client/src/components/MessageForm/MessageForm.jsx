import { Formik, Form, Field } from 'formik';
import styles from './MessageForm.module.sass';
import { ws } from '../../api';
function MessageForm () {
  const addMessage = (values, formikBag) => {
    ws.createMessage(values);
    formikBag.resetForm();
  };

  return (
    <section className={styles.formContainer}>
      <Formik initialValues={{ body: '' }} onSubmit={addMessage}>
        <Form className={styles.form}>
          <Field
            name='body'
            placeholder='Enter your message...'
            className={styles.field}
          />
          <button type='submit' className={styles.submitButton}>
            Send
          </button>
        </Form>
      </Formik>
    </section>
  );
}

export default MessageForm;
