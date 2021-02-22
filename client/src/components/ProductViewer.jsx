import React from 'react';

export default class ProductViewer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      product: {}
    }
    this.generateRandomItem = this.generateRandomItem.bind(this);
  }

  componentDidMount() {
    this.generateRandomItem();
  }

  generateRandomItem() {
    var ind = Math.floor(Math.random() * this.props.list.length);
    this.setState({
      product: this.props.list[ind]
    }, () => console.log(this.state.product))
  }

  render(){
    return(
      <div className = 'product-viewer'>
        <h3>{this.state.product.item}</h3>
        <img src={this.state.product.image}></img>
        <div>
          Current bid: ${this.state.product.curr_bid}
          Min cost: ${this.state.product.min_cost}
          Ends in: {this.state.product.ends_in} days
        </div>
      </div>
    )
  }
}