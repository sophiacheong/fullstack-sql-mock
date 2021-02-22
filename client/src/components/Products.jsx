import React from 'react';

const Products = (props) => {
   return(
    <div className='product-list-entry' onClick={() => {
      props.changeForm(props.item);
      props.renderedSearch();
    }}>
      <img src={props.item.image}></img>
      <h4>{props.item.item}</h4>
      Min Cost: ${props.item.min_cost}
      Current Bid: ${props.item.curr_bid}
      Ends in:{props.item.ends_in}
    </div>
  )
}

export default Products