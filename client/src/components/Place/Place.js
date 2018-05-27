import React from 'react';

const place = (props) => {
  const { image_url, name, rating, users } = props.place;

  const renderPeople = () => {
    return (
      users.map((user, idx) => {
        const userDisplay = idx === users.length-1 ? user.displayName: user.displayName + ',';
        return <div className="person" key={idx}>{userDisplay}</div>
      })
    )
  }

  return (
    <div className="Place">
      <img className="Place__img" src={image_url}/>
      <div className="Place--col">
        <div className="header-flex">
          <span className="Place__name">{name}</span>
          <button onClick={() => props.clickGoing(name)} className="going-btn">
          going <span>{props.place.users.length}</span>
          </button>
        </div>
        <div className="Place__rating">
          <span className="rating">{rating}</span>
          <span className="fas fa-star"></span>
        </div>
        <div className="people">
          {renderPeople()}
        </div>
      </div>
    </div>
  )
}

export default place;