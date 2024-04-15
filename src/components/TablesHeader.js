import React, { useState, useEffect } from "react";
import '../App.css';

const ProductsHeader = ({ items, activeCategory }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // State to track active link

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = 70;
      setIsSticky(scrollPosition > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = (item) => {
    setActiveLink(item); // Update active link state
  };

  return (
    <div className={`topHeader ${isSticky ? 'sticky' : ''}`}>
      <h1 className='title'>Tables</h1>
      <span className='subText'>A perfect pairing to your sofa.</span>
      <div className={`fixedheader ${isSticky ? 'sticky' : ''}`}>
        <div className= 'header'>
          <div className='headerText'>
            {items.map((item) => (
              <a
              className={`link ${activeLink === item ? 'active' : ''}`} // Apply active class conditionally
              href={`#${item.replace(/\s+/g, "-").toLowerCase()}`}
              key={item}
              onClick={() => handleClick(item)} // Handle click event
            >

                <span>{item}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
