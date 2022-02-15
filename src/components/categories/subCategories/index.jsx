import React from "react";
import NavTab from "../tab-link";

export const SubCategories = ({ subCategories, currentTab, handleClick }) => {
  const onClick = (Category) => {
    handleClick(Category);
  };

  return subCategories.map((Category, count) => {
    const validateRenderCategory = () => {
      return Category?.courses?.length ||
        Category?.categoryGroups?.length ||
        Category?.categorySuccesses?.length ||
        Category?.childCatgories?.length ||
        Category?.freeLectures?.length
        ? true
        : false;
    };
    return validateRenderCategory() ? (
      <NavTab
        forceActive={currentTab === Category?.id}
        key={Category.id}
        currentTab={currentTab}
        id={Category?.slug}
        name={Category.nameAr}
        onClick={() => onClick(Category)}
      />
    ) : null;
  });
};
