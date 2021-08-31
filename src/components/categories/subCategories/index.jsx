import React from 'react'
import NavTab from '../tab-link';

export const  SubCategories = ({subCategories,currentTab,handleClick})=> {

    const onClick = (Category)=>{
        handleClick(Category)
    }

    return subCategories.map((Category, count) => (
        <NavTab
            key={Category.id}
            currentTab={currentTab}
            id={Category?.slug}
            name={Category.nameAr}
            onClick={() => onClick(Category)}
        />
));
}
