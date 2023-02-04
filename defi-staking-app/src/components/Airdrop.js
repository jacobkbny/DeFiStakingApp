import React, { Component } from "react";

class AirDrop extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 3};
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  startTimer () {
    if (this.isStartable()) {
        this.timer = setInterval(this.countDown, 1000)
    }
  }


  isStartable(){
    let stakingB = this.props.stakingBalance;
    let requiredAmount = window.web3.utils.toWei("50", "Ether")
    if (this.timer ===0 && this.state.seconds > 0 && stakingB >= requiredAmount){
        return true;
    }
    return false;
  }


  countDown() {
    // 1. count down one second at a time
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    // 2. stop counting when we hit zero
    if (seconds === 0) {
      clearInterval(this.timer);
      this.props.issueTokens();
    }
  }
  secondsToTime(secs) {
    let hours, seconds, minutes;
    hours = Math.floor(secs / 3600);
    minutes = Math.floor((secs % 3600) / 60);
    seconds = Math.ceil((secs % 3600) % 60);
    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  render() {
    return (
      <div style={{ color: "black" }}>
        {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
        {this.startTimer()}
      </div>
    );
  }
}

export default AirDrop;
