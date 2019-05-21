import { AppAction } from "consts/action";

export const INITIAL_STATE = {
  loading: false,
  message: {
    content: "",
    type: "warning"
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppAction.APP_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AppAction.APP_MESSAGE:
      return {
        ...state,
        message: {
          content: action.payload.content,
          type: action.payload.type
        }
      }
    default:
      break;
  }
  return state;
};

