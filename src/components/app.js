import React, { Component } from 'react';

import Battle from './battle'
import Hall from './hall'

import firebase from 'firebase/app'
import 'firebase/database'

firebase.initializeApp({
  apiKey: "AIzaSyByP1SpOlIvF8jMMWpJMF6gNnYMY-Px67s",
  authDomain: "cssbattle.firebaseapp.com",
  databaseURL: "https://cssbattle.firebaseio.com",
  storageBucket: "cssbattle.appspot.com",
});

let reducer = function(battle,action){
  battle = battle || {}
  switch(action.type){
    case 'ENTER': return Object.assign({},battle,{
      plr1: battle.plr1 || action.name,
      plr2: battle.plr2 || battle.plr1 && action.name || '',
      plr3: battle.plr3 || battle.plr2 && action.name || ''
    })
    case 'SETSELECTOR': return Object.assign({},battle,{
      plr1sel: (action.name === battle.plr1 ? action.selector : battle.plr1sel || ''),
      plr2sel: (action.name === battle.plr2 ? action.selector : battle.plr2sel || ''),
      plr3sel: (action.name === battle.plr3 ? action.selector : battle.plr3sel || '')
    })
  }
}

const App = React.createClass({
  getInitialState() { return {}; },
  setSelector(selector){
    let {name,room} = this.state
    firebase.database().ref('rooms/' + room).transaction(current=>{
      return reducer(current,{name,selector,type:'SETSELECTOR'})
    })
  },
  enter(room,name){
    this.setState({room,name})
    firebase.database().ref('rooms/' + room).on('value',(snapshot)=>{
      this.setState({battle:snapshot.val()})
    })
    firebase.database().ref('rooms/' + room).transaction(current=>{
      return reducer(current,{name,type:'ENTER'})
    })
  },
  render() {
    let {battle,name,room} = this.state, {enter,setSelector} = this;
    return battle ? <Battle {...{battle,name,room,setSelector}}/> : <Hall {...{enter}} />
  }
})

export default App