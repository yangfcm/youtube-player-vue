const parseError = (error, defaultErrorMessage = "") => {
  if (!error) {
    return null;
  }
  if (error.response && error.response.data) {
    return {
      code: error.response.data.error.code,
      message: error.response.data.error.message,
    };
  } else if (error.message) {
    return {
      message: error.message,
    };
  } else {
    return {
      message: defaultErrorMessage,
    };
  }
};

export default parseError;
