import React from 'react';
import axios from 'axios';

export default class ProductViewer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      product: {},
      newBid: 0,
      id: 0
    }
    this.generateRandomItem = this.generateRandomItem.bind(this);
    this.onChangeBid = this.onChangeBid.bind(this);
    this.onClickBid = this.onClickBid.bind(this);
  }

  onChangeBid(e) {
    this.setState({
      newBid: e.target.value
    })
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