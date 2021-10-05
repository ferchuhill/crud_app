import { Button, ButtonLink } from '../buttons';
import Router from 'next/router';

import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';
import { PersonType } from '../../helper';
import { personService } from '../../services';
import { useEffect, useState } from 'react';
import { Spinner } from '../general';

import { useAppSelector } from '../../hook/useRedux';
import { getPerson } from '../../redux/';

export const PersonForm = ({
  data = undefined,
  edit = false,
  show = false,
}: {
  data?: PersonType;
  edit?: boolean;
  show?: boolean;
}): JSX.Element => {
  const personRedux = useAppSelector(getPerson);

  const id = data === undefined ? '' : data._id;
  const first_name = data === undefined ? '' : data.first_name;
  const last_name = data === undefined ? '' : data.last_name;
  const dni = data === undefined ? undefined : data.dni;
  const sex = data === undefined ? 'Female' : data.sex;

  const cell_phone = data === undefined ? '' : data.cell_phone;
  const status = data === undefined ? 'inactive' : data.status;
  const [statusComponent, setStatusComponent] = useState<'loading' | 'idle'>('loading');

  const initialValues: PersonType = {
    id,
    first_name,
    last_name,
    dni,
    sex,
    cell_phone,
    status,
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('Requerido')
      .min(3, 'Debe contener al menos 3 caracteres')
      .max(255, 'La cantidad maxima de caracteres es 255'),
    last_name: Yup.string()
      .required('Requerido')
      .min(3, 'Debe contener al menos 3 caracteres')
      .max(255, 'La cantidad maxima de caracteres es 255'),
    dni: Yup.number(),
    sex: Yup.string().required('Requerido'),
    cell_phone: Yup.string().matches(phoneRegExp, 'El número de Teléfono no es valido'),
    status: Yup.string().required('Requerido'),
  });

  const targetClose = '/';

  const onSubmitPostHandler = async (values: any) => {
    setStatusComponent('loading');
    await personService.savePerson({ ...values, token: personRedux.state.person.token });
    setStatusComponent('idle');
    Router.push('/');
  };

  const onSubmitPatchHandler = async (values: any) => {
    setStatusComponent('loading');
    await personService.updatePerson({ ...values, token: personRedux.state.person.token });
    setStatusComponent('idle');
    Router.push('/');
  };

  useEffect(() => {
    if (edit) {
      data !== undefined && setStatusComponent('idle');
    } else {
      data === undefined && setStatusComponent('idle');
    }
  }, [data, edit]);

  return (
    <>
      <div className="form_container">
        {statusComponent === 'loading' ? (
          <div className="spiner-login">
            <Spinner />
          </div>
        ) : (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={edit === false ? onSubmitPostHandler : onSubmitPatchHandler}
          >
            <Form>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6 w-full">
                  <div className="from_group_doble">
                    <div className="from_group_doble_item">
                      <label>Nombre</label>
                      <Field id="first_name" name="first_name" />
                      <span className="error">
                        <ErrorMessage name="first_name">{(msg) => msg}</ErrorMessage>
                      </span>
                    </div>

                    <div className="from_group_doble_item">
                      <label>Apellido</label>
                      <Field id="last_name" name="last_name" />
                      <span className="error">
                        <ErrorMessage name="last_name">{(msg) => msg}</ErrorMessage>
                      </span>
                    </div>
                  </div>
                  <div className="from_group_doble">
                    <div className="from_group_doble_item">
                      <label>Sexo</label>
                      <Field id="sex" name="sex" as="select">
                        <option value="Female">Femenino</option>
                        <option value="Male">Masculino</option>
                      </Field>
                      <span className="error">
                        <ErrorMessage name="sex">{(msg) => msg}</ErrorMessage>
                      </span>
                    </div>
                    <div className="from_group_doble_item">
                      <label>Documento Identidad</label>
                      <Field type="number" id="dni" name="dni" />
                      <span className="error">
                        <ErrorMessage name="dni">{(msg) => msg}</ErrorMessage>
                      </span>
                    </div>
                  </div>

                  <div className="from_group_doble">
                    <div className="from_group_doble_item">
                      <label>Celular</label>
                      <Field type="number" id="cell_phone" name="cell_phone" />
                      <span className="error">
                        <ErrorMessage name="cell_phone">{(msg) => msg}</ErrorMessage>
                      </span>
                    </div>

                    <div className="from_group_doble_item">
                      <label>Estado</label>
                      <Field id="status" name="status" as="select">
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="pending">Pendiente</option>
                      </Field>
                      <span className="error">
                        <ErrorMessage name="status">{(msg) => msg}</ErrorMessage>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="action_gruop">
                  <div className="action">
                    <ButtonLink target={targetClose}>Volver</ButtonLink>
                  </div>
                  {!show && (
                    <div className="action">
                      <Button>Guardar</Button>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          </Formik>
        )}
      </div>
      <style jsx>
        {`
          .form_container {
            @apply relative;
          }
          .wrap {
            @apply flex;
          }
          .from_group {
            @apply w-full;
          }
          .from_group_doble {
            @apply flex w-full;
          }

          .from_group_doble_item {
            @apply w-full md:w-6/12 pr-2;
          }

          label {
            @apply block text-sm font-medium text-gray-700;
          }
          :global(input),
          :global(select) {
            @apply border border-opacity-100 border-gray-300 rounded-md;
            @apply mt-1 p-2 block w-full shadow-sm text-sm;
            @apply focus:ring-indigo-500 focus:border-indigo-500;
          }
          .error {
            @apply text-xs text-red-800 pl-3 h-1;
          }

          .action_gruop {
            @apply px-4 py-3 bg-gray-50 text-right sm:px-6 flex w-full flex-row justify-evenly;
          }
          .action {
            @apply w-1/3 flex flex-row justify-center items-center;
          }
        `}
      </style>
    </>
  );
};
