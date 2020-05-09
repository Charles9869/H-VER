const initialState = 1;

export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return state + 1;
    }

    case 'DECREMENT': {
      return state - 1;
    }

    case 'CLEAR_PAGE': {
      let newState = state;
      newState = 1;
      return newState;
    }

    default: {
      return state;
    }
  }
}
