export const isEmpty = (value) => {
  return value.trim() === "";
};

export const isEmail = (value) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value.trim());
};

export const isPassword = (value) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return passwordRegex.test(value);
};

export const isPasswordLength = (value) => {
  if (value.length >= 8) {
    return true;
  }
  return false;
};

export const isName = (value) => {
  if (value.length >= 2) {
    return true;
  }
  return false;
};

export const isValidComparedPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return true;
  }
  return false;
};

export const isValidPhoneNumber = (phoneNumber) => {
  if (phoneNumber.length >= 10) {
    for (i = 0; i < phoneNumber.length; i++) {
      if (isNaN(phoneNumber[i])) {
        return false;
      }
    }
    return false;
  } else {
    return true;
  }
};


