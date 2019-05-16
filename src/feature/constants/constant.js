export const SET_FACETS = 'SET_FACETS';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_RESULT = 'SET_RESULT';
export const SET_SUMMARY = 'SET_SUMMARY';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_PAGE = 'SET_PAGE';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SET_SORT = "SET_SORT";
export const SET_RESULT_COUNT = "SET_RESULT_COUNT";
export const SET_IMAGES = "SET_IMAGES";
export const SET_DID_YOU_MEAN = "DID_YOU_MEANS";
export const MONTHS_NAME_SORT = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
export const SET_ERROR_MESSAGE = "ERROR_MESSAGE";
export const SERVICE_DELAY = 500;
export const SET_SHOW_LOADER = "SET_SHOW_LOADER";

export const ERMSG = {
    "h1": "Sorry, there are no results for your search query, please try another search",
    "h2": "Here are some tips to help you find what you are seeking",
    "bullet1": "Double check your spelling",
    "bullet2": "Enter related words",
    "bullet3": "Enter broader search terms",
    "bullet4": "Enter fewer terms and remove common words such as &#39;the&#39;, &#39;and&#39; and &#39;or&#39;."
}

export const I18NDATA = {
    "jpm.am.general.search.addtofav": "Add To Favorite",
    "jpm.am.general.search.clearfilters": "Clear Filters",
    "jpm.am.general.search.newest": "Newest",
    "jpm.am.general.search.of": "of",
    "jpm.am.general.search.download": "Download",
    "jpm.am.general.search.results": "Results",
    "jpm.am.general.search.pagelimit": "20 Results Per Page",
    "jpm.am.general.search.maxpagelimit": "100 Results Per Page",
    "jpm.am.general.search.emailthis": "Email This",
    "jpm.am.general.search.didyoumean": "Did you mean:",
    "jpm.am.general.search.all": "All",
    "jpm.am.general.search.filterresults": "Filter Results",
    "jpm.am.general.search.sortresults": "Sort Results",
    "jpm.am.general.search.relevance": "Relevance",
    "jpm.am.general.search.refinedby": "Refine By:",
    "jpm.am.general.search.loadmore": "Load More",
    "jpm.am.general.search.sortby": "Sort By:",
    "jpm.am.general.search.searchinput": "Search Input",
    "jpm.am.general.search.oldest": "Oldest",
    "jpm.am.general.search.close": "Close",
    "jpm.am.general.search.allresult": "All Results Per Page",
    "jpm.am.general.search.searchtext": "Search",
    "jpm.am.general.search.resultsfor": "Results for",
    "jpm.am.general.search.addto": "Add To…"
}
window.getCookiesDataForSearch = () => {
    return {
        region: "any",
        country: "any",
        language: "any",
        role: "any"
    }
}
export let resultUrl = 'http://www.mocky.io/v2/5cdd1584300000da25e234a9';
export let sugUrl = '../../../resources/suggestion.json';




