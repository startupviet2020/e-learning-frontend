import { UserAction } from '../consts/action';
import Auth from '../utils/auth';

const INITIAL_STATE = {
  loggedIn: Auth.isAuth(),
  user: {
    uid: "",
    name: "",
    avatar: null,
    status: -1,
    company: 0,
    companies: []
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserAction.LOGOUT:
    case UserAction.VERIFY_AUTH_FAILURE: {
      Auth.logout();
      return {
        ...state,
        loggedIn: false,
        user: INITIAL_STATE.user,
      };
    }
    case UserAction.ACCOUNTKIT_AUTH_SUCCESS:
    case UserAction.VERIFY_AUTH_SUCCESS: {
      const user = action.payload;
      if (user.auth){
        Auth.setAuth(user.auth);
      }
      return {
        ...state,
        user: {
          name: user.name,
          uid: user.uid,
          avatar: user.avatar,
          status: user.status,
          company: user.company,
          companies: user.companies
        }
      }
    }
    default:
      break;
  }
  return state;
};