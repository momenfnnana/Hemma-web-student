import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "./index.scss";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = () => {
    console.log({ handleSubmit: "handleSubmit" });
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
            />
            <BsSearch color={"red"} />
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

export default SearchBox;
