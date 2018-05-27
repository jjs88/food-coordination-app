import React from 'react';
import Place from '../../components/Place/Place';

const places = (props) => {


  const renderPlaces = () => {
    if(props.places.length === 0) return null;
    return props.places.map((place, idx) => <Place key={idx} place={place} clickGoing={props.clickGoing}/>)
  }

  return (
    <div className="Places">
      {renderPlaces()}
    </div>
  )
}

export default places;