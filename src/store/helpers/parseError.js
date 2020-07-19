/** Parse the error object and return error message to display */
const parseError = (error, defaultErrorMessage = "") => {
  if (!error) {
    return "";
  }
  if (error.response && error.response.data) {
    return error.response.data.error
      ? error.response.data.error.message
      : error.response.data;
  } else if (error.message) {
    return error.message;
  } else {
    return defaultErrorMessage;
  }
};

export default parseError;
