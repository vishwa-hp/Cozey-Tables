import React from "react";
import '../App.css';
import '../Table.css';


const ColorCard = ({ name, color }) => {
  
  return (
    <div className='container'>
      <span className="name">{name}</span>
      <div
        className="colorCircle"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};


export default ColorCard;