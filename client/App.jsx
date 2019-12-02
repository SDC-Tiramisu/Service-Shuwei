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

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className="recHeader">More {this.state.genre} Near {this.state.title}</div>
        {this.state.recs.map(rec => <Recommendation rec={rec}/>)}
      </div>
    );
  }
};

const Recommendation = (props) => {
  return (
    <div className="rec">
      <div>{props.pic}</div>
      <div>{props.title}</div>
      <div>{props.genre} {props.price}</div>
      <div>ZAGAT RATED</div>
      <div>{props.body}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("recommendations"));