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
  let {plr1,plr2,plr3,plr1sel,plr2sel,plr3sel} = battle
  let {name,selector} = action
  switch(action.type){
    case 'ENTER': return plr1 === name || plr2 === name || plr3 === name ? battle : Object.assign({},battle,{
      plr1: plr1 || name,
      plr2: plr2 || plr1 && name || '',
      plr3: plr3 || plr2 && name || ''
    })
    case 'SETSELECTOR': return Object.assign({},battle,{
      plr1sel: (name === plr1 ? selector : plr1sel || ''),
      plr2sel: (name === plr2 ? selector : plr2sel || ''),
      plr3sel: (name === plr3 ? selector : plr3sel || '')
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
    let loaded = false;
    firebase.database().ref('rooms/' + room).on('value',(snapshot)=>{
      this.setState({battle:Object.assign({},snapshot.val(),{loaded})})
      loaded = true;
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