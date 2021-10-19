// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_EXPENSES,
  RECEIVE_CURRENCY,
  FAILED_REQUEST,
} from '../actions/index';

const initialState = {
  currencies: [],
  expenses: [],
  error: '',
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_EXPENSES:
    return { ...state, expenses: action.payload };
  case RECEIVE_CURRENCY:
    return { ...state, currencies: action.currency };
  case FAILED_REQUEST:
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export default wallet;
