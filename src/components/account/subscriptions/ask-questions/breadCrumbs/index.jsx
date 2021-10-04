import React from 'react'
import { NavLink } from 'react-router-dom'

const breadcrumbs = [{
    name : 'اسال المدرب',
    path:(id)=>`/course/content/${id}/askQuestions/list`,
    condition: ()=> true
},
{
    name : 'اسئلتي',
    path:(id)=>`/course/content/${id}/askQuestions/list/myQuestions`,
    condition: (isMine)=> isMine
},
{
    name : 'جميع الأسئلة',
    path:(id)=>`/course/content/${id}/askQuestions/list/allQeustions`,
    condition: (isMine)=> !isMine
}]

export default function Breadcrumbs({courseId,isMine}) {
    return (
        <div className="mb-4">
            {breadcrumbs.map(breadcrumb =>(
                <>
               {breadcrumb.condition(isMine)&& <> <NavLink className="dark-text" to={breadcrumb.path(courseId)} >{breadcrumb.name}</NavLink> /</> }
                </>
            ))}
        </div>
    )
}
