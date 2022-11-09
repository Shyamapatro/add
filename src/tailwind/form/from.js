import {
  Formik,
  Form
} from "formik";

import * as yup from "yup";

const form = ({ children, ...rest }) => {
  const schema = yup.object({
    // email: yup.string().required("This field is required").email("Enter a valid email"),
    // password: yup.string().required("This field is required"),
    // fullname: yup.string().required("This field is required"),
    // mobile: yup.string().required("This field is required")
  });

  const defaultValues = {
    email: '',
    password: ''
  }

  const design = (
    <>
      <Formik
        initialValues={defaultValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          
        }}
        {...rest}
      >
        {
          (formik) => {
            return (
              <Form>
                {children}
              </Form>
            );
          }
        }
      </Formik>
    </>
  );
  return design;
}

export default form;