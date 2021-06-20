import React from "react";

export default function SuccessCard({isActive = false}) {
  const activeClass=  !isActive ? 'glide__slide--active' : ''
  return (
    <li class={`glide__slide glide__slide--clone mx-2 ${activeClass}`}>
      <div class="sider-items" style={{ width: "335px" }}>
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <h4 class="text-danger">أم لجين</h4>
        <p>
          دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل
          ايصال المعلومة للمتدربين ويراعى الفروق الفردية بشكل واضح من خلال
          أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
          القائمين عالمنصة
        </p>
        <div class="text-muted">
          <time datetime="2008-02-14 20:00">7:05 PM</time>
        </div>
      </div>
    </li>
  );
}
