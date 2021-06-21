import api from "../../../utils/Api";
import {
  USER_LOGIN,
  USER_REGISTER,
  FORGOT_PASSWORD,
  VERIFY_USER,
} from "./ActionType";

// export const loginUser = (params) => ({
//   type: USER_LOGIN,
//   payload: api
//     .post("auth/login", params)
//     .then((res) => {
//       console.warn("i am in login api res", JSON.stringify(res));
//       console.warn("i am in login api res ststus", JSON.stringify(res.status));
//       return res;
//     })
//     .catch((err) => {
//       console.warn("i'm in catch error login", JSON.stringify(err));
//       return err;
//     }),
// });

// export const registerUser = (params) => ({
//   type: USER_REGISTER,
//   payload: api
//     .post("register", params)
//     .then((res) => {
//       console.warn("i am i register api res", res);
//       console.warn("i am i register api res.status", res.status);
//       return res;
//     })
//     .catch((err) => {
//       console.warn("i'm in catch error register", JSON.stringify(err));
//       return err;
//     }),
// });

// export const userForgotPassword = (params) => ({
//   type: FORGOT_PASSWORD,
//   payload: api
//     .post("forgot-password", params)
//     .then((res) => {
//       console.warn("i am in forgot password api res", JSON.stringify(res));
//       console.warn(
//         "i am in forgot password api res ststus",
//         JSON.stringify(res.status)
//       );
//       return res;
//     })
//     .catch((err) => {
//       console.warn("i'm in catch error forgot password", JSON.stringify(err));
//       return err;
//     }),
// });

// export const verifyRegisterUser = (params) => ({
//   type: VERIFY_USER,
//   payload: api
//     .post("verify2FA", params)
//     .then((res) => {
//       console.warn("i am in verify2FA api res", JSON.stringify(res.data));
//       console.warn(
//         "i am in verify2FA api res ststus",
//         JSON.stringify(res.status)
//       );
//       return res;
//     })
//     .catch((err) => {
//       console.warn("i'm in catch error verify2FA", JSON.stringify(err));
//       return err;
//     }),
// });
