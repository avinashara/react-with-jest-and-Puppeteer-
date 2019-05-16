
import { MONTHS_NAME_SORT } from '../constants/constant';
import store from '../stores/store';
export function queryBuilder() {
    let props = store.getState(),
        text = '',
        obj = props.filters.groupBy('name'),
        searchTerm = props.searchText; //props.searchText.replace(/&/g, '_AND_');
    for (const key of Object.keys(obj)) {
        text += `${key}=`;
        obj[key].forEach(rec => {
            text += `${rec.filterName.name},`;
        });
        text = text.slice(0, -1);
        text += '&';
    }
    let localStoreData = {
        "filters": props.filters,
        "limit": props.limit,
        "sort": props.sort,
        "resultCount": props.resultCount
    };
    sessionStorage.setItem('searchStore', JSON.stringify(localStoreData));
    sessionStorage.setItem('searchKeyword', props.searchText);
    sessionStorage.setItem('searchPageNo', props.pageNo);
    if (props.authorMode && props.authorMode === 'associated_content') {
        searchTerm = props.authorKeyValue;
    } else if (props.authorMode && props.authorMode === 'library') {
        searchTerm = "library";
    }
    searchTerm = encodeURIComponent(searchTerm);

    /*
    Setting up the value of region, country, language & role.
    */
    let cookiesData = window.getCookiesDataForSearch();
    let region = cookiesData.region;
    let country = cookiesData.country;
    let language = cookiesData.language;
    let role = cookiesData.role;

    text += `mode=${props.authorMode}&pageno=${props.pageNo}&limit=${props.limit}&searchKeyword=${searchTerm}&sort=${props.sort}&region=${region}&country=${country}&language=${language}&role=${role}&page_url=${window.location.origin + window.location.pathname}`;
    //return encodeURIComponent(text);
    return text;
}
Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        var val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
};

export function getImgUrl(data) {
    let images = store.getState().images,
        type = data.format,
        finalurl = '';
    if (data.thumbnailUrl) {
        finalurl = data.thumbnailUrl;
    } else {
        if (type === 'video') {
            finalurl = images["video"];
        } else if (type === 'audio') {
            finalurl = images["audio"];
        } else if (type === 'event') {
            finalurl = images["event"];
        } else if (type === 'document') {
            finalurl = images["documents"];
        } else {
            finalurl = images["webpage"];
        }
    }
    return finalurl;
}
export function getDate(data) {
    let date = new Date(data);
    return `${date.getDate()} ${MONTHS_NAME_SORT[date.getMonth()]} ${date.getFullYear()}`;
    // let locale=navigator.language,
    //     month=new Intl.DateTimeFormat(locale,{month:"short"}).format(date),
    //     day=new Intl.DateTimeFormat(locale,{day:"numeric"}).format(date),
    //     year=new Intl.DateTimeFormat(locale,{year:"numeric"}).format(date);
    // return `${day} ${month} ${year}`;
}


