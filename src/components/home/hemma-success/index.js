import React, { useEffect } from "react";
import Slider from "../../../shared-components/Slider";
import SuccessCard from "./success-card";
import "./index.scss"
import { NavLink } from "react-router-dom";
import Glide from '@glidejs/glide'

const Bullets = ()=> (
  <>
    {[1,2,3,4,5,56,6].map((cat,indexcat) => {
      return(<button className="glide__bullet" data-glide-dir={"="+indexcat}></button>)
   
})}
</>
)


export default function HemmaSuccess() {


  useEffect(()=>{
    const myOptions = {
      type: 'carousel',
      startAt: 1,
      perView: 3,
      focusAt:'center',
      // focusAt:-'center',
      // gap: 20,
      autoplay: 4000,
      // animationTimingFunc: 'ease-in-out',
      animationDuration: 800,
      peek: {
        before: 100,
        after: 100
      },
      // hoverpause: false,
      keyboard: true,
      direction: 'rtl',
      // breakpoints: {

      //   1200: { perView: 2 },
      //   992: { perView: 2 },
      //   768: { perView: 1 }

      // }
    }
    new Glide('.success-glide',myOptions).mount()
  },[])
  return (
    <section id="hemma-success continer py-5" className="hemma-success">
      <header className="mb-5 text-center">
        <h3 className="h3 text-center font-weight-bold main-color mb-2 line-yellow">
          نجاحات مع همة
        </h3>
      </header>
      <div class="glide success-glide">

      <div className="glide__track" data-glide-el="track">
        
      <ul className="glide__slides">
      <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
                  </ul>
        </div>
        </div>
               
      <div className="d-flex-row mt-5">
          <NavLink to="/home/hemma-succes" className="btn-yellow headShake">المزيد من النجاحات</NavLink>
        </div>
    </section>
  );
}


    {/* <Slider options={[{isActive : true},{isActive : false}]} /> 
       <div className="container">
          <div className="slider">
            <div className="success-glide">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides py-2">
                 
                <li className="glide__slide">
                  <SuccessCard />
                  </li>
                  <li className="glide__slide">
                  <SuccessCard />
                  </li>
                  <li className="glide__slide">
                  <SuccessCard />
                  </li>
                  <li className="glide__slide">
                  <SuccessCard />
                  </li>
                </ul>
              </div>
              <div className="glide__arrows" data-glide-el="controls">
                <button className="glide__arrow glide__arrow--left" data-glide-dir="<"><i
                    className="fas fa-chevron-left"></i></button>
                <button className="glide__arrow glide__arrow--right" data-glide-dir=">"><i
                    className="fas fa-chevron-right"></i></button>
              </div>
              <div className="glide__bullets w-100" data-glide-el="controls[nav]">
              <button className="glide__bullet" data-glide-dir="=0"></button>
            <button className="glide__bullet" data-glide-dir="=1"></button>
            <button className="glide__bullet" data-glide-dir="=2"></button>
            <button className="glide__bullet" data-glide-dir="=3"></button>
              </div>
            </div>
          </div>
        </div> 
     <div className="glide glide--rtl glide--carousel glide--swipeable success-glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides py-2">
              <li className="glide__slide glide__slide--clone" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li><li className="glide__slide glide__slide--clone" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li><li className="glide__slide glide__slide--clone" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li><li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide glide__slide--active" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
              <li className="glide__slide" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li>
            <li className="glide__slide glide__slide--clone" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li><li className="glide__slide glide__slide--clone" >
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li><li className="glide__slide glide__slide--clone">
                <div className="sider-items">
                  <div className="quote-icon"><svg className="svg-inline--fa fa-quote-left fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg><i className="fas fa-quote-left"></i> </div>
                  <h4 className="text-danger">أم لجين</h4>
                  <p>دورة مثاليه ولا اروع.. جهد متفانى ومدرب مبدع يبذل كل مابوسعه من أجل ايصال المعلومة للمتدربين ويراعى
                    الفروق الفردية بشكل واضح من خلال أعادته وتلخيصة حتى للنقاط البسيطة الشكر لله أولا ثم للاستاذ ولجميع
                    القائمين عالمنصة</p>
                  <div className="text-muted">
                    <time datetime="2008-02-14 20:00">7:05 PM</time>
                  </div>
                </div>
              </li></ul>
          </div>
          <div className="glide__bullets" data-glide-el="controls[nav]">
            <button className="glide__bullet" data-glide-dir="=0"></button>
            <button className="glide__bullet" data-glide-dir="=1"></button>
            <button className="glide__bullet" data-glide-dir="=2"></button>
            <button className="glide__bullet" data-glide-dir="=3"></button>
            <button className="glide__bullet glide__bullet--active" data-glide-dir="=4"></button>
            <button className="glide__bullet" data-glide-dir="=5"></button>
            <button className="glide__bullet" data-glide-dir="=6"></button>
            <button className="glide__bullet" data-glide-dir="=7"></button>
            <button className="glide__bullet" data-glide-dir="=8"></button>
            <button className="glide__bullet" data-glide-dir="=9"></button>
            <button className="glide__bullet" data-glide-dir="=10"></button>
          </div>
        </div>
      </div> */}
       