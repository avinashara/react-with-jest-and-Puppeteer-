import React, { Component } from "react";
import { connect } from "react-redux";
import { setPage, setLimit, setSort, getResult, setResCount } from '../feature/actions/action';
import { getImgUrl } from '../feature/dataServices/dataService';
import { mobile, desktop } from '../feature/constants/featureItemMobile';

class Result extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      sortDropDown: 'all'
    };
  }
  handleLimitChange = e => {
    this.props.getResult(e.target.value, this.props.onSetLimit);
  }
  handleSort = type => {

    this.props.getResult(type, this.props.onSetSort);
  }
  handleSortDropDown = event => {
    let value = event.target.value;
    this.setState({ sortDropDown: value });
    this.handleSort(value);
  }
  createPagination = () => {
    let pages = [],
      summary = this.props.summary,
      activePage = this.props.pageNo,
      end = Math.ceil(summary.total / summary.limit);
    let start = (activePage - 5) >= 0 ? activePage - 4 : 1,
      finish = (start + 9);
    start = (end - start) < 10 ? start - (9 - (end - start)) > 0 ? start - (9 - (end - start)) : 1 : start;
    finish = finish > end ? end : finish;
    for (let i = start; i <= finish; i++) {
      pages.push(
        <section role="button" tabIndex="0" aria-label={"Page no" + i} key={i} className={i === activePage ? "search-pagination_yes" : "search-pagination_no"}
          onClick={this.handlePageChanges} onKeyUp={(event) => this.handleKeyUp(event, i)}>
          {i}
        </section>
      );
    }
    return pages;
  }
  handleKeyUp = (event, data) => {
    if (event.keyCode === 13) {
      if (data === "pre") {
        this.handlePrevious(true);
      } else if (data === "next") {
        this.handlePrevious(false);
      } else {
        this.handlePageChanges({ target: { innerText: data } });
      }
    }
  }
  handlePageChanges = page => {
    document.getElementById('jp-search-root').scrollIntoView();
    this.props.getResult(Number(page["target"].innerText), this.props.onSetPage);
  }
  handlePrevious = pre => {
    let newActive = pre ? this.props.pageNo - 1 : this.props.pageNo + 1;
    this.props.getResult(newActive, this.props.onSetPage);
  }
  handleLoadMore = () => {
    let count = (this.props.resultCount / 2) + 1;
    this.props.onSetResCount(count * 2);
  }
  handleDidYouMean = (value) => {
    let event = new CustomEvent('populateSearch', { 'detail': value });
    document.dispatchEvent(event);
  }
  render = () => {
    let props = this.props,
      data = props.results,
      summary = props.summary,
      start = ((props.pageNo - 1) * summary.limit) + 1,
      end = (start - 1) + data.length,
      renderHtml = null,
      sugValue = props.didYouMean;
    if (props.isMobile) {
      let tempData = data.slice(0, props.resultCount),
        showLoadMoreValue = (props.resultCount < data.length) ? true : false;
      renderHtml = <section className="search-mobile-result">
        <section className="search-mobile-result_sort">
          <select className="search-mobile-result_sort_text" onChange={this.handleSortDropDown} value={this.state.sortDropDown}>
            <option value="all" disabled>{props.i18N["jpm.am.general.search.sortresults"]}</option>
            <option value="rel">{props.i18N["jpm.am.general.search.relevance"]}</option>
            <option value="desc">{props.i18N["jpm.am.general.search.newest"]}</option>
            <option value="asc">{props.i18N["jpm.am.general.search.oldest"]}</option>
          </select>
        </section>
        <div id="searchloadingIndicator" className={props.showLoader ? "search-show" : "search-hide"}></div>
        <div className={props.showLoader ? "search-visibility" : "search-show jp-featureItem__mobiles"}>
          {tempData.map((ele, i) => {
            //ele.date = getDate(ele.date);
            ele.imgUrl = getImgUrl(ele);
            ele.i18NObj = props.i18N;
            return mobile(ele, i);
          })}
        </div>
        <section className={showLoadMoreValue ? "search-mobile-result_load-more search-mobile-result_show" : "search-mobile-result_hide"}>
          <button className="search-mobile-result_load-more_text" onClick={() => this.handleLoadMore()}>{props.i18N["jpm.am.general.search.loadmore"]}</button>
        </section>
      </section>;
    } else {
      renderHtml = (<React.Fragment>
        <section tabIndex="0" className={sugValue ? "did-you-mean" : "search_hide"}>{props.i18N["jpm.am.general.search.didyoumean"]}<button tabIndex="0" title={sugValue} className="did-you-mean_sugValue" onClick={() => this.handleDidYouMean(sugValue)} >{sugValue}</button></section>
        <section className="search-filter">
          <section className={props.isTablet ? "search-filter_sort tabelet-container" : "search-filter_sort"}>
            <span className={props.isTablet ? 'search_hide' : ''}>
              {props.i18N["jpm.am.general.search.sortby"]}
              <span role="button" tabIndex="0" aria-label="Sort by Relevance" onClick={() => this.handleSort("rel")}
                className={props.sort === "rel" ? "search-filter_sort_true" : null}>
                {" "} {props.i18N["jpm.am.general.search.relevance"]}
              </span>{" "}|
                          <span role="button" tabIndex="0" aria-label="Sort by Newest"
                onClick={() => this.handleSort("desc")}
                className={props.sort === "desc" ? "search-filter_sort_true" : null}>
                {" "}{props.i18N["jpm.am.general.search.newest"]}
              </span>{" "}|
                          <span onClick={() => this.handleSort("asc")} role="button" tabIndex="0" aria-label="Sort by Oldest"
                className={props.sort === "asc" ? "search-filter_sort_true" : null}>
                {" "}{props.i18N["jpm.am.general.search.oldest"]}
              </span>
            </span>
            <div className={props.isTablet ? 'tablet' : 'search_hide'}>
              <span>{props.i18N["jpm.am.general.search.sortby"]}</span>
              <select id="tablet-text" onChange={this.handleSortDropDown} value={this.state.sortDropDown}>
                <option value="rel">{props.i18N["jpm.am.general.search.relevance"]}</option>
                <option value="desc">{props.i18N["jpm.am.general.search.newest"]}</option>
                <option value="asc">{props.i18N["jpm.am.general.search.oldest"]}</option>
              </select>
            </div>
          </section>
          <section className="search-filter_rec-limit">
            <select value={summary.limit} tabIndex="0" title="Limit Per Page"
              onChange={this.handleLimitChange}
              className={props.isTablet ? "search-filter_res-sel tablet" : "search-filter_res-sel desktop"}>
              <option tabIndex="0" value="20">{props.i18N["jpm.am.general.search.pagelimit"]}</option>
              <option tabIndex="0" value="100">{props.i18N["jpm.am.general.search.maxpagelimit"]}</option>
            </select>
          </section>
          <section className="search-filter_page-no" tabIndex="0">
            <div role="none" title="Page Counter">
              {start} - {end} {props.i18N["jpm.am.general.search.of"]} {summary.total} {props.i18N["jpm.am.general.search.results"]}
            </div>
          </section>
        </section>
        <hr className="search-seperator" />
        <div id="searchloadingIndicator" className={props.showLoader ? "search-show" : "search-hide"}></div>
        <div className={props.showLoader ? "search-visibility" : "search-show jp-featureItem__desktop"}>
          {data.map((ele, i) => {
            //ele.date = getDate(ele.date);
            ele.imgUrl = getImgUrl(ele);
            ele.i18NObj = props.i18N;
            return desktop(ele, i);
          })}
        </div>
        <section className={(summary.total / summary.limit) > 1 ? 'search-show search-pagination' : 'search-hide'}>
          <div role="button" tabIndex="0" aria-label="Previous"
            className={this.props.pageNo > 1 ? "search-pagination_no" : "search-pagination_no disable"}
            onClick={() => this.handlePrevious(true)} onKeyUp={(event) => this.handleKeyUp(event, "pre")}>
            <span>&#60;</span>
          </div>
          {this.createPagination()}
          <div role="button" tabIndex="0" aria-label="Next"
            className={props.pageNo < Math.ceil(summary.total / summary.limit) ? "search-pagination_no" : "search-pagination_no disable"}
            onClick={() => this.handlePrevious(false)} onKeyUp={(event) => this.handleKeyUp(event, "next")}>
            <span>&#62;</span>
          </div>
        </section>
      </React.Fragment>);
    }
    return renderHtml;
  }
}
const mapDispatchToProps = {
  onSetPage: setPage,
  onSetLimit: setLimit,
  onSetSort: setSort,
  getResult: getResult,
  onSetResCount: setResCount
};
const mapStateToProps = state => {
  return {
    results: state.results,
    summary: state.summary,
    pageNo: state.pageNo,
    isMobile: state.isMobile,
    didYouMean: state.didYouMean,
    resultCount: state.resultCount,
    i18N: state.i18N,
    sort: state.sort,
    isTablet: state.isTablet,
    showLoader: state.showLoader
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Result);
