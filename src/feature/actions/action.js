import { SET_FACETS, SET_FILTERS, SET_RESULT, SET_SUMMARY, SET_LIMIT, SET_PAGE, SET_SEARCH_TEXT, SET_SORT, SET_RESULT_COUNT, SET_IMAGES, SET_DID_YOU_MEAN, SET_ERROR_MESSAGE, SET_SHOW_LOADER, resultUrl } from '../constants/constant';
import { queryBuilder } from '../dataServices/dataService';
import axios from 'axios';

export const setFacets = event => ({ type: SET_FACETS, payload: event });
export const setFiters = event => ({ type: SET_FILTERS, payload: event });
export const setResult = event => ({ type: SET_RESULT, payload: event });
export const setsummary = event => ({ type: SET_SUMMARY, payload: event });
export const setLimit = event => ({ type: SET_LIMIT, payload: event });
export const setPage = event => ({ type: SET_PAGE, payload: event });
export const setSeachText = event => ({ type: SET_SEARCH_TEXT, payload: event });
export const setSort = event => ({ type: SET_SORT, payload: event });
export const setResCount = event => ({ type: SET_RESULT_COUNT, payload: event });
export const setImages = event => ({ type: SET_IMAGES, payload: event });
export const setDidYouMean = event => ({ type: SET_DID_YOU_MEAN, payload: event });
export const setErrorMessage = event => ({ type: SET_ERROR_MESSAGE, payload: event });
export const setShowLoader = event => ({ type: SET_SHOW_LOADER, payload: event });

export function getResult(text, ref) {
    return function (dispatch) {
        dispatch(ref(text));
        dispatch(setShowLoader(true));
        let query = queryBuilder();
        return axios.get(`${resultUrl}?${query}`).then((json) => {
            dispatch(setShowLoader(false));
            let data = json.data;
            if (Number.isNaN(+data)) {
                dispatch(setResult(data));
            }
        }
        );
    };
}

