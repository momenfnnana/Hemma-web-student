import React from 'react'
import "./index.scss"
import  classnames  from 'classnames';


const numberValidationError = 'الرقم يجب أن يبدأب 05 ومن 10 خانات'

export default function CampaignField({label,col="col-md-6 px-1 mt-4",values,onChange = ()=>{},name,errors,setErrors,defaultError,required}) {


    const validate = (value)=>{
          return /^05\d{8}$/.test(value);
    }

    
    const handleChange = ({target:{value}})=>{
        const isValid = validate(value)
        setErrors({...errors,[name]: !isValid && numberValidationError})
        onChange(name,value)
    }
   

    const error = errors?.[name] || defaultError
    const baseClassName = 'p-2 w-100'
    const dangerBorder = 'border-danger'

    const className = classnames(baseClassName,{[dangerBorder]:!!error})
    const value = values?.[name]

    return (
        <div className={col}>
        <div className="campaign-field position-relative">
            <div className="span h6">{label}</div>
            <input required={required} className={className} value={value} onInvalid={(e)=>{setErrors({...errors, [name]: numberValidationError})}}  placeholder={label} type="number" onChange={handleChange} pattern={/^05\d{8}$/} />
            {error && <small className="text-danger font-sm position-absolute" style={{bottom:'-30%',right:'0'}}>{error}</small>}
        </div>
        </div>
    )
}
