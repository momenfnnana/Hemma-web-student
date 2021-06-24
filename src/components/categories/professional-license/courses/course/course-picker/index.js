import React from 'react'

export default function CourseTabPicker({id , selectedId,onClick , title="دورة الرخصة الشاملة"}) {
    const tabClass = id === selectedId ? ' label-course-btn  with-bg' : 'label-course-btn'
    return (
        <a
        className={tabClass}
        data-courses="full-licences-course-one"
        onClick={()=> onClick(id)}
      >
        {title}
      </a>
    )
}
