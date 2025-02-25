import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import { selectIsError, selectIsLoading } from "../../redux/auth/selectors";
import css from "./LoginForm.module.css";

const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("This field is required"),
});

export default function LoginForm() {
  const userInfo = {
    email: "",
    password: "",
  };

  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const emailId = nanoid();
  const passwordId = nanoid();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={userInfo}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label htmlFor={emailId} className={css.label}>
            Email
          </label>
          <Field type="email" name="email" id={emailId} className={css.input} />
          <ErrorMessage
            name="email"
            component="span"
            className={css.errMessageName}
          />
          <label htmlFor={passwordId} className={css.label}>
            Password
          </label>
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
            Log in
          </button>
        </Form>
      </Formik>
      {isError && (
        <h2>Someting went wrong, please reload the page and try again.</h2>
      )}
    </div>
  );
}
