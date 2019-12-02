import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      genre: 'Asian',
      title: 'Sushi Near Me',
      recs: [1,2,3,4]
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className="recHeader">More {this.state.genre} Near {this.state.title}</div>
        <div  className="allRecs">
          {this.state.recs.map(rec => <Recommendation rec={rec}/>)}
        </div>
      </div>
    );
  }
};

const Recommendation = (props) => {
  return (
    <div className="rec">
      <div className="pic">{props.pic}pic</div>
      <div className="recBody">
        <div className="recTitle">{props.title}title</div>
        <div className="recPrice">{props.genre} {props.price}asian $$$</div>
        <div className="zagatRated">
          <img src="/assets/logo.svg" className="logo"/>ZAGAT RATED
        </div>
        <div className="recText">{props.text}This asian food is bomb.</div>
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("recommendations"));