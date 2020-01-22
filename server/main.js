import { Meteor } from 'meteor/meteor';
import Data from '/imports/api/data';

function insertDefault() {
  console.log('reset')
  Data.insert({
    nextDeployment: "vCredit",
    ddate: new Date().valueOf()+(23*60*60*1000),
    blockers: {
      "IOS": 0,
      "ANDROID": 0,
      "FULLSTACK": 0
    }
  })
}

Meteor.methods({
  "setData": (data) => {
    Data.update({}, data);
  }
})

Meteor.startup(() => {
  if (Data.find().count() === 0) {
    insertDefault();
  }
});
