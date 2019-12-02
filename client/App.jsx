import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      genre: 'Asian',
      title: 'Sushi Near Me',
      recs: []
    };
  }

  render() {
    return (
      <div>
        <div className="recHeader">More {this.state.genre} Near {this.state.title}</div>
        {this.state.recs.map(rec => {
          <Rec rec={rec}/>
        })}
      </div>
    );
  }
};



ReactDOM.render(<App />, document.getElementById("recommendations"));