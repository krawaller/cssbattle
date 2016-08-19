import React from 'react'

let Hall = React.createClass({
  enter(){
    let room = this.refs.room.value
    let name = this.refs.name.value
    this.props.enter(room,name)
  },
  render(){
    return <div>
      <h4>Enter the arena</h4>
      <div>
        Enter room <input ref="room" required/> with name <input ref="name" required/>.
        <button onClick={this.enter}>Go!</button>
      </div>
    </div>
  }
})

export default Hall