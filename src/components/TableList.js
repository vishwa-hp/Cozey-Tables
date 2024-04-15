import React, { useRef, useEffect, useState } from "react";
import TablesData from "../Data/Tables.json";
import TableHeader from "./TablesHeader";
import ColorCard from "./ColorCard";
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import '../App.css';
import '../Table.css';
import { GoArrowRight } from 'react-icons/go';




const headerItems = [
  "Coffee Tables",
  "Side Tables",
  "Media Units",
  "Table Sets",
];

const TableList = () => {

  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      let active = null;
      const headerHeight = 70;

      for (const category in categoryRefs.current) {
        const ref = categoryRefs.current[category];
        const position = ref.getBoundingClientRect();
        if (position.top <= headerHeight && position.bottom >= headerHeight) {
          active = category;
          break;
        }
      }
      setActiveCategory(active);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className='topBar' />
     
      
      <TableHeader items={headerItems} activeCategory={activeCategory} />
      {TablesData.products.map((category) => (
        <div
          key={uuidv4()}
          id={category.category.replace(/\s+/g, "-").toLowerCase()}
          ref={(el) => (categoryRefs.current[category.category] = el)}
          style={{
            marginTop: "-50px",
            paddingTop: "50px",
          }}
        >
          <div className='category topHeader'>{category.category}</div>
          <div className='productContainer'>
            {category.items.map((item) => (
              <div key={uuidv4()} className='productItem'>
                <div className='productImage'>
                  <img
                    src={item.imagePath}
                    alt={item.name}
                    className='image'
                  />
                  <ColorCard name={item.woodType} color={item.woodColor} />
                  <div className="imageTag">
                  {item.isOutdoor && <div className="outdoor-tag"><div className="tag-txt">Outdoor</div></div>}
                  </div>
                </div>
                <div className='productName'>{item.name}</div> 
                <div className='priceContainer'>
                  
                  <span className='productPrice'>
                    ${item.price}
                    {item.financingOption && " or financing"}
                  </span>

                  <span className='divider productPrice'> | </span>
                  {item.discount && (
                    <div className='productDiscount'>
                      {item.discount}
                    </div>
                  )}

                  <div
                    className='productCustomizerContainer'
                    style={{
                      flexBasis: item.discount && "100%",
                    }}
                  >
                    {item.customizable && (
                      <span className='productCustomizer'>
                        Customize  <GoArrowRight />
                      </span>
                    )}
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className='footer'></div>
    </div>
  );
};


export default TableList;