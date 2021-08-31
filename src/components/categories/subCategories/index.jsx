import React from 'react'
import NavTab from '../tab-link';

export const  SubCategories = ({subCategories,currentTab,handleClick})=> {

    const onClick = (Category)=>{
        debugger
        handleClick(Category)
    }

    console.log({__currentTab : currentTab});
    return subCategories.map((Category, count) => (
        <NavTab
            key={Category.id}
            currentTab={currentTab}
            id={Category?.nameAr}
            name={Category.nameAr}
            onClick={() => onClick(Category)}
        />
));
}
