import React from 'react';
import ProductList from './ProductList';
import ProductViewer from './ProductViewer';
import Search from './Search';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      productList: [],
      viewForm: 0,
      viewProduct: {},
      search: '',
      searchProducts: []
    }
    this.getAllProducts = this.getAllProducts.bind(this);
    this.onClickChangeForm = this.onClickChangeForm.bind(this);
    this.updateViewProductBid = this.updateViewProductBid.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  onClickSearch() {
    var newProd = this.state.productList.filter((items) => items.item.includes(this.state.search))
    this.setState({
      searchProducts: newProd
    })
  }

  onChangeSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  updateViewProductBid(input) {
    var obj = this.state.viewProduct;
    obj.curr_bid = input
    this.setState({
      viewProduct: obj
    })
  }

  onClickChangeForm(input) {
    this.setState({
      viewProduct: input,
      viewForm: this.state.viewForm + 1
    })
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    axios.get('/name/products')
      .then((results) => {
        this.setState({
          productList: results.data
        }, () => {console.log(this.state.productList)})
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
            <Search changeSearch={this.onChangeSearch} clickSearch={this.onClickSearch} />
          </div>
        </nav>
        <div className="row main-container">
          <div className="col-md-7 product-viewer-container">
          {this.state.productList.length > 0 ? <ProductViewer list={this.state.productList} getAllProducts={this.getAllProducts} viewForm={this.state.viewForm} viewProduct={this.state.viewProduct} updateViewProductBid={this.updateViewProductBid} searchProducts={this.state.searchProducts}/> : null}
          </div>
          <div className="col-md-5 product-list-container">
            <ProductList list={this.state.productList} viewProduct={this.state.viewProduct} changeForm={this.onClickChangeForm}/>
          </div>
        </div>
      </div>
    )
  }
}