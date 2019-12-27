import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  }

  handleClickAsync = () => {
    setTimeout(() => {
      this.setState((prevState) => {
        return { ...prevState,
          count: prevState.count + 1 }
      });
    }, 500);
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <div id='result'>Clicks: {count}</div>
        <button id="btn1" onClick={this.handleClick}>+</button>
        <button id="btn2" onClick={this.handleClickAsync}>+ (async)</button>
      </div>
    )
  }
}

export default Counter;
