import React from "react";
export function mobile(ele, i) {
  let emaildetails = helperFunction(ele);
  return (<React.Fragment key={i}>
    <div className='jp-featureItem__scontainer'>
      <div className='jp-featureItem__scontainer__flex'>
        <a href={ele.url} tabIndex="0" role="button" aria-label={"Route to " + ele.url} target="_blank">
          <div className='jp-featureItem__scontainer__iconarea'>
            <img src={ele.imgUrl} className='jp-featureItem__scontainer__image' alt="feature image" title={ele.title} />
            <em className='jp-featureItem__scontainer__icon${contentType} '></em>
          </div>
        </a>
      </div>
      <div className='jp-featureItem__scontainer__data'>
        <a className='jp-featureItem__scontainer__data__title' href={ele.url}>{ele.title}</a>
        <div className={ele.format !== 'document' ? "'jp-featureItem__scontainer__data__contributor'" : "search-hide"}>
          {ele.contributors && ele.contributors.map((rec, ind) => {
            return <span key={ind}>
              <a href={rec.contributorBioPage} tabIndex="0" title="Contributor" className={rec.contributorBioPage ? "" : "search-pointer-event"} >{rec.contributorName}</a>
              <span className={(ele.contributors.length - 1) == ind ? "search-hide" : ""}>, </span>
            </span>;
          })}
        </div>
        <div className={ele.format === 'document' ? "jp-featureItem__scontainer__data__contributor" : "search-hide"}>
          <a href="#" tabIndex="0" title="Contributor" className="author-name search-pointer-event">{ele.authorBio}</a>
        </div>
        <p className='jp-featureItem__scontainer__data__date' tabIndex="0" title={ele.date}>{ele.date}</p>
      </div>
    </div>
    <p className='jp-featureItem__scontainer__data__content' tabIndex="0" title="Description">{ele.description}</p>
    <div className='jp-featureItem__scontainer__breadcrumb'>
      <li tabIndex="0" role="button" title="Email To" className={!ele.assetDownloadUrl ? '' : 'search-hides'}>
        <span className='jp-featureItem__scontainer__breadcrumb__emailIcon'></span>
        <a href={emaildetails} className='jp-featureItem__scontainer__breadcrumb__data'>{ele.i18NObj["jpm.am.general.search.emailthis"]}</a>
      </li>
      <li tabIndex="0" role="button" title="Lock" className="search-hides">
        <span className='jp-featureItem__scontainer__breadcrumb__lockIcon'></span>
        <a href="#" className='jp-featureItem__scontainer__breadcrumb__data'>{ele.i18NObj["jpm.am.general.search.addto"]}</a>
      </li>
      <li tabIndex="0" role="button" title="Download Assest" className={ele.assetDownloadUrl ? '' : 'search-hides'}>
        <a href={ele.assetDownloadUrl} download={ele.assetDownloadUrl} className='jp-featureItem__scontainer__breadcrumb__data'>
          <span className='jp-featureItem__scontainer__breadcrumb__downloadIcon'>{ele.i18NObj["jpm.am.general.search.download"]}</span>
        </a>
      </li>
      <li tabIndex="0" role="button" title="Lock" className="search-hides">
        <span className='jp-featureItem__scontainer__breadcrumb__lockIcon'></span>
        <a href="#" className='jp-featureItem__scontainer__breadcrumb__data'>{ele.i18NObj["jpm.am.general.search.addtofav"]}</a>
      </li>
    </div>
    <hr className='jp-featureItem__shorrizontalRow' />
  </React.Fragment>);
}

export function desktop(ele, i) {
  let emaildetails = helperFunction(ele);
  return (<React.Fragment key={i}>
    <div className="jp-featureItem__scontainer" tabIndex="0">
      <a href={ele.url} tabIndex="0" title="Link to Assest" target="_blank">
        <div className="jp-featureItem__container__iconarea">
          <img
            src={ele.imgUrl}
            className="jp-featureItem__scontainer__image"
            alt="Asset Image"
            title={ele.title}
          />
          <i className="jp-featureItem__container__iconimage " />
        </div>
      </a>
      <div className="jp-featureItem__scontainer__data">
        <a
          className="jp-featureItem__container__data__title" tabIndex="0" title="Title"
          href={ele.url}
        >
          {ele.title}
        </a>
        <div className={(ele.format !== 'document' && ele.contributors && ele.contributors.length > 0) ? 'jp-featureItem__container__data__contributor' : 'search-hide'}>
          {ele.contributors && ele.contributors.map((rec, ind) => {
            return <span key={ind}>
              <a href={rec.contributorBioPage} tabIndex="0" title="Contributor" className={rec.contributorBioPage ? "" : "search-pointer-event"} >{rec.contributorName} </a>
              <span className={(ele.contributors.length - 1) == ind ? "search-hide" : ""}>, </span>
            </span>;
          })}
        </div>
        <div className={(ele.format === 'document') ? 'jp-featureItem__container__data__contributor' : 'search-hide'}>
          <a href="#" tabIndex="0" title="Contributor" className="author-name search-pointer-event">{ele.authorBio}</a>
        </div>
        <p className="jp-featureItem__container__data__date" tabIndex="0" title="Date">
          {ele.date}
        </p>
        <p className="jp-featureItem__scontainer__data__content" tabIndex="0" title="Description">
          {ele.description}
        </p>
      </div>
      <div className="jp-featureItem__scontainer__breadcrumb">
        <li tabIndex="0" title="Mail To" role="button" className={!ele.assetDownloadUrl ? '' : 'search_hide'}>
          <span className="jp-featureItem__scontainer__breadcrumb__emailIcon" />
          <a
            href={emaildetails}
            className="jp-featureItem__scontainer__breadcrumb__data"
            title="Email To">{ele.i18NObj["jpm.am.general.search.emailthis"]}</a>
        </li>

        <li tabIndex="0" title="Download" role="button" className={ele.assetDownloadUrl ? '' : 'search_hide'}>
          <a
            href={ele.assetDownloadUrl}
            download={ele.assetDownloadUrl}
            className="jp-featureItem__scontainer__breadcrumb__data"
            title="Download"
          ><span className="jp-featureItem__scontainer__breadcrumb__downloadIcon" />{ele.i18NObj["jpm.am.general.search.download"]}</a>
        </li>

        <li tabIndex="0" title="Lock" role="button" className="search_hide">
          <span className="jp-featureItem__scontainer__breadcrumb__lockIcon" />
          <a
            href="#"
            className="jp-featureItem__scontainer__breadcrumb__data"
            title="Lock">{ele.i18NObj["jpm.am.general.search.addto"]}</a>
        </li>
        <li tabIndex="0" title="Lock" role="button" className="search_hide">
          <span className="jp-featureItem__scontainer__breadcrumb__lockIcon" />
          <a
            href="#"
            className="jp-featureItem__scontainer__breadcrumb__data"
            title="Lock">{ele.i18NObj["jpm.am.general.search.addtofav"]}</a>
        </li>
      </div>
    </div>
    <hr className="jp-featureItem__shorrizontalRow" />
  </React.Fragment>);
}
function helperFunction(ele) {
  let path = window.location.origin + ele.url,
    title = ele.title ? ele.title.split(" ").join("%20") : null;
  return `mailto:?subject=${title}&body=${path}`;
}