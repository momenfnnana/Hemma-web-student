import Glide from '@glidejs/glide'
import React ,{ useState, useEffect } from 'react'

export const Carousel = ({element = 'glide', options, children}) => {
    const [slider] = useState(new Glide(`.${element}`, options))
    useEffect(() => {

        if(!element) return
       slider.mount()

      // subscribe to an event 
      slider.on('run.before', (event) => {
          // ... do something cool here
        })

      // cleanup when unmounting component
      return () => slider.destroy()
    }, [element])

   return (
       <div className={element}>
           <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                    {children.map((slide, index) => {
                            return React.cloneElement(slide, {
                                key: index,
                                className: `${slide.props.className} glide__slide`
                            })
                        })
                    }
                </ul>
           </div>
      </div>
  )
}