import { useEffect, useRef, useState } from 'react';
import Router from 'next/router';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Button } from '../buttons';
import { userService } from '../../services';
import { Spinner } from '../general/Spinner';

import { useAppSelector, useAppDispatch } from '../../hook/useRedux';
import { getPerson, setPerson } from '../../redux/';

export const LoginForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const personRedux = useAppSelector(getPerson);
  const { login } = userService;

  const [status, setStatus] = useState<'loading' | 'error' | 'redirect' | 'init'>('loading');
  const [menssageError, setMenssageError] = useState<string | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement | undefined>(undefined);

  const initialValues = { username: '', password: '' };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Requerido')
      .min(4, 'Debe contener un minimo de 4 caracteres')
      .max(255, '255 caracteres es el maximo'),
    password: Yup.string()
      .required('Requerido')
      .min(4, 'Debe contener un minimo de 4 caracteres')
      .max(255, '255 caracteres es el maximo'),
  });

  const onSubmitHandler = async ({ username, password }: { username: string; password: string }): Promise<void> => {
    setStatus('loading');
    const values = await login({ username, password });
    if (values.success) {
      setStatus('redirect');
      dispatch(setPerson(values.data));
    } else {
      setStatus('error');
      setMenssageError(values.data);
    }
  };

  useEffect(() => {
    setStatus('loading');
    personRedux.state.person.token !== '' && Router.push('/');
    inputRef.current && inputRef.current.focus();
    setStatus('init');
  }, [personRedux]);

  return (
    <>
      <div className="form_login">
        {status === 'loading' && (
          <div className="spiner-login">
            <Spinner>
              <strong className="message_info">Controlando las credenciales</strong>
            </Spinner>
          </div>
        )}
        {status === 'redirect' && (
          <div className="spiner-login">
            <Spinner>
              <strong className="message_info">Redireccionando</strong>
            </Spinner>
          </div>
        )}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
          <Form className="form_login">
            <div className="form-control">
              <label>Usuario</label>
              <Field id="username" type="text" innerRef={inputRef} className="input_login" name="username" />
              <span className="error">
                <ErrorMessage name="username">{(msg) => msg}</ErrorMessage>
              </span>
            </div>

            <div className="form-control">
              <label>Contraseña</label>
              <Field id="password" type="password" className="input_login" name="password" />
              <span className="error">
                <ErrorMessage name="password">{(msg) => msg}</ErrorMessage>
              </span>
            </div>

            {status === 'error' && (
              <div className="form-control">
                <strong className="error">{menssageError}</strong>
              </div>
            )}

            <div className="box">
              <div className="box_item">
                <Button>Iniciar Sesión</Button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>

      <style jsx>
        {`
          .form_login {
            @apply border-blue-400  p-8 border-t-4 border-b-4 bg-white mb-6 rounded-lg shadow-lg w-auto h-auto relative;
          }
          .spiner-login {
            @apply absolute top-0 left-0 w-full h-full flex  items-center justify-center bg-white bg-opacity-40;
            animation: fadeIn linear 7s;
            animation: fadeOut linear 7s;
          }

          .form-control {
            @apply mb-4;
          }

          label {
            @apply font-bold text-gray-800 block mb-2;
          }

          :global(input.input_login) {
            @apply block appearance-none w-full bg-white border border-gray-200 px-2 py-2 rounded;
            @apply hover:border-blue-400  focus:border-blue-400 focus:ring-blue-400  focus:outline-none focus:ring-2;
          }

          .error {
            @apply text-red-900 mt-1 text-xs h-4 w-full flex flex-1;
          }

          .box {
            @apply flex items-center justify-between;
          }

          .box_item {
            @apply m-2;
          }
        `}
      </style>
    </>
  );
};
