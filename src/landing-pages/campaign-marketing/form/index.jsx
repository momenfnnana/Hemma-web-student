import React from 'react'
import CampaignField from './field/index';

const numbersStringEnum = {
    0 : 'الاول',
    1 : 'الثاني',
    2 : 'الثالث',
    3 : 'الرابع',
    4 : 'الخامس',
}

const recieversLength = 5
const recievers = new Array(recieversLength).fill(1).map((elem,index) => ({title:numbersStringEnum?.[index]}))

export default function CampaignForm() {
    return (
        <div className="mt-4">
            <span className="h3 gheed-black-color font-weight-600">
            يمكنك دعوة خمسة من أصدقائك للاشتراك بدورات منصة
            </span>
            <CampaignField label="رقم جوال المرسل" />

            <div className="mt-4 w-100 row m-0">
                {recievers.map((rec,index) =>(
                    <CampaignField label={`رقم جوال المرسل ${rec.title}`} classkey={index} />
                ))}
                <button className="btn gheed-purple-bg p-2 color-white col-md-6 px-1 mt-4 h-fit mt-md-auto mt-3">أرسل الدعوة</button>
            </div>
        </div>
    )
}
