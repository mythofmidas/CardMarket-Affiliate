const FormikErr = ({ touched, errors }) => {
  return (
    <>
      <small className="text-sm text-red-500">{touched && errors}</small>
    </>
  );
};

export default FormikErr;
