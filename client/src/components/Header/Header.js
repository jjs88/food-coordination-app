import React from 'react';

const Header = (props) => {



  return (
    <div className="Header">
    {
      props.auth ? 
      <a href="/api/logout">logout</a>:
      <a href="/auth/google">login with google</a>
    }
    </div>
  )
}

export default Header;