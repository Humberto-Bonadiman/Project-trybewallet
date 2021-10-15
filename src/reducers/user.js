// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_LOGIN_DATA } from '../actions/index';

const initialState = {
  email: '',
  password: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_LOGIN_DATA:
    return { ...state, state: action.payload };
  default:
    return state;
  }
};

export default userReducer;
