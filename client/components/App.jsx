import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import Recommendation from './Recommendation.jsx';

const Allrecs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Recheader = styled.div`
  border-top: 1px solid black;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 20px;
  line-height: 20px;
  font-family: 'Calibre-Medium';
`;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      genre: '',
      title: '',
      recs: []
    };

    this.get = this.get.bind(this);
  }

  componentDidMount() {
    this.get();
  }

  get() {
    const restaurantId = window.location.href.slice(36);
    $.ajax({
      type: 'GET',
      url: 'api/restaurants/'+restaurantId,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: (data) => {
        console.log("this is data!!!", data)
        this.setState({
          genre:  data.genre,
          title:  data.title,
          recs:  data.expected

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
        <Recheader>More {this.state.genre} Near {this.state.title}</Recheader>
        <Allrecs>
          {this.state.recs.map(rec => <Recommendation rec={rec} genre={this.state.genre}/>)}
        </Allrecs>
      </div>
    );
  }
};

export default App;