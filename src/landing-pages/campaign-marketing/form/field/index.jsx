import React from 'react'
import "./index.scss"

export default function CampaignField({label,col="col-md-6 px-1 mt-4"}) {
    return (
        <div className={col}>
        <div className="campaign-field">
            <div className="span h6">{label}</div>
            <input className="p-2 w-100" placeholder={label} />
        </div>
        </div>
    )
}
