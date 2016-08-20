import React from 'react'

let Hall = React.createClass({
  enter(e){
    e.preventDefault()
    let room = this.refs.room.value
    let name = this.refs.name.value
    if (room && name){
      this.props.enter(room,name)
    }
  },
  render(){
    return <div>
      <h4>Enter the arena</h4>
      <form onSubmit={this.enter}>
        Enter room <input ref="room" required/> with name <input ref="name" required/>.
        <button type="submit">Go!</button>
      </form>
    </div>
  }
})

export default Hall