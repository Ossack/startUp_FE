import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
//import { RESP } from "../../response";
//import { setCookie, deleteCookie } from "../../shared/cookie";

// actions
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// actionCreators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => {});

// middleWares
const signUpApi = (user) => {
  console.log("user : ", user);
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axios.post("http://54.180.102.156/user/signup", {
        userEmail: user.userEmail,
        nickname: user.nickname,
        password: user.password,
      });
      //const response = RESP.USERSIGNUPPOST;
      console.log("response : ", response);

      if (response.status === 200) {
        //   if (response.data === "회원가입에 성공하였습니다") {
        alert(`${user.nickname}님 ${response.data.message}`);
        history.replace("/");
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요!!");
      }
    } catch (err) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요~");
      console.log("에러발생", err);
    }
  };
};

const loginApi = (userEmail, password) => {
  console.log("userEmail : ", userEmail);
  console.log("password : ", password);
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axios.post("http://54.180.102.156/user/login", {
        userEmail: userEmail,
        password: password,
      });
      //const response = RESP.USERLOGINPOST;
      console.log("response : ", response);

      if (response.status === 200) {
        alert(`로그인 성공`);
        history.replace("/main");

        const token = response.headers.authorization.split("BEARER ");
        localStorage.setItem("token", token[1]);

        dispatch(
          setUser({
            nickname: "",
            userEmail: userEmail,
          })
        );
      } else {
        alert("이메일과 패스워드를 다시 확인해주세요.");
      }
    } catch (err) {
      window.alert("이메일과 패스워드를 다시 확인해주세요.");
      console.log("에러발생", err);
    }
  };
};

const loginCheckApi = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const check = await axios.post(
        "http://54.180.96.119/api/login",
        {},
        {
          headers: {
            Authorization: `BEARER ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(
        setUser({
          nickname: check.data.nickname,
          username: check.data.username,
          userId: check.data.userId,
        })
      );
    } catch (err) {
      console.log("에러발생", err);
      alert("로그인 여부 확인에 문제가 생겼습니다.");
    }
  };
};

const logOutApi = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("token");
    history.replace("/");
    dispatch(logOut());
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // setCookie("is_login", "success");
        draft.is_login = true;
        draft.user = action.payload.user;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        //deleteCookie("is_login");
        draft.is_login = false;
        draft.user = null;
      }),
  },
  initialState
);

const actionCreators = {
  signUpApi,
  loginApi,
  loginCheckApi,
  logOutApi,
};

export { actionCreators };
