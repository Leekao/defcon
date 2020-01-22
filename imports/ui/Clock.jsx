import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Data from '../api/data';

let on = false

let globalTicker = false

class Clock extends Component {
  render() {
    let ticker;
    const tick = (ddate) => {
      if (globalTicker) Meteor.clearInterval(globalTicker)
      globalTicker = Meteor.setInterval(() => {
        const now = moment(new Date())
        const ts = countdown(null, ddate, null,
          countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
        )
        if (ts.days > 0) {
          ts.hours += ts.days*24
        }
        const e = document.querySelector('.tiktok')
        e.className = 'tiktok '
        e.className+= (ts.hours < 3)
          ? 'red'
          : (ts.hours > 24)
            ? 'green'
            : 'yellow'
        e.innerHTML = `${ts.hours}:${ts.minutes}:${ts.seconds}`
      }, 1000)
    }
    if (!this.props.data) return <div> Loading... </div>
    const ddate = moment(this.props.data.ddate)
    tick(ddate) 
    return (
      <div className="clock" onClick={this.props.sv}>
        <h2>
          <span className="text">Next Deployment </span>
          <span className="dep">{this.props.data.nextDeployment} </span>
        </h2>
        <h1 className="tiktok">{ddate.fromNow()}</h1>
      </div>
    );
  }
}

export default ClockContainer = withTracker(() => {
  return {
    data: Data.findOne(),
  };
})(Clock);
