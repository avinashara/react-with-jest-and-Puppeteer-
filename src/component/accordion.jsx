import React, { Component } from "react";
import { connect } from "react-redux";
import { setFiters, getResult } from "../feature/actions/action";
import store from '../feature/stores/store';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      showAccordion: true
    };
  }
  componentDidMount() {
    if (this.props.isMobile) {
      this.setState({ showAccordion: false });
    }
  }
  handleSetFilter = flt => {
    this.props.getResult(flt, this.props.onSetFilter);
    document.getElementsByClassName('search-container')[0].scrollIntoView();
  }
  handleClearFilter = (name, prop) => {
    let filters = this.props.filters;
    if ((typeof name === "string" || name instanceof String) && name) {
      let filterArray = filters.filter(rec => {
        return !(rec.name === name && rec.filterName.name === prop);
      });
      this.props.getResult(filterArray, this.props.onSetFilter);
      return;
    }
    this.props.getResult([], this.props.onSetFilter);
  };
  handleShow = (isClose) => {
    let ref = this.refs.accord.style;
    if (this.props.isMobile) {
      if (isClose) {
        ref.border = '1px solid #373741';
        //this.handleClearFilter();
        this.setState({ showAccordion: false });
      } else {
        ref.border = 'none';
        this.setState({ showAccordion: true });
      }
    }
  }
  selectFold = foldNum => {
    const current = this.state.active === foldNum ? -1 : foldNum;
    this.setState(() => ({ active: current }));
  };

  render = () => {
    let props = this.props;
    let isMobile = props.isMobile;
    let refinedSection = <React.Fragment>
      <div className="filter-accordion_filter">
        <div className="filter-accordion_filter_refined">{isMobile ? props.i18N["jpm.am.general.search.filterresults"] : props.i18N["jpm.am.general.search.refinedby"]}
          <section role="button" tabIndex="0" className={isMobile ? "filter-accordion_show filter-accordion_filter_icons" : "filter-accordion_hide"}>
            <span className={this.state.showAccordion ? "filter-accordion_hide" : "filter-accordion_filter_down-icon"} onClick={() => this.handleShow(false)}></span>
            <span className={this.state.showAccordion ? "filter-accordion_filter_close" : "filter-accordion_hide"} onClick={() => this.handleShow(true)}>{props.i18N["jpm.am.general.search.close"]} </span>
          </section>
        </div>
        <section className="filter-accordion_filter_refinedTexts">
          {props.filters.map((rec, i) => {
            return (
              <span tabIndex="0" title={rec.filterName.displayName} key={i} className="filter-accordion_filter_text">
                {rec.filterName.displayName}
                <span role="button" title="Clear Filter" tabIndex="0" onClick={() => this.handleClearFilter(rec.name, rec.filterName.name)}
                  className="filter-accordion_filter_cross"></span>
              </span>
            );
          })}
          <span role="button" title="Clear Filters" tabIndex="0" className={props.filters.length > 0 ? "filter-accordion_filter_clear" : "filter-accordion_hide"} onClick={this.handleClearFilter}>
            {props.i18N["jpm.am.general.search.clearfilters"]}
          </span>
        </section>
      </div>
    </React.Fragment>;
    return (
      <section className="filter-accordion">
        <div ref="accord" className={props.isMobile ? "filter-accordion_refined" : ""} tabIndex="0" role="heading" >{refinedSection}</div>
        <div className={this.state.showAccordion ? "filter-accordion_accordion-content filter-accordion_show" : "filter-accordion_hide"}>
          {props.facets.map((record, i) => {
            if (record.facet.length > 0) {
              return (
                <Fold
                  key={i}
                  content={record}
                  handle={() => this.selectFold(i)}
                  active={i === this.state.active}
                  setFilter={p => this.handleSetFilter(p)}
                  filters={this.props.filters}
                  i18N={props.i18N}
                />
              );
            }
          })}
        </div>
      </section>
    );
  }
}

class Fold extends React.Component {

  handleSetFilter(name, filterRec) {
    let filters = JSON.parse(JSON.stringify(store.getState().filters));
    let filter = { name: filterRec.name, displayName: filterRec.displayName ? filterRec.displayName : filterRec.name };
    let dateLength = filters.filter(obj => {
      return obj.name === 'date';
    });
    if (name === 'date' && dateLength.length > 0) {
      filters.forEach((rec) => {
        if (rec.name === "date") {
          rec.filterName = filter;
        }
      });
    } else {
      filters.push({ name: name, filterName: filter });
    }
    this.props.setFilter(filters);
  }
  render() {
    let data = this.props.content;
    let list = null;
    if (this.props.active) {
      list = data.facet.map((rec, i) => {
        return (
          <li key={i} >
            <button tabIndex="0" aria-label={rec.name}
              onClick={() => this.handleSetFilter(data.name, rec)}
              className="filter-accordion_fold_btn filter-accordion_fold_text"
            >
              {" "}
              {rec.displayName ? rec.displayName : rec.name} ({rec.count})
            </button>
          </li>
        );
      });
    }

    return (
      <div className="filter-accordion_fold">
        <button tabIndex="0"
          className={`filter-accordion_fold_trigger`}
          onClick={this.props.handle} >
          <span className={this.props.active ? "filter-accordion_fold_trigger_icon search-active" : "filter-accordion_fold_trigger_icon search-inactive"}></span> {data.displayName ? data.displayName : data.name}

        </button>
        <div
          key="content"
          className={`filter-accordion_fold_content ${this.props.active ? "open" : ""}`}>
          <ul className="filter-accordion_fold_ul">{list}</ul>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onSetFilter: setFiters,
  getResult: getResult
};
const mapStateToProps = state => {
  return {
    facets: state.facets,
    filters: state.filters,
    isMobile: state.isMobile,
    i18N: state.i18N
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Accordion);
