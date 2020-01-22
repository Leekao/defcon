import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Data from '../api/data';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Editor extends Component {
  state = {}

  constructor() {
    super()
    this.state = {}
  }

  depChange(event) {
    this.setState({nextDeployment: event.target.value});
  }

  render() {
    if (!this.props.data) 
      return <div> Loading... </div>
    if (Object.keys(this.state).length === 0) {
      Meteor.defer(() => {
        this.state = this.setState(this.props.data)
      })
      return <div> Loading... </div>
    }
    console.log(this.props)
    const {blockers} = this.state
    return (
      <div className="editor">
        <div 
          className="close" 
          onClick={() => this.props.sv()}>X
        </div>
        <form onSubmit= {(e) => {
          const {ddate, ...args} = this.state
          Meteor.call('setData', {
            ddate: ddate.valueOf(),
            ...args
          } )
          e.preventDefault()
        }}>
          <div>
            <span>What?:</span>
            <input type="text" 
            value={this.state.nextDeployment}
            onChange={(e) => {
              this.setState({nextDeployment: e.target.value});
            }} 
            />
          </div>
          <div>
            <span>When?</span>
            <DatePicker
            selected={this.state.ddate}
            showTimeSelect
            onChange={(date) => {
              this.setState({ ddate: date })
            }}
            />
          </div>
          <div>
            <span>Blockers?</span>
          </div>
          <div>
            <span>IOS:</span>
            <input type="text" 
            className='blocker'
            value={blockers.IOS}
            onChange={(e) => {
              blockers.IOS = parseInt(e.target.value)
              this.setState({blockers})
            }} 
            />
          </div>
          <div>
            <span>Android:</span>
            <input type="text" 
            className='blocker'
            value={blockers.ANDROID}
            onChange={(e) => {
              blockers.ANDROID = parseInt(e.target.value)
              this.setState({blockers})
            }} 
            />
          </div>
          <div>
            <span>Fullstack:</span>
            <input type="text" 
            className='blocker'
            value={blockers.FULLSTACK}
            onChange={(e) => {
              blockers.FULLSTACK = parseInt(e.target.value)
              this.setState({blockers})
            }} 
            />
          </div>
          <input type='submit' value='Save'/>
        </form>
      </div>
    );
  }
}

export default EditorContainer = withTracker(() => {
  return {
    data: Data.findOne(),
  };
})(Editor);
