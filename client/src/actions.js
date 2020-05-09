// products reducers
export const requestAllProducts = () => ({
  type: 'REQUEST_ALL_PRODUCTS',
});

export const receiveAllProducts = (data) => ({
  type: 'RECEIVE_ALL_PRODUCTS',
  products: data,
});

export const receiveProductsError = (data) => ({
  type: 'RECEIVE_PRODUCTS_ERROR',
  data,
});

//companies reducers
export const requestAllCompanies = () => ({
  type: 'REQUEST_ALL_COMPANIES',
});

export const receiveAllCompanies = (data) => ({
  type: 'RECEIVE_ALL_COMPANIES',
  companies: data,
});

export const receiveCompaniesError = () => ({
  type: 'RECEIVE_COMPANIES_ERROR',
});

// cart reducers
export const addProduct = (product) => ({
  type: 'ADD_PRODUCT',
  product,
});

export const updateQuantity = (productId, newQuantity) => ({
  type: 'UPDATE_QUANTITY',
  productId,
  newQuantity,
});

export const updateQuantityAlreadyInCart = (productId, quantity) => ({
  type: 'UPDATE_ITEM_ALREADY_IN_CART_QUANTITY',
  productId,
  quantity,
});

export const removeProduct = (productId) => ({
  type: 'REMOVE_PRODUCT',
  productId,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const getProductsByBrand = (products, brandId) => ({
  type: 'GET_PRODUCTS_BY_BRAND',
  products,
  brandId,
});

export const getProductsByCategory = (products, categoryName) => ({
  type: 'GET_PRODUCTS_BY_CATEGORY',
  products,
  categoryName,
});

export const GetProductsDesc = (products) => ({
  type: 'GET_PRODUCTS_DESC',
  products,
});

export const GetProductsAsc = (products) => ({
  type: 'GET_PRODUCTS_ASC',
  products,
});

// Page reducers
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });
export const clearPage = () => ({ type: 'CLEAR_PAGE' });
