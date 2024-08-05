import React, { useState } from 'react';
import { itemData } from '../../data';

const ItemsDisplay = () => {
  const [displayItem, setDisplayItem] = useState(itemData);

  return (
    <div className='itemHeader'>
      <h3>What's on your mind?</h3>
      <div className='itemSection'>
        {displayItem.map((item, index) => (
          <div className='gallery' key={item.id || index}>
            <img src={item.item_img} alt={item.item_img} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsDisplay;
