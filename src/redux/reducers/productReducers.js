import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../action-types/productActionTypes";

const initialState = {
  productData: [],
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, productData: action.payload.data };
    case ADD_PRODUCT:
      return {
        ...state,
        productData: [...state.productData, action.payload.data],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productData: state.productData.filter(
          (product) => product.id !== action.payload
        ),
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        productData: state.productData.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                ...action.payload.updatedData,
              }
            : product
        ),
      };

    default:
      return state;
  }
};
