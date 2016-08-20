import React from 'react'

const HTML = `
<div>
  <h2>The sorrows of our parents</h2>
  <p>bla bla <strong>yada</strong> woo!</p>
  <ul>
    <li>foo</li>
    <li>bar</li>
    <li>baz<strong>booo</strong> bin!</li>
  </ul>
  <p>moo wee haha!</p>
  <p>gaa GAAH!</p>
</div>
`

let Battle = React.createClass({
  componentDidMount(){
    this.applySelectors()
  },
  componentDidUpdate(){
    this.applySelectors()
  },
  applySelectors(){
    let battle = this.props.battle
    if (battle && battle.loaded){
      ['plr1','plr2','plr3'].forEach((plrClass)=>{
        let sel = battle[plrClass+'sel']
        if (sel){
          this.refs.html.querySelectorAll('.'+plrClass).forEach(el=>el.classList.remove(plrClass))
          try{
            let matches = this.refs.html.querySelectorAll(sel)
            matches.forEach(el=>el.classList.add(plrClass))
            count[n] = matches.length
            console.log("applied",sel,"for",plrClass,this.refs.html.querySelectorAll(sel))
          } catch(e) {
            console.log("Whaaa, faulty selectors?!",sel)
            console.log(e)
          }          
        } else {
          console.log("No selector for",plrClass)
        }
      })
    }
  },
  setSelector(e) {
    e.preventDefault()
    let sel = this.refs.sel.value
    if (sel){
      try {
        this.refs.html.querySelectorAll(sel);
        this.props.setSelector(sel)
      } catch(e) {
        console.log("Oh no!",e)
      }      
    }
  },
  render() {
    let battle = this.props.battle
    let name = this.props.name
    if (!battle.loaded){
      return <div>Loading...</div>
    }
    return <div className="boxes">
      <div>
        <h4>Code</h4>
        <pre>{HTML}</pre>
      </div>
      <div>
        <h4>Output</h4>
        <div className="target" ref="html" dangerouslySetInnerHTML={{__html:HTML}}/>
      </div>
      <div>
        <h4>Players</h4>
        <div className="names">
          {battle.plr1 && <span className="plr1">{battle.plr1 + (name === battle.plr1 ? ' *' : '')}</span>}
          {battle.plr2 && <span className="plr2">{battle.plr2 + (name === battle.plr2 ? ' *' : '')}</span>}
          {battle.plr3 && <span className="plr3">{battle.plr3 + (name === battle.plr3 ? ' *' : '')}</span>}
        </div>
      </div>
      {(name === battle.plr1 || name === battle.plr2 || name === battle.plr3) && <div>
        <h4>Set selector</h4>
        <form onSubmit={this.setSelector}>
          <input ref="sel" required/>
          <button type="submit">set</button>
        </form>
      </div>}
    </div>
  }
});

export default Battle
