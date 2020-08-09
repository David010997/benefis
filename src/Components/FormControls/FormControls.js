import React from 'react'
import { Checkbox } from 'material-ui'
import { spacing } from 'material-ui/styles';
export const RenderField = ({ input,type,label, meta: { touched, error, warning }, ...props }) => {
  return (
    <>
      <input className={touched&&error?"register-error form-control form-control-auth":"form-control form-control-auth"} type={type} placeholder={label} {...input} />
      {touched && error ? <span className=" validation-error-register">{error}<i className="fa fa-exclamation-circle warning-icon" aria-hidden="true"></i>
      </span> : undefined}
      </>
  )
}
export const renderCheckbox = ({ input,type, label,meta: { touched, error, warning } }) => (
   <label htmlFor="terms" className="terms-label">
    <input id="terms" type={type} placeholder={label} {...input} className={touched&&error?"terms-check  terms-check-more":"terms-check"}/>
    <span className={touched&&error?"terms-desc  terms-desc-more":"terms-desc"}>I agree with all Terms of Service</span>
  </label>
      // {touched&&error&&<p className="check-error">{error}<i className="fa fa-exclamation-circle warning-icon" aria-hidden="true"></i></p>}

)
export const RenderFieldForEditName = ({ input, label,meta: { touched, error, warning },...props }) => {
  
  return (
  <>
  {error&&touched? <p className="edit-error-text">{error}</p>:null}
   
       <input className={error&&touched?"edit-error":"edit-field"} {...input} {...props} value={props.val}/>

  </>
  )
}

export const RenderFieldForEditEmail = ({ input, meta: { touched, error, warning }, ...props }) => {
  
  return (
    <>
        <p className="edit-error-text">{error&&touched?error:null}</p>
       <input className={error&&touched?"edit-error":"edit-field"} {...input} {...props} value={props.val}/>

    </>
  )
}
export const RenderFieldForEditPhone = ({ input, meta: { touched, error, warning }, ...props }) => {
  
  return (
    < >
         <p className="edit-error-text">{error&&touched?error:null}</p>
       <input className={error&&touched?"edit-error":"edit-field"} {...input} {...props} value={props.val}/>

    </>
  )
}
export const RenderFieldForEditPassword = ({ input, meta: { touched, error, warning }, ...props }) => {
  
  return (
    < >
        <p className="edit-error-text">{error&&touched?error:null}</p>
       <input className={error&&touched?"edit-error":"edit-field"} {...input} {...props} value={props.val}/>
     
    </>
  )
}
export const RenderFieldForPayment = ({ input,label,type, meta: { touched, error, warning }, ...props }) => {
  return (
    <>
     
    <input className={touched && error?"form-control form-control-more":"form-control"} {...input} placeholder={label} maxLength="30" type={type}/>
    <div className="b"> {touched && error ? <span className="validation-error-bookstar">{error}<i className="fa fa-exclamation-circle warning-icon-bookstar" aria-hidden="true"></i>
      </span> : null}</div>
    </>

  )
}

export const RenderFieldForTextarea = ({ input,label,type, meta: { touched, error, warning }, ...props }) => {
  return (
   <>
      <textarea className={touched && error?"form-control form-control-more":"form-control"} placeholder={label}  {...input} />      
      <div className="err"> {touched && error ? <span className="validation-error-bookstar">{error}<i className="fa fa-exclamation-circle warning-icon-bookstar" aria-hidden="true"></i>
      </span> : null}</div>
   
      </> 
  

  )
}
export const RenderFieldForStarVal= ({ input,val,label, meta: { touched, error, warning }, type}) => {
  
  return (
   <>   
      <input className={touched && error?"form-control form-control-more":"form-control"} placeholder={label}  type={type} {...input}/>
      <div className="err">{touched && error ? <span className="validation-error-edit">{error}<i className="fa fa-exclamation-circle warning-icon-edit" aria-hidden="true"></i>
      </span> : undefined}</div>
      </>

  )
}
export const RenderFieldForStarRegister= ({ input,val,label, meta: { touched, error, warning }, type}) => {
  
  return (
   <>   
      <input className={touched && error?"form-control form-control-verify form-control-more":"form-control form-control-verify"} placeholder={label}  type={type} {...input}/>
      <div className="err">{touched && error ? <span className="validation-error-edit">{error}<i className="fa fa-exclamation-circle warning-icon-edit" aria-hidden="true"></i>
      </span> : undefined}</div>
      </>

  )
}
export const RenderFieldForUserPass= ({ input,val,label, meta: { touched, error, warning }, type,anyTouched}) => {
  return (
   <>   
      <input {...input} className={touched && error?"form-control form-control-more":"form-control"}  placeholder={label}  type={type}  />
      <div className="err">{touched && error ? <span className="validation-error-edit">{error}<i className="fa fa-exclamation-circle warning-icon-edit" aria-hidden="true"></i>
      </span> : undefined}</div>
      </>

  )
}


export const renderFieldRadio = ({ input, label, type, checked }) => (
  <>
    <input {...input} type={type} checked={checked} />
   
  </>
);