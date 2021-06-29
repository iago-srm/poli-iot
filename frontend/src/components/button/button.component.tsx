import React from 'react';

interface IButtonProps{
  loading: boolean;
  buttonStyles?: any;
}

export const Button: React.FC<IButtonProps> = ({loading, buttonStyles, children}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {loading ? 
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      :
      <button className={buttonStyles ? buttonStyles.primary : "btn btn-primary"} type="submit">{children}</button>
      }
    </div>
  )
};