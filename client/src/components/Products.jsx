import React from 'react';

const Products = (props) => {
   return(
    <div className='product-list-entry'>
      <img src={props.item.image}></img>
      {props.item.item}
      Min Cost: ${props.item.min_cost}
      Current Bid: ${props.item.curr_bid}
      Ends in:{props.item.ends_in}
    </div>
  )
}

export default Products