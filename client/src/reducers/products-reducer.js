const parsePrice = require('parse-price');
const initialState = {
  products: {},
  status: 'loading',
  error: null,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ALL_PRODUCTS': {
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    }

    case 'RECEIVE_ALL_PRODUCTS': {
      return {
        ...state,
        products: action.products,
        status: 'idle',
        error: null,
      };
    }

    case 'RECEIVE_PRODUCTS_ERROR': {
      return {
        ...state,
        status: 'error',
        error: action.data.message,
      };
    }

    case 'GET_PRODUCTS_BY_CATEGORY': {
      return {
        ...state,
        products: action.products.filter(
          (product) =>
            product.category.toLowerCase() === action.categoryName.toLowerCase()
        ),
      };
    }

    case 'GET_PRODUCTS_BY_BRAND': {
      return {
        ...state,
        products: action.products.filter(
          (product) => product.companyId === action.brandId
        ),
      };
    }

    case 'GET_PRODUCTS_DESC': {
      return {
        ...state,
        products: action.products.sort(
          (a, b) => parsePrice(b.price) - parsePrice(a.price)
        ),
      };
    }
    case 'GET_PRODUCTS_ASC': {
      return {
        ...state,
        products: action.products.sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price)
        ),
      };
    }
    
    default: {
      return state;
    }
  }
}

export const getProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
