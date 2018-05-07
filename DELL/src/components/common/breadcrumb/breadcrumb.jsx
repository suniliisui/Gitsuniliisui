import React, { Component } from "react";
import { Link } from "react-router";
import { getDataFromCms } from "../../common/utils/cmsResponse";
import urlsmapping from "../../common/constants/breadcrumbconst";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //breadcrumbsState: this.props.location.postData,
      currenturl: window.location.href
        .toString()
        .split("#")[1]
        .split("?")[0]
    };
    this.getBreadcrumb = this.getBreadcrumb.bind(this);
    urlsmapping.map((item, i) => {
      item.value = getDataFromCms(item.name);
    });
  }

  getBreadcrumb(item) {
    // Link to doesn't support external routing so we are using a href
    if (
      this.state.currenturl.indexOf(item.url) !== -1 &&
      !item.isintegrationRequestid
    ) {
      return (
        <span key={"link" + item.value}>
          {item.url !== "/" ? (
            <Link
              className={item.icon ? "breadcrumb-icon-home" : "breadcrumb-link"}
              to={{ pathname: item.url }}
            >
              {
                <span>
                  <div className="breadcrumb-icon"></div>
                  <span>{item.value}</span>
                </span>
              }
            </Link>
          ) : (
            <a href={item.navigateurl} className="breadcrumb-icon-home">
              {item.icon ? "" : item.value}{" "}
            </a>
          )}
        </span>
      );
    } else if (
      this.state.currenturl.indexOf(item.url) !== -1 &&
      item.isintegrationRequestid
    ) {
      return (
        <span key={"link" + item.value}>
          <Link to={{ pathname: item.showurl }} className="breadcrumb-link">
            <span>
              <div className="breadcrumb-icon"></div>
              <span>{item.value}</span>
            </span>
          </Link>
          <Link to={{ pathname: item.url }} className="breadcrumb-link">
          {sessionStorage.getItem("integrationRequestName") ? (
            <span key="link-id">
              <div className="breadcrumb-icon"></div>
              <span className=" breadcrumb-link">
                {sessionStorage.getItem("integrationRequestName")}
              </span>
            </span>
          ) : (
            ""
          )}
          {sessionStorage.getItem("integrationRequestName") ? "" : ""}
          </Link>
        </span>
      );
    }
  }

  createbreadcrumb(links) {
    return links.map(this.getBreadcrumb);
  }

  render() {
    return (
      <div className="default-section">
        <div className="d-bottom-offset-10 d-top-offset-10 default-div">
          <div className="w-row">
            <div
              className="no-padding w-col w-col-9 Breadcrumb"
              data-automationId="Breadcrumb"
            >
              {this.createbreadcrumb(urlsmapping)}
            </div>
            <div className="no-padding w-col w-col-3" />
          </div>
          <div className="no-padding w-col w-col-3" />
        </div>{" "}
      </div>
    );
  }
}
export default Breadcrumb;
