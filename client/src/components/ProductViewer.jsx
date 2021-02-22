import React from 'react';
import axios from 'axios';

export default class ProductViewer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      product: {},
      newBid: 0,
      id: 0,
    }
    this.generateRandomItem = this.generateRandomItem.bind(this);
    this.onChangeBid = this.onChangeBid.bind(this);
    this.onClickBid = this.onClickBid.bind(this);
    this.onUpdateClickBid = this.onUpdateClickBid.bind(this);
  }

  onChangeBid(e) {
    this.setState({
      newBid: e.target.value
    })
  }

  onUpdateClickBid(id) {
    if (Number(this.state.newBid) > Number(this.props.viewProduct.curr_bid)) {
      axios.patch(`/name/products/${id}`, {
        curr_bid: this.state.newBid
      })
        .then(() => {
          axios.get('/name/products')
            .then((results) => {
              var inp = results.data.filter(item => item.id === this.props.viewProduct.id)
              this.props.updateViewProductBid(inp[0].curr_bid)
            })
        })
        .catch((err) => {console.error(err)})
    } else {
      alert('Bid not valid')
    }
  }

  onClickBid(id) {
    if (Number(this.state.newBid) > Number(this.state.product.curr_bid)) {
      axios.patch(`/name/products/${id}`, {
        curr_bid: this.state.newBid
      })
        .then(() => {
          axios.get('/name/products')
            .then((results) => {
              this.setState({
                product: results.data[this.state.id]
              })
            })
        })
        .catch((err) => {console.error(err)})
    } else {
      alert('Bid not valid')
    }
  }

  componentDidMount() {
    this.generateRandomItem();
  }

  generateRandomItem() {
    var ind = Math.floor(Math.random() * this.props.list.length);
    this.setState({
      id: ind
    })
    this.setState({
      product: this.props.list[ind]
    })
  }

  render(){
    if (this.props.searchProducts.length > 0) {
      return (
        <div className = 'product-viewer'>
          {this.props.searchProducts.map((item, index) => (
          <div key={index}>
            <h3>{item.item}</h3>
            <img src={item.image}></img>
            <div> Current bid: ${item.curr_bid} </div>
            <div> Min cost: ${item.min_cost} </div>
            <div> Ends in: {item.ends_in} days </div>
            <div>
              New Bid: <input placeholder="Amount here" onChange={this.onChangeBid} />
              <button onClick={() => {this.onUpdateClickBid(this.props.searchProducts.id)}}>Submit</button>
            </div>
          </div>
          ))}
        </div>
      )
    }
    if (this.props.viewForm > 0) {
      return (
        <div className = 'product-viewer'>
          <h3>{this.props.viewProduct.item}</h3>
          <img src={this.props.viewProduct.image}></img>
          <div> Current bid: ${this.props.viewProduct.curr_bid} </div>
          <div> Min cost: ${this.props.viewProduct.min_cost} </div>
          <div> Ends in: {this.props.viewProduct.ends_in} days </div>
          <div>
            New Bid: <input placeholder="Amount here" onChange={this.onChangeBid} />
            <button onClick={() => {this.onUpdateClickBid(this.props.viewProduct.id)}}>Submit</button>
          </div>
        </div>
      )
    } else {
      return(
        <div className = 'product-viewer'>
          <h3>{this.state.product.item}</h3>
          <img src={this.state.product.image}></img>
          <div> Current bid: ${this.state.product.curr_bid} </div>
          <div> Min cost: ${this.state.product.min_cost} </div>
          <div> Ends in: {this.state.product.ends_in} days </div>
          <div>
            New Bid: <input placeholder="Amount here" onChange={this.onChangeBid} />
            <button onClick={() => {this.onClickBid(this.state.product.id)}}>Submit</button>
          </div>
        </div>
      )
    }
  }
}