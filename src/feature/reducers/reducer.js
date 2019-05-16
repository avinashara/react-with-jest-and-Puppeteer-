import { ERMSG, SET_FACETS, SET_FILTERS, SET_RESULT, SET_LIMIT, SET_PAGE, SET_SEARCH_TEXT, SET_SORT, SET_RESULT_COUNT, SET_SHOW_LOADER, I18NDATA } from '../constants/constant';
let lsData = JSON.parse(sessionStorage.getItem('searchStore')),
    searchPageNo = Number(sessionStorage.getItem('searchPageNo')),
    rootElemRef = document.getElementById('jp-search-root'),
    domErrorMessage = null,
    authorMode = "",
    authorKeyValue = "",
    i18N = {};
if (rootElemRef) {
    authorMode = "search_results";//rootElemRef.getAttribute('data-authorMode');
    authorKeyValue = rootElemRef.getAttribute('data-keyWordValue');
    domErrorMessage = ERMSG;// JSON.parse(rootElemRef.getAttribute("data-errormessage"));
    i18N = I18NDATA;
    // i18N = rootElemRef.getAttribute('data-i18njson') ? JSON.parse(rootElemRef.getAttribute('data-i18njson')) : {};
}
/**Error Message Construction start */
let errorMessage = {
    h1: domErrorMessage ? domErrorMessage.h1 : "",
    h2: domErrorMessage ? domErrorMessage.h2 : "",
    data: []
};
for (let key in domErrorMessage) {
    if (key.indexOf("bullet") >= 0) {
        errorMessage.data.push(domErrorMessage[key].replace(/&#39;/g, "'"));
    }
}
/**Error Meessage Contructions end */

const initialState = {
    facets: [],
    summary: {},
    filters: lsData ? lsData.filters : [],
    results: null,
    pageNo: searchPageNo ? searchPageNo : 1,
    limit: lsData ? lsData.limit : (window.innerWidth < 1024 ? '-1' : 20),
    searchText: null,
    sort: lsData ? lsData.sort : 'rel',
    isMobile: window.innerWidth < 1024,
    isTablet: false,//window.innerWidth>767 && window.innerWidth<1024,
    resultCount: lsData ? lsData.resultCount : 0,
    images: {},
    didYouMean: null,
    errorMsg: errorMessage,
    authorMode: authorMode,
    authorKeyValue: authorKeyValue,
    i18N: i18N,
    showLoader: false
}
const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_FACETS:
            return { ...state, facets: payload };
        case SET_FILTERS:
            return { ...state, filters: payload, pageNo: 1, showCount: 1 };
        case SET_RESULT: {
            let result =payload.results;
            return {
                ...state,
                results: result,
                resultCount: result.length >= 2 ? 2 : result.length,
                showCount: 1,
                facets: payload.facets,
                summary: payload.resultsSummary,
                images: payload.defaultImages,
                didYouMean: payload.did_you_mean
            };
        }
        case SET_LIMIT:
            return { ...state, limit: payload, pageNo: 1, showCount: 1 };
        case SET_PAGE:
            return { ...state, pageNo: payload };
        case SET_SEARCH_TEXT:
            return { ...state, searchText: payload, pageNo: searchPageNo ? searchPageNo : 1, showCount: 1 };
        case SET_SORT:
            return { ...state, sort: payload, pageNo: 1, showCount: 1 };
        case SET_RESULT_COUNT:
            return { ...state, resultCount: payload };
        case SET_SHOW_LOADER:
            return { ...state, showLoader: payload };
        default:
            return state;
    }
};
export default rootReducer;