import React from 'react';
import ProductList from './ProductList';
import ProductViewer from './ProductViewer';
import Search from './Search';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      productList: []
    }
    this.getAllProducts = this.getAllProducts.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    axios.get('/name/products')
      .then((results) => {
        this.setState({
          productList: results.data
        })
      })
      .catch((err) => {console.error(err)})
  }

  render(){
    return(
      <div>
        <div>
          <h1>EBID</h1>
          <h3>The jankiest ebay rip-off you'll ever see (probably)</h3>
        </div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search />
          </div>
        </nav>
        <div className="row main-container">
          <div className="col-md-7 product-viewer-container">
          {this.state.productList.length > 0 ? <ProductViewer list={this.state.productList} /> : null}
          </div>
          <div className="col-md-5 product-list-container">
            <ProductList list={this.state.productList} />
          </div>
        </div>
      </div>
    )
  }
}