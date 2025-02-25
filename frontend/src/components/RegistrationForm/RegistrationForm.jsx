import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { selectIsError, selectIsLoading } from "../../redux/auth/selectors";
import css from "./RegistrationForm.module.css";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short, minimum 2 letters")
    .max(15, "Too long, maximum 15 letters")
    .required("This field is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("This field is required"),
});

export default function RegistrationForm() {
  const nameId = nanoid();
  const emailId = nanoid();
  const passwordId = nanoid();

  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label htmlFor={nameId}>Name</label>
          <Field type="text" name="name" id={nameId} className={css.input} />
          <ErrorMessage
            name="name"
            component="span"
            className={css.errMessageName}
          />
          <label htmlFor={emailId}>Email</label>
          <Field type="email" name="email" id={emailId} className={css.input} />
          <ErrorMessage
            name="email"
            component="span"
            className={css.errMessageEmail}
          />
          <label htmlFor={passwordId}>Password</label>
          <Field
            type="password"
            name="password"
            id={passwordId}
            className={css.input}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.errMessagePassword}
          />
          <button type="submit" disabled={isLoading} className={css.button}>
            Register
          </button>
        </Form>
      </Formik>
      {isError && (
        <h2>Someting went wrong, please reload the page and try again.</h2>
      )}
    </div>
  );
}
