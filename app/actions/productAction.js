import {SET_PRODUCT_LIST, SET_PRODUCT_DATA, SET_LOADER, DELETE_PRODUCT_DATA, UPDATE_PRODUCT_DATA, SET_LOGIN_DATA,SET_CATEGORY_LIST,SET_SUB_CATEGORY_LIST} from "./types";
import ApiConstant from '../helper/apiConstant';


export const getCatrgory = () => {
    return (dispatch, getState) => {

        return fetch(ApiConstant.baseUrl+ApiConstant.category)
            .then((response) => response.json())
            .then((responseJson) => {

                dispatch({
                    type: SET_CATEGORY_LIST,
                    payload: responseJson.result
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};
export const getSubCatrgory = (id) => {
    return (dispatch, getState) => {
       debugger
        return fetch(ApiConstant.baseUrl+ApiConstant.subcatgory+(id))
            .then((response) => response.json())
            .then((responseJson) => {

                dispatch({
                    type: SET_SUB_CATEGORY_LIST,
                    payload: responseJson
                });
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                alert(error);
            });
    };
};
export const getProduct = () => {
    return (dispatch, getState) => {

        return fetch(ApiConstant.baseUrl+ApiConstant.product)
            .then((response) => response.json())
            .then((responseJson) => {

                dispatch({
                    type: SET_PRODUCT_DATA,
                    payload: responseJson.result
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};
export const productAdd = (formdata) => {
    debugger
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.product,
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type' : 'multipart/form-data',
                },
                body:formdata
            }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: SET_PRODUCT_DATA,
                    payload: responseJson.result
                });
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                dispatch({
                    type: SET_LOADER,
                    payload: false
                });
                return Promise.reject(error);
            });
    };
};



export const productdelete = (id) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});

        debugger;
        return fetch(ApiConstant.baseUrl+ApiConstant.product+(id),
            {
                method : 'DELETE',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((responseJson) => {

                dispatch({
                    type: PRODUCT_SIGNIN,
                    payload: responseJson.result
                });
                return Promise.resolve(responseJson);
            }).catch((error) => {
                return Promise.reject(error);
            });
    };
};


export const productUpdate = (productData,id) => {
    debugger
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.product+(id),
            {
                method : 'PATCH',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: UPDATE_PRODUCT_DATA,
                    payload: responseJson.result
                });
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                dispatch({
                    type: SET_LOADER,
                    payload: false
                });
                return Promise.reject(error);
            });
    };
};

