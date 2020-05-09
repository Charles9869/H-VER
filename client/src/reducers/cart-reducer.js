const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      return {
        ...state,
        [action.product.id]: {
          ...action.product,
          quantity:
            state[action.product.id] && state[action.product.quantity]
              ? state[action.product.quantity] + 1
              : 1,
        },
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, newQuantity } = action;
      return {
        ...state,
        [productId]: {
          ...state[productId],
          quantity: newQuantity,
        },
      };
    }

    case 'UPDATE_ITEM_ALREADY_IN_CART_QUANTITY': {
      const { productId, quantity } = action;
      return {
        ...state,
        [productId]: {
          ...state[productId],
          quantity: quantity + 1,
        },
      };
    }

    case 'REMOVE_PRODUCT': {
      const newCart = { ...state };
      delete newCart[action.productId];
      return newCart;
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    default:
      return state;
  }
}
