import * as actionTypes from '../constants/reduxActions';

const initalState = {
    user: {},
    tasks: [],
    lists: [],
    authUser: {},
    listSelected: 'All Tasks'
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER_DOC:
            return {
                ...state,
                user: action.payload.user
            }
        case actionTypes.DEL_USER_DOC:
            return {
                ...state,
                user: {}
            }
        case actionTypes.UPDATE_TASKS:
            return {
                ...state,
                tasks: action.payload.tasks
            }
        case actionTypes.DEL_TASKS:
            return {
                ...state,
                tasks: {}
            }
        case actionTypes.UPDATE_LISTS:
            return {
                ...state,
                lists: action.payload.lists
            }
        case actionTypes.DEL_LISTS:
            return {
                ...state,
                lists: {}
            }
        case actionTypes.UPDATE_AUTH_USER:
            return {
                ...state,
                authUser: action.payload.authUser
            }
        case actionTypes.DEL_AUTH_USER:
            return {
                ...state,
                authUser: {}
            }
        case actionTypes.UPDATE_SELECTED_LIST:
            return {
                ...state,
                listSelected: action.payload.listSelected
            }
        default:
            return state;
    }
};

export default reducer;