import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_SELECTED_PRODUCT,
  UPDATE_PRODUCT,
} from "../action-types/productActionTypes";

export const fetchAllProducts = (data) => {
  return {
    type: FETCH_PRODUCTS,
    payload: { data },
  };
};

export const getSelectedProduct = (data) => {
  return {
    type: FETCH_SELECTED_PRODUCT,
    payload: { data },
  };
};

export const addProduct = (data) => {
  return {
    type: ADD_PRODUCT,
    payload: { data },
  };
};

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};

export const updateProduct = (id, updatedData) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { id, updatedData },
  };
};
