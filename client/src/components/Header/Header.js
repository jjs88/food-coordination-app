import React from 'react';

const Header = (props) => {

  return (
    <div className="Header">
    {
      props.auth ? 
      <a className="Header__link" href="/api/logout">logout</a>:
      <a className="Header__link" href="/auth/google">login with google</a>
    }
    </div>
  )
}

export default Header;