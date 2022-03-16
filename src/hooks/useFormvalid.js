const useFormValid = () => {
  const checkFieldLength = (field, length) => {
    return field.length >= length;
  };

  const matchField = (field1, field2) => {
    return field1 === field2;
  };

  const blankCheck = (field) => {
    return field.length === 0;
  };

  const emailValid = (field, input) => {
    if (field !== "email") {
      return undefined;
    }
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
  };

  return {
    checkFieldLength,
    matchField,
    blankCheck,
    emailValid,
  };
};

export default useFormValid;
