import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';

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
  font-family: "Calibre-Regular", sans-serif;
`;

const Rec = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  height: 220px;
  width: 580px;
  box-shadow: 0px 0px 10px grey;
`;

const Pic = styled.div`
  display: flex;
  height: 220px;
  width: 230px;
  background-color: black;
`;

const Recbody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 25px;
  background-color: white;
  height: 100%;
  width: 350px;
`;

const Rectitle = styled.div`
  padding: 3px;
  width: 310px;
  font-size: 18px;
  line-height: 20px;
  border-bottom: 1px solid transparent;
  font-family: "Calibre-Regular", sans-serif;
  text-transform: uppercase;
  transition-property: border-bottom;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  ${Rec}:hover & {
    border-bottom: 1px solid #b70038;
  }
`;

const Recprice = styled.div`
  padding: 3px;
  color: rgb(153, 153, 153);
  font-size: 15px;
  font-family: "Calibre-Regular", sans-serif;
`;

const Logo = styled.div`
  height: 20px;
  width: 20px;
  padding-right: 5px;
`;

const Zagatrated = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  font-size: 15px;
  font-family: "Calibre-Regular", sans-serif;
`;

const Rectext = styled.div`
  font-size: 15px;
  padding: 3px;
  font-family: "Calibre-Regular", sans-serif;
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
        <Recheader>More {this.state.genre} Near {this.state.title}</Recheader>
        <Allrecs>
          {this.state.recs.map(rec => <Recommendation rec={rec} genre={this.state.genre}/>)}
        </Allrecs>
      </div>
    );
  }
};

const Recommendation = (props) => {
  return (
    <Rec>
      <Pic>{props.rec.pics}</Pic>
      <Recbody>
        <Rectitle>{props.rec.title}</Rectitle>
        <Recprice>{props.genre} <span>&#183;</span>  {props.rec.price}</Recprice>
        <Zagatrated>
          <Logo><img src="assets/logo.svg"/></Logo>ZAGAT RATED
        </Zagatrated>
        <Rectext>{props.rec.text}</Rectext>
      </Recbody>
    </Rec>
  );
};

ReactDOM.render(<App />, document.getElementById("recommendations"));