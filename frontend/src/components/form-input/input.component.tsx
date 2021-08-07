import React from "react";

interface IInput {
  name: string;
  register?: any;
  errors?: any;
  styles?: {
    readonly [key: string]: string;
  }
  placeholder?: string;
  inputType?: "input" | "textarea";
  type?: string;
}

export function Input({ register, name, errors, styles, inputType, ...rest }: IInput) {
  const className = `${styles.input} ${errors[name] && styles.inputError}`;
  return (
    <>
      {!inputType || inputType==="input" ? 
      <input {...register(name)} {...rest} className={className}/>
    : <textarea {...register(name)} {...rest} className={className}/>} 
    <div className={styles.errorMessageContainer}>{<p>{errors[name]?.message}</p>}</div>
    </>  
  )
}
