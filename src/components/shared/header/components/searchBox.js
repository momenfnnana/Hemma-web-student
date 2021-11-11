import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter } from "react-router-dom";

import "./index.scss";

const SearchBoxComponent = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = () => {
    props.history.push(`/search/${searchValue?.length ? searchValue : " "}`);
  };
  const handleSearchInput = (event) => {
    event.key === "Enter" ? handleSubmit() : console.log("auto complete");
  };
  return (
    <>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle className={"bg-white border-0"}>
          <div className="border rounded px-2">
            <input
              className="search-box border-0"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => handleSearchInput(e)}
              placeholder="ابحث عن دورة"
            />
            <BsSearch className="main-color" onClick={() => handleSubmit()} />
          </div>
        </DropdownToggle>
        {searchValue?.length ? (
          <DropdownMenu>
            <DropdownItem className="p-0">
              <a className="nav-link d-inline-block">test search result</a>
            </DropdownItem>
          </DropdownMenu>
        ) : null}
      </UncontrolledDropdown>
    </>
  );
};

export const SearchBox = withRouter(SearchBoxComponent);
