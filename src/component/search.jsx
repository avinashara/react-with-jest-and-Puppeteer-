import React, { Component } from "react";
import Autosuggest from 'react-autosuggest';
import { connect } from "react-redux";
import { getResult, setSeachText, setFiters, setPage } from '../feature/actions/action';
import { sugUrl} from '../feature/constants/constant';
import { debouceFunction } from '../feature/dataServices/helper';
import axios from 'axios';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchText: sessionStorage.getItem('searchKeyword') ? sessionStorage.getItem('searchKeyword') : '',
      suggestions: [],
      suggestFlag: false
    };
  }
  componentDidMount() {
    if (this.state.searchText.replace(/ /g, '').length >= 3) {
      this.props.getResult(this.state.searchText, this.props.setSeachText);
    }
    //Event Listner to listen the search from outside of react context for example from navigation header.
    document.addEventListener('populateSearch', (data) => {
      let text = data.detail;
      if (text.replace(/ /g, '').length >= 3) {
        sessionStorage.removeItem('searchStore');
        this.setState({ searchText: text }, () => {
          sessionStorage.setItem('searchPageNo', 1);
          this.props.onSetFiters([]);
          this.props.getResult(text, this.props.setSeachText);
        });
      }
    }, false);
    //reading the value of suggest flag from dom element.
    let suggestFlag = "true";//document.getElementById('jp-search-root').getAttribute('data-suggestFlag');
    this.setState({ suggestFlag: suggestFlag === "true" ? true : false });
  }

  handleSearchTextChange = (event, { newValue }) => {
    this.setState({
      searchText: newValue
    });
  };

  fetchSuggestion = debouceFunction(data => {
    let value = data.value.toLowerCase();
    if (data.reason === "input-changed" && value.replace(/ /g, '').length >= 3 && this.state.suggestFlag) {
      /*
      Setting up the value of region, country, language & role.
      */
      let cookiesData = window.getCookiesDataForSearch();
      let region = cookiesData.region;
      let country = cookiesData.country;
      let language = cookiesData.language;
      let role = cookiesData.role;
      let query = `searchTerm=${value}&region=${region}&country=${country}&language=${language}&role=${role}`;
      axios.get(`http://www.mocky.io/v2/5cdd10f83000008025e2346e`)
        .then(rec => {
          let fetchedData = rec.data[0].results.filter(rec => {
            return rec.suggestion.toLowerCase().indexOf(value) >= 0 ? true : false;
          });
          this.setState({ suggestions: fetchedData });
        });
    }
  });

  getSuggestionValue = data => {
    let value = data.tickerCode ? data.tickerCode : data.suggestion;
    return value.toString();
  }
  suggestionSelected = (event, { suggestionValue, method }) => {
    this.props.onSetFiters([]);
    if (suggestionValue.replace(/ /g, '').length >= 3 && (method === "click")) {
      this.props.getResult(suggestionValue, this.props.setSeachText);
    }
  }

  clearSuggestions = () => { this.setState({ suggestions: [] }); };
  renderSuggestion = (data) => {
    let sugSection = document.querySelector(".react-autosuggest__suggestions-container"),
      props = this.props;
    if (this.state.searchText.length < 3) {
      sugSection.classList.remove('react-autosuggest__suggestions-container--open');
      return null;
    }
    sugSection.classList.add('react-autosuggest__suggestions-container--open');
    return (<p><span className={props.isMobile ? "sug-mobile" : ""}>{data.suggestion} </span><span className={data.tickerCode ? "pull-right" : "search_hide"}>{data.tickerCode} </span></p>);
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleSearchClick();
    }
  }
  handleSearchClick = () => {
    let searchText = this.state.searchText;
    if (searchText.replace(/ /g, '').length >= 3) {
      this.props.getResult(searchText, this.props.setSeachText);
    }
  }
  render() {
    let { searchText, suggestions } = this.state, props = this.props,
      result = props.results ? props.results : [];
    const inputProps = {
      placeholder: props.i18N["jpm.am.general.search.searchtext"],
      value: searchText,
      onChange: this.handleSearchTextChange,
      onKeyDown: this.handleKeyDown,
      name: 'search-list',
      id: "search-field",
      //title:'Search box',
      tabIndex: 0
    };
    return (
      <React.Fragment>
        <section role="none" className={props.isMobile && result.length > 0 ? "search_result-section" : "search_hide"}>
          <span tabIndex="0" className="search_result-section_text">{result.length} {props.i18N["jpm.am.general.search.resultsfor"]}</span>
        </section>
        <section className="search" id="search-container">
          {/* <label htmlFor="search-field" className="search_hide">{props.i18N["jpm.am.general.search.searchInput"]}</label> */}
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.fetchSuggestion}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            onSuggestionsClearRequested={this.clearSuggestions}
            onSuggestionSelected={this.suggestionSelected}
            inputProps={inputProps}
          />
          <button tabIndex="0" title="Search" className={props.isMobile ? "search_hide" : "search_btn"}
            onClick={() => this.handleSearchClick()}>
            <span className="search_text_btn" role="none">{props.i18N["jpm.am.general.search.searchtext"]} <span className="search_text_btn_arrow"></span> </span>
          </button>
          <button tabIndex="0" title="Search" className={props.isMobile ? "jp-search circleButton pull-right" : "search_hide"}
            onClick={() => this.handleSearchClick()}>
          </button>
        </section>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = {
  getResult: getResult,
  setSeachText: setSeachText,
  onSetFiters: setFiters,
  setPage: setPage
};
const mapStateToProps = state => {
  return {
    isMobile: state.isMobile,
    resultCount: state.resultCount,
    results: state.results,
    i18N: state.i18N
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
