import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Data from '../api/data';

const getColor = (b) => {
  return (b > 2)
    ? 'red'
    : (b > 0)
      ? 'yellow'
      : 'green'
}

class Blockers extends Component {
  render() {
    console.log(this.props.data)
    if (!this.props.data) return <div> Loading... </div>
    const {blockers} = this.props.data
    console.log(blockers)
    const cls = [
      getColor(blockers.FULLSTACK),
      getColor(blockers.ANDROID),
      getColor(blockers.IOS)      
    ]
    console.log(cls)
    return (
      <table className="table">
        <thead>
          <tr className="blockers_head">
            <td className={cls[0]}>Fullstack</td>
            <td className={cls[1]}>Android</td>
            <td className={cls[2]}>IOS</td>
          </tr>
        </thead>
        <tbody>
          <tr className="blockers_row">
            <td className={cls[0]}>{blockers.FULLSTACK}</td>
            <td className={cls[1]}>{blockers.ANDROID}</td>
            <td className={cls[2]}>{blockers.IOS}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default BlockersContainer = withTracker(() => {
  return {
    data: Data.findOne(),
  };
})(Blockers);
