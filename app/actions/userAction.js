import {SET_USER_LIST, SET_USER_DATA, SET_LOADER, DELETE_USER_DATA, UPDATE_USER_DATA, SET_LOGIN_DATA} from "./types";
import ApiConstant from '../helper/apiConstant';

// export const userLogin = (userData) => {
//     debugger
//     return (dispatch, getState) => {
//         dispatch({type: SET_LOADER,payload: true});
//         return fetch(ApiConstant.baseUrl+ApiConstant.login,
//             {
//                 method : 'POST',
//                 headers : {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(userData)
//             }).then((response) => response.json())
//             .then((responseJson) => {
//                 dispatch({type: SET_LOADER,payload: false});
//                 dispatch({
//                     type: USER_SIGNIN,
//                     payload: responseJson.result
//                 });
//                 return Promise.resolve(responseJson);
//             })
//             .catch((error) => {
//                 dispatch({
//                     type: SET_LOADER,
//                     payload: false
//                 });
//                 return Promise.reject(error);
//             });
//     };
// };
export const userLogin = (loginData) => {
    return (dispatch, getState) => {
        return fetch(ApiConstant.baseUrl+ApiConstant.login,
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: SET_LOGIN_DATA,
                    payload: responseJson.data
                });
                debugger;
                return Promise.resolve(responseJson);
            })
            .catch((error) => {
                return Promise.reject(false);
            });
    };
};



export const getUser = () => {
    return (dispatch, getState) => {
        debugger;
        return fetch(ApiConstant.baseUrl+ApiConstant.user)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: SET_USER_LIST,
                    payload: responseJson.result
                });
                return Promise.resolve(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
};

export const userRegistration = (userData) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.user,
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: SET_USER_DATA,
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
//delete https://github.com/rushiradadiya/nodewithreact
export const userdelete = (id) => {
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});

        debugger;
        return fetch(ApiConstant.baseUrl+ApiConstant.user+(id),
            {
                method : 'DELETE',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((responseJson) => {

                dispatch({
                    type: USER_SIGNIN,
                    payload: responseJson.result
                });
                return Promise.resolve(responseJson);
            }).catch((error) => {
                return Promise.reject(error);
            });
    };
};


export const userUpdate = (userData,id) => {
    debugger
    return (dispatch, getState) => {
        dispatch({type: SET_LOADER,payload: true});
        return fetch(ApiConstant.baseUrl+ApiConstant.user+(id),
            {
                method : 'PATCH',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({type: SET_LOADER,payload: false});
                dispatch({
                    type: UPDATE_USER_DATA,
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

