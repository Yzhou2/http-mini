import React, { Component } from 'react';
import './styles/App.css';
import {getTroops} from './services/getTroops';
import {postTroop} from './services/postTroop';
import {getEnemies} from './services/enemies';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      armiesArray: [],
      defensesArray: [],
      newRecruit: ''

    }
    this.seeEnemies = this.seeEnemies.bind(this)
    // this.recruitTroop=this.recruitTroop.bind(this)
    // this.handleInput = this.handleInput.bind(this)
    this.callTroops = this.callTroops.bind(this)
  }

  seeEnemies() {
    // console.log('clicked');
    getEnemies().then(apiData => {
      this.setState({
        armiesArray: apiData
      })
    })
  }

  callTroops() {
    getTroops().then(response => {
      this.setState({
        defensesArray: response
      })
    })
  }

  componentDidMount() {
    this.callTroops();
  }

//   recruitTroop(event, recruit) {
//     event.preventDefault();
//
//     if (recruit) {
//       postTroop(recruit).then(() => {
//         this.callTroops();
//         this.setState({
//           newRecruit:''
//         })
//       })
//   }
// }

  handleInput(event) {
    this.setState({
      newRecruit: event.target.value
    })
  }


  transformMinion() {
  }

  slayLeader() {
  }


  render() {
    const armies = this.state.armiesArray.map((army, armyIndex) => (
      <ul className='army' key={armyIndex}>
        <h3>Enemy Army #{army.id}: {army.name}</h3>
        <div className='leader'>{army.leader}</div>
        <ul className='minions'>
          {army.minions.map((minion, minionIndex) => (
            <li key={minionIndex} className="minion">{minion.type}</li>
            ))}
          </ul>
      </ul>
    ))
    //
    const troops = this.state.defensesArray.forEach((troop, troopIndex) => {
      // return <li className='troop' key={ troopIndex }>{troop.recruit}</li>
      console.log( troop )
    })

    const message = this.state && this.state.armiesArray.length < 1 ? "ALL CLEAR" : "";

    return (
      <div className="App">

        {/* Main Defenses */}
        <div className="App-header">
          <h1>Enemies at our gate!</h1>
          <h2>Prepare our defenses!</h2>
          <div className="defenses">
            <div className="defense" id="sentry" onClick={this.seeEnemies}>Sentry<span className="instructions">Click here to see approaching enemies!</span></div>
            <div className="defense" id="captain">Captain<span className="instructions">Fill out Request Form below to recruit new troop!</span></div>
            <div className="defense" id="wizard">Wizard<span className="instructions">Click directly on a minion to cast a spell!</span></div>
            <div className="defense" id="ballista">Ballista<span className="instructions">Blast enemy leader to disperse army!</span></div>
          </div>
        </div>


        {/* Reinforcements */}
        <div className="reinforcements">
          <form type="submit">
            New Recruit Request Form:
            <input id="paperwork" placeholder="Please indicate requested recruit"/>
            <button >Enlist!</button>
          </form>

          <div id="wall">
            <span></span><span id="gate"></span><span></span>
          </div>
        </div>

        <ul className="troops">
          {troops}
        </ul>

        <h1 id="message">{message}</h1>

        {/* Enemy Armies */}
        <div className="enemies">
        {armies}
        </div>
      </div>
    );
  }
}

export default App;
