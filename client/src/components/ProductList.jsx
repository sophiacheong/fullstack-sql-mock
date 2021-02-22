import React from 'react';
import Products from './Products';

const ProductList = (props) => {
   return(
    <div className='product-list'>
      {props.list.map((item, index) => (
        <Products item={item} key={index} viewProduct={props.viewProduct}changeForm={props.changeForm} renderedSearch={props.renderedSearch} />
      ))}
    </div>
  )
}

export default ProductList