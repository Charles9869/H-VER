const initialState = {
  companies: [],
  status: 'loading',
  error: null,
};

export default function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ALL_COMPANIES': {
      return {
        ...state,
        status: 'loading',
      };
    }

    case 'RECEIVE_ALL_COMPANIES': {
      return {
        ...state,
        companies: action.companies,
        status: 'idle',
      };
    }

    case 'RECEIVE_COMPANIES_ERROR': {
      return {
        ...state,
        status: 'error',
      };
    }
    default: {
      return state;
    }
  }
}

export const getCompanies = (state) => state.companies.companies;
export const getCompaniesStatus = (state) => state.companies.status;
