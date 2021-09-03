import React from 'react'
import "./index.scss"

export default function SuccessHeader() {
    return (
        <div class="success-banner-image overlay-light">
            <div className="main-color-shadow">

            </div>
        <div class="banner-info pt-5 overflow-hidden">
          <div class="container">
            <div class="text-white text-left">
              <h2 class="h2 m-0 mb-3 animated bounceInUp">
                <span class="d-block">نجاحات مع همة</span>
              </h2>
              <h6 class="font-size-13 m-0 lighter-text animated bounceInDown">
                {/*<span class="d-block mb-2">هو ببساطه نص شكلى (بمعنى ان الغايه هى الشكل وليس المحتوى)</span>*/}
                {/*<span class="d-block mb-2">وبيستخدم فى صناعات المطابع ودور النشر. كان لوريم ابيسوم ولايزال</span>*/}
                <span className="font-size-14 d-block mb-2">الناجح يشارك الآخرين نجاحة و يلهمهم ، قد تكون أنت مُلهمنا القادم.</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    )
}
