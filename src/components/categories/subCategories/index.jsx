import React from 'react'
import NavTab from '../tab-link';
import { ProfessionalLicenseText } from './../professional-license/index';

export const  SubCategories = ({subCategories,currentTab,handleClick})=> {

    const onClick = (Category)=>{
        handleClick(Category)
    }

    return subCategories.map((Category, count) => (
        <NavTab
            forceActive={Category.professionalLicense && currentTab=== ProfessionalLicenseText}
            key={Category.id}
            currentTab={currentTab}
            id={Category?.slug}
            name={Category.nameAr}
            onClick={() => onClick(Category)}
        />
));
}
