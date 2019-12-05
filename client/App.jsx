import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      genre: '',
      title: '',
      recs: []
    };

    this.patch = this.patch.bind(this);
  }

  componentDidMount() {
    this.patch();
  }

  patch() {
    const restaurantId = window.location.href.slice(36);
    $.ajax({
      type: 'PATCH',
      url: 'api/restaurants/'+restaurantId,
      success: (data) => {
        console.log('data ', data);
        this.setState({
          genre: data[0].genre,
          title: data[0].title,
          recs: data[0].recs
        });
      },
      failure: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="recHeader">More {this.state.genre} Near {this.state.title}</div>
        <div  className="allRecs">
          {this.state.recs.map(rec => <Recommendation rec={rec} genre={this.state.genre}/>)}
        </div>
      </div>
    );
  }
};

const Recommendation = (props) => {
  return (
    <div className="rec">
      <div className="pic">{props.rec.pics}</div>
      <div className="recBody">
        <div className="recTitle">{props.rec.title}</div>
        <div className="recPrice">{props.genre} <span>&#183;</span>  {props.rec.price}</div>
        <div className="zagatRated">
          <img src="/assets/logo.svg" className="logo"/>ZAGAT RATED
        </div>
        <div className="recText">{props.rec.text}</div>
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("recommendations"));