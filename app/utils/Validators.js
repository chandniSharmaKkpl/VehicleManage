export const isEmpty = (value) => {
  return value.trim() === "";
};

export const isEmail = (value) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value.trim());
};

export const isPassword = (value) => {
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;  // don't allow special char
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;      // allow special char's
  return passwordRegex.test(value);
};

export const isPasswordLength = (value) => {
  if (value.length >= 8) {
    return true;
  }
  return false;
};

// min 2 char
export const isName = (value) => {
  if (value.length >= 2) {
    return true;
  }
  return false;
};

// min 3 char
export const isText = (value) => {
  if (value.length >= 3) {
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

export const checkfirstWhiteSpace = (char) => {
  let regex = /^[^\s]+(\s+[^\s]+)*$ /;
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (!regex.test(char) || !format.test(char)) {
    // Alert.alert(globals.appName, message)
    return true;
  }
  return false;
};

/**
 * Regular Expression Method for TextInput allSpecialCharacter
 */
export const allSpecialCharacter = (txtInput) => {
  const regex = /[`~,.<>;':"\/\[\]\|{}()=_+-]/;

  if (!regex.test(txtInput)) {
    return true;
  }
  // Alert.alert(globals.appName, emptyMessage);
  return false;
};

export const onlycharandnum = (value) => {
  // let regex = /^[^!-\\/:-@\\[-`{-~]+$/;
  let regex = /[ ` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!regex.test(value)) {
    return true;
  }
  return false;
};
