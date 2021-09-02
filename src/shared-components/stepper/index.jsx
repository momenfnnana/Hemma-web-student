import React from 'react'
import "./index.scss"


export default function Stepper({steps = [{active: true,name :'first'},{active: false,name :'second'}]}) {
    return (
        <div className="stepper">
            <div className="stepper-back-line"></div>
            {
                steps.map(step =>(
                    <div className="stepper-ball">
                        
                    </div>
                ))
            }
        </div>
    )
}
