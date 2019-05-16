import React, { Component } from "react";
import { connect } from "react-redux";
import Search from './component/search';
import Accordion from './component/accordion';
import Result from './component/result';
import { getResult, setSeachText } from '../src/feature/actions/action';

class App extends Component {
  componentDidMount() {
    let props = this.props;
    if (props.authorMode && props.authorMode !== "search_results") {
      props.getResult("", props.setSeachText);
    }
  }
  handleDidYouMean = (searchText) => {
    let event = new CustomEvent('populateSearch', { 'detail': searchText });
    sessionStorage.setItem('searchKeyword', searchText);
    document.dispatchEvent(event);
  }
  render = () => {
    let searchResult = null,
      props = this.props,
      authorMode = props.authorMode,
      accordionFlag = authorMode === 'associated_content' ? false : true,
      sugValue = props.didYouMean,
      isLibrary = authorMode === 'library' ? "filter-area search-library" : "filter-area";
    if (props.results && props.results.length > 0) {
      searchResult = <React.Fragment>
        <section className={accordionFlag ? isLibrary : "search-input-hide"}>
          <Accordion />
        </section >
        <section className={accordionFlag ? "search-result" : "search-result search-result-complete"}>
          <Result />
        </section >
      </React.Fragment >;
    } else if (props.results && props.searchText && props.searchText.length > 0) {
      let errorMsg = props.erMsg;
      searchResult = <React.Fragment>
        <div className={props.isMobile?"error_msg error_msg_mobile":"error_msg"}>
          <section tabIndex="0" className={sugValue ? "didyoumean" : "search_hide"}>{props.i18N["jpm.am.general.search.didyoumean"]}<button tabIndex="0" title={sugValue} className="did-you-mean_sugValue" onClick={() => this.handleDidYouMean(sugValue)} >{sugValue}</button></section>
          <h1 className="heading-one">{errorMsg.h1}</h1>
          <h2>{errorMsg.h2}</h2>
          <ul className="heading-options">
            {errorMsg.data.map((obj, i) => {
              return (
                <li key={i}>{obj}</li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>;
    }
    return (<section className="search-container" >
      <section className={authorMode === 'search_results' ? "search-header" : "search-input-hide"}>
        <Search />
      </section >
      {searchResult}
    </section>
    );
  }
}
const mapDispatchToProps = {
  getResult: getResult,
  setSeachText: setSeachText
};
const mapStateToProps = state => {
  return {
    facets: state.facets,
    results: state.results,
    erMsg: state.errorMsg,
    authorMode: state.authorMode,
    searchText: state.searchText,
    didYouMean: state.didYouMean,
    i18N: state.i18N,
    isMobile:state.isMobile
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
