import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import { apiBaseUrl } from "../../../../api/helpers";

const SearchBoxComponent = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [fastResults, setFastResults] = useState([]);
  const handleSubmit = () => {
    props.history.push(`/search/${searchValue?.length ? searchValue : " "}`);
  };
  const handleSearchInput = (event) => {
    event.key === "Enter" ? handleSubmit() : console.log("auto complete");
  };

  const fastSearchResults = async () => {
    const response = await axios({
      method: "get",
      url: `${apiBaseUrl}/Courses/QuickSearchCourse/${searchValue}`,
    });
    setFastResults(response.data?.data);
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      fastSearchResults();
    }
  }, [searchValue.length]);

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
        {searchValue?.length > 2 ? (
          <DropdownMenu>
            {fastResults?.length ? (
              fastResults.map((item) => {
                return (
                  <DropdownItem className="p-0">
                    <a
                      className="nav-link d-inline-block"
                      onClick={() =>
                        props.history.push(`/course/details/${item?.id}`)
                      }
                    >
                      {item?.name?.length > 30
                        ? item?.name?.substring(0, 30) + ".."
                        : item?.name}
                    </a>
                  </DropdownItem>
                );
              })
            ) : (
              <DropdownItem className="p-0">
                <a className="nav-link d-inline-block">
                  لا توجد نتائج بحث مشابهة
                </a>
              </DropdownItem>
            )}
          </DropdownMenu>
        ) : null}
      </UncontrolledDropdown>
    </>
  );
};

export const SearchBox = withRouter(SearchBoxComponent);
