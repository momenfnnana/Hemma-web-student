import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./index.scss";
import { apiBaseUrl } from "../../api/helpers";
const widthTableValue = { width: window.screen.width * 0.3 };

const PrivacyPolicyComponent = () => {
  const [selectedSection, setSelectedSection] = useState({});
  const [PoliciesList, setPoliciesList] = useState([]);
  const [policyDetails, setPolicyDetails] = useState({});
  const getAllPolicies = async () => {
    await Axios({
      method: "get",
      url: `${apiBaseUrl}/PrivacyPolicySetting/GetAllPrivacyPolicy`,
    })
      .then((res) => setPoliciesList(res.data?.data))
      .catch((error) => {
        console.log({ error });
        setPoliciesList([]);
      });
  };

  const getPolicyDetails = async () => {
    await Axios({
      method: "get",
      url: `${apiBaseUrl}/PrivacyPolicySetting/GetPrivacyPolicyDetails?id=${selectedSection?.id}`,
    })
      .then((res) => setPolicyDetails(res.data?.data))
      .catch((error) => {
        setPolicyDetails({});
        console.log({ error });
      });
  };
  useEffect(() => {
    getAllPolicies();
  }, []);

  useEffect(() => {
    if (selectedSection?.id) {
      getPolicyDetails();
    }
  }, [selectedSection?.id]);
  console.log({ policyDetails });
  return (
    <div className="page-container container-fluid my-5">
      {/* start table */}
      <div className="table mx-auto row border">
        <div className="col-12 d-flex justify-content-center align-items-center p-0 table-header">
          <div className="w-50 h-100 border d-flex justify-content-start align-items-center px-3">
            <img
              className="logo-img header-mobile-icon"
              src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
              height="60"
            />
          </div>
          <div className="w-50 h-100 border p-3">
            <p>مركز منصة همة للتدريب</p>
            <p>إدارة التشغيل</p>
            <p>سياسات ودالئل التشغيل</p>
            <p>مبادئ حقوق الملكية الفكرية وحقوق النشر</p>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center p-0 table-body">
          <div className="w-50 h-100 border"></div>
          <div className="d-flex flex-column justify-content-center align-items-end border h-100 p-3 w-50">
            <p className="m-0 p-0 font-weight-bold">IMS-35-01</p>
            <p className="m-0 p-0 font-weight-bold">V:1/1</p>
            <p className="m-0 p-0 font-weight-bold">DOI: 01/04/2021</p>
          </div>
        </div>
      </div>
      {/* end table */}
      {/* page content */}
      <div>
        <ul className="my-5">
          {PoliciesList?.map((item) => (
            <li
              onClick={() => setSelectedSection(item)}
              key={item?.id}
              className="text-right section-title w-75 mx-auto cursor-pointer sections-title my-3"
            >
              {item?.policyTitle}.
            </li>
          ))}
        </ul>
        <div className="section">
          <h4 className="text-center section-title">
            {policyDetails?.policyTitle}
          </h4>
          <div
            className="w-75 my-2 text-right mx-auto section-descriptions"
            dangerouslySetInnerHTML={{
              __html: policyDetails?.policyContent,
            }}
          ></div>
        </div>
        {/* {Object.keys(selectedSection).length ? (
          <div className="section">
            <h4 className="text-center section-title">
              {selectedSection?.title}
            </h4>
            {selectedSection?.subTitle1 ? (
              <h4 className="section-title1 w-75 mx-auto text-right my-5">
                {selectedSection?.subTitle1}:
              </h4>
            ) : null}
            <div className="mt-4">
              {selectedSection?.descriptionType === "normal"
                ? selectedSection?.descriptions?.map((item, index) => (
                    <div
                      className="w-75 my-2 text-right mx-auto section-descriptions"
                      key={index}
                    >
                      {item}.
                    </div>
                  ))
                : selectedSection?.descriptions?.map((item, index) => (
                    <div
                      className="w-75 my-2 text-right mx-auto section-descriptions d-flex"
                      key={index}
                    >
                      <div className="mx-2 section-title1 font-weight-bold">
                        {index === 0
                          ? "أولاَ"
                          : index === 1
                          ? "ثانياَ"
                          : index === 2 && "ثالثاَ"}{" "}
                        -
                      </div>
                      <div>{item}.</div>
                    </div>
                  ))}
            </div>
            <div className="mt-5">
              {selectedSection?.numricList?.length
                ? selectedSection?.numricList?.map((item) => (
                    <div className="mb-5">
                      <h4 className="text-right section-title w-75 mx-auto">
                        {item?.title}:
                      </h4>
                      <div className="w-75 my-3 text-right mx-auto section-descriptions">
                        {item?.subTitle}:
                      </div>
                      <ol>
                        {item?.list?.length &&
                          item?.list?.map((itemList) => (
                            <li className="w-75 my-2 text-right mx-auto">
                              {itemList}.
                            </li>
                          ))}
                      </ol>
                      <div className="w-75 text-right mx-auto section-descriptions">
                        {item?.bottomDescription}
                      </div>
                    </div>
                  ))
                : null}
            </div>
            {selectedSection?.sections?.length
              ? selectedSection?.sections?.map((item, index) => (
                  <div className="my-4">
                    <h4
                      key={index}
                      className="text-right section-title w-75 mx-auto"
                    >
                      {item?.title}:
                    </h4>
                    {item?.descriptions?.length
                      ? item?.descriptions?.map(
                          (descriptionItem, descriptionIndex) => (
                            <div
                              key={descriptionIndex}
                              className="w-75 text-right mx-auto section-descriptions"
                            >
                              {descriptionItem}.
                            </div>
                          )
                        )
                      : null}
                    {item?.subSections?.length
                      ? item?.subSections?.map(
                          (subSectionItem, subSectionIndex) => (
                            <div key={subSectionIndex}>
                              <div className="d-flex w-75 mx-auto">
                                <h5 className="text-right section-title mt-5 mx-1">
                                  {subSectionIndex === 0
                                    ? "أ"
                                    : subSectionIndex === 1
                                    ? "ب"
                                    : subSectionIndex === 2 && "ج"}
                                  .
                                </h5>
                                <h5 className="text-right section-title mt-5">
                                  {subSectionItem?.title}:
                                </h5>
                              </div>
                              {subSectionItem?.descriptions?.length &&
                                subSectionItem?.descriptions?.map(
                                  (
                                    subSectionItemDescription,
                                    subSectionItemDescriptionIndex
                                  ) => (
                                    <div
                                      key={subSectionItemDescriptionIndex}
                                      className="w-75 text-right mx-auto section-descriptions"
                                    >
                                      {subSectionItemDescription}.
                                    </div>
                                  )
                                )}
                            </div>
                          )
                        )
                      : null}
                  </div>
                ))
              : null}
            {Object.keys(selectedSection?.hint)?.length ? (
              <>
                <h4 className="text-right section-title w-75 mx-auto font-weight-bold">
                  {selectedSection?.hint?.title}:
                </h4>
                <div className="w-75 text-right mx-auto section-descriptions">
                  {selectedSection?.hint?.description}.
                </div>
              </>
            ) : null}
            <div className="my-3">
              {selectedSection?.table?.length ? (
                <div className="container">
                  <div className="row">
                    <div className="border col-12 mx-auto d-flex px-0">
                      <div className="w-25 text-right mx-auto section-descriptions table-title px-3">
                        البند
                      </div>
                      <div className="w-75 border-left text-right mx-auto section-descriptions table-title px-3">
                        التفاصيل
                      </div>
                    </div>
                    {selectedSection?.table?.length
                      ? selectedSection?.table?.map((tableItem, tableIndex) => (
                          <div className="border col-12 mx-auto d-flex px-0">
                            <div className="w-25 px-3 text-right mx-auto section-descriptions">
                              {tableItem?.key}
                            </div>
                            <div className="w-75 border-left px-3 text-right mx-auto section-descriptions">
                              {tableItem?.value}.
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="my-3">
              {selectedSection?.table2?.length ? (
                <div className="container">
                  <div className="row">
                    <div className="border col-12 mx-auto d-flex px-0">
                      <div
                        className="text-right mx-auto section-descriptions table-title px-1 px-lg-3"
                        style={widthTableValue}
                      >
                        وصف الإجراء
                      </div>
                      <div
                        className="border-left text-right mx-auto section-descriptions table-title px-1 px-lg-3"
                        style={widthTableValue}
                      >
                        المسؤول عن الإجراء
                      </div>
                      <div
                        className="border-left text-right mx-auto section-descriptions table-title px-1 px-lg-3"
                        style={widthTableValue}
                      >
                        قنوات الاتصال
                      </div>
                    </div>
                    {selectedSection?.table2?.length
                      ? selectedSection?.table2?.map(
                          (tableItem, tableIndex) => (
                            <div className="border col-12 mx-auto d-flex px-0">
                              <div
                                className="px-1 px-lg-3 text-right mx-auto section-descriptions"
                                style={widthTableValue}
                              >
                                {tableItem?.key}
                              </div>
                              <div
                                className="border-left px-1 px-lg-3 text-right mx-auto section-descriptions"
                                style={widthTableValue}
                              >
                                {tableItem?.Administrator}.
                              </div>
                              <div
                                className="border-left px-1 px-lg-3 text-right mx-auto section-descriptions"
                                style={widthTableValue}
                              >
                                {tableItem?.values?.map(
                                  (
                                    tableItemDescription,
                                    tableItemDescriptionIndex
                                  ) => (
                                    <div
                                      className="section-descriptions"
                                      key={tableItemDescriptionIndex}
                                    >
                                      {tableItemDescription}.
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        )
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="my-3">
              {selectedSection?.table3?.length ? (
                <div className="container">
                  <div className="row">
                    <div className="border col-12 mx-auto d-flex px-0">
                      <div className="w-25 text-right mx-auto section-descriptions table-title px-3">
                        القناة
                      </div>
                      <div className="w-75 border-left text-right mx-auto section-descriptions table-title px-3">
                        تفاصيل الاتصال
                      </div>{" "}
                    </div>
                    {selectedSection?.table3?.length
                      ? selectedSection?.table3?.map(
                          (tableItem, tableIndex) => (
                            <div className="border col-12 mx-auto d-flex px-0">
                              <div className="w-25 px-3 text-right mx-auto section-descriptions">
                                {tableItem?.key}
                              </div>
                              <div className="w-75 border-left px-3 text-right mx-auto section-descriptions">
                                {tableItem?.value}.
                              </div>{" "}
                            </div>
                          )
                        )
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="my-3">
              {selectedSection?.table4?.length ? (
                <div className="container">
                  <div className="row">
                    <div className="border col-12 mx-auto d-flex px-0">
                      <div className="w-75 text-right mx-auto section-descriptions table-title px-3">
                        البند
                      </div>
                      <div className="w-75 border-left text-right mx-auto section-descriptions table-title px-3">
                        التوضيح
                      </div>
                      <div className="w-75 border-left text-right mx-auto section-descriptions table-title px-3">
                        مالحظات ان وجدت
                      </div>
                    </div>
                    {selectedSection?.table4?.length
                      ? selectedSection?.table4?.map(
                          (tableItem, tableIndex) => (
                            <div className="border col-12 mx-auto d-flex px-0">
                              <div className="w-75 px-3 text-right mx-auto section-descriptions">
                                {tableItem?.key}
                              </div>
                              <div className="w-75 border-left px-3 text-right mx-auto section-descriptions">
                                {tableItem?.explain}.
                              </div>
                              <div className="w-75 border-left px-3 text-right mx-auto section-descriptions">
                                {tableItem?.notes}.
                              </div>
                            </div>
                          )
                        )
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="my-5">
              {selectedSection?.unNumricList?.map(
                (unNumricListItem, unNumricListIndex) => (
                  <>
                    <h4
                      key={unNumricListIndex}
                      className="text-right section-title w-75 mx-auto"
                    >
                      {unNumricListItem?.title}:
                    </h4>
                    <ul>
                      {unNumricListItem?.list?.length
                        ? unNumricListItem?.list?.map((listItem, listIndex) => (
                            <li
                              key={listIndex}
                              className="w-75 px-3 text-right mx-auto section-descriptions"
                            >
                              {listItem}.
                            </li>
                          ))
                        : null}
                    </ul>
                  </>
                )
              )}
            </div>
            {selectedSection?.UnOrderedList?.map(
              (UnOrderedListItem, UnOrderedListIndex) => (
                <>
                  <h4
                    key={UnOrderedListIndex}
                    className="text-right section-title w-75 mx-auto"
                  >
                    {UnOrderedListItem?.title}:
                  </h4>
                  <ul>
                    {UnOrderedListItem?.list?.map((itemList, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="w-75 px-3 text-right mx-auto section-descriptions"
                      >
                        {itemList}.
                      </li>
                    ))}
                  </ul>
                </>
              )
            )}
            {selectedSection?.sections2?.length
              ? selectedSection?.sections2?.map(
                  (sections2Item, sections2Index) => (
                    <>
                      <h4
                        key={sections2Index}
                        className="text-right section-title w-75 mx-auto"
                      >
                        {sections2Item?.title}:
                      </h4>
                      {sections2Item?.descriptions?.length
                        ? sections2Item?.descriptions?.map(
                            (description1Item, description1Index) => (
                              <div
                                className="w-75 px-3 text-right mx-auto section-descriptions"
                                key={description1Index}
                              >
                                {description1Item}.
                              </div>
                            )
                          )
                        : null}
                      <div className="my-5">
                        {sections2Item?.UnOrderedList?.length
                          ? sections2Item?.UnOrderedList?.map(
                              (UnOrderedListItem, UnOrderedListIndex) => (
                                <>
                                  <h5
                                    key={UnOrderedListIndex}
                                    className="text-right section-title w-75 mx-auto"
                                  >
                                    {UnOrderedListItem?.title}:
                                  </h5>
                                  {UnOrderedListItem?.descriptions?.length
                                    ? UnOrderedListItem?.descriptions?.map(
                                        (
                                          descriptionsItem,
                                          descriptionsIndex
                                        ) => (
                                          <div
                                            className="w-75 px-3 text-right mx-auto section-descriptions"
                                            key={descriptionsIndex}
                                          >
                                            {descriptionsItem}.
                                          </div>
                                        )
                                      )
                                    : null}
                                  <ul>
                                    {UnOrderedListItem?.list?.length
                                      ? UnOrderedListItem?.list?.map(
                                          (ListsItem, ListsIndex) => (
                                            <li
                                              className="w-75 px-3 text-right mx-auto section-descriptions"
                                              key={ListsIndex}
                                            >
                                              {ListsItem}.
                                            </li>
                                          )
                                        )
                                      : null}
                                  </ul>
                                  {UnOrderedListItem?.descriptions2?.length
                                    ? UnOrderedListItem?.descriptions2?.map(
                                        (
                                          descriptionsItem2,
                                          descriptionsIndex2
                                        ) => (
                                          <div
                                            className="w-75 px-3 text-right mx-auto section-descriptions"
                                            key={descriptionsIndex2}
                                          >
                                            {descriptionsItem2}.
                                          </div>
                                        )
                                      )
                                    : null}
                                  <ul>
                                    {UnOrderedListItem?.list2?.length
                                      ? UnOrderedListItem?.list2?.map(
                                          (ListsItem2, ListsIndex2) => (
                                            <li
                                              className="w-75 px-3 text-right mx-auto section-descriptions"
                                              key={ListsIndex2}
                                            >
                                              {ListsItem2}.
                                            </li>
                                          )
                                        )
                                      : null}
                                  </ul>
                                </>
                              )
                            )
                          : null}
                      </div>
                      <div className="my-5">
                        {sections2Item?.subSections1?.length
                          ? sections2Item?.subSections1?.map(
                              (subSection1Item, subSection1Index) => (
                                <div className="my-3">
                                  {subSection1Item?.title ===
                                  "سياسة استرجاع المال" ? (
                                    <h4
                                      className="text-right section-title w-75 mx-auto"
                                      key={subSection1Index}
                                    >
                                      {subSection1Item?.title}:
                                    </h4>
                                  ) : (
                                    <h5 className="text-right section-title w-75 mx-auto px-5">
                                      {subSection1Item?.title}:
                                    </h5>
                                  )}
                                  {subSection1Item?.descriptions?.length
                                    ? subSection1Item?.descriptions?.map(
                                        (
                                          subSection1DescriptionItem,
                                          subSection1DescriptionIndex
                                        ) => (
                                          <>
                                            {subSection1Item?.title ===
                                            "سياسة استرجاع المال" ? (
                                              <div
                                                key={
                                                  subSection1DescriptionIndex
                                                }
                                                className="w-75 px-3 text-right mx-auto section-descriptions"
                                              >
                                                {subSection1DescriptionItem}.
                                              </div>
                                            ) : (
                                              <div
                                                key={
                                                  subSection1DescriptionIndex
                                                }
                                                className="w-75 px-3 text-right mx-auto section-descriptions px-5"
                                              >
                                                {subSection1DescriptionItem}.
                                              </div>
                                            )}
                                          </>
                                        )
                                      )
                                    : null}
                                  <ol>
                                    {subSection1Item?.orderedList?.length
                                      ? subSection1Item?.orderedList?.map(
                                          (
                                            subSection2Item,
                                            subSection2Index
                                          ) => (
                                            <li
                                              key={subSection2Index}
                                              className="w-75 px-3 text-right mx-auto section-descriptions"
                                            >
                                              {subSection2Item}.
                                            </li>
                                          )
                                        )
                                      : null}
                                  </ol>
                                  {subSection1Item?.descriptions2?.length
                                    ? subSection1Item?.descriptions2?.map(
                                        (
                                          subSection2Description,
                                          subSection2DescriptionIndex
                                        ) => (
                                          <div
                                            key={subSection2DescriptionIndex}
                                            className="w-75 px-3 text-right mx-auto section-descriptions"
                                          >
                                            {subSection2Description}.
                                          </div>
                                        )
                                      )
                                    : null}
                                  {subSection1Item?.subSections2?.length
                                    ? subSection1Item?.subSections2?.map(
                                        (subSection2Item, subSection1Index) => (
                                          <div className="my-3">
                                            <h5
                                              className="text-right w-75 mx-auto px-2 px-lg-5"
                                              key={subSection1Index}
                                            >
                                              <span className="border-bottom mx-0 mx-lg-5">
                                                {subSection2Item?.title}:
                                              </span>
                                            </h5>
                                            {subSection2Item?.descriptions
                                              ?.length
                                              ? subSection2Item?.descriptions?.map(
                                                  (
                                                    subSection2DescriptionsItem,
                                                    subSection2DescriptionsIndex
                                                  ) => (
                                                    <div
                                                      key={
                                                        subSection2DescriptionsIndex
                                                      }
                                                      className="w-75 text-right mx-auto section-descriptions px-2 px-lg-5"
                                                    >
                                                      <div className="mx-0 mx-lg-5">
                                                        {
                                                          subSection2DescriptionsItem
                                                        }
                                                        .
                                                      </div>
                                                    </div>
                                                  )
                                                )
                                              : null}
                                          </div>
                                        )
                                      )
                                    : null}
                                </div>
                              )
                            )
                          : null}
                      </div>
                    </>
                  )
                )
              : null}
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default PrivacyPolicyComponent;
