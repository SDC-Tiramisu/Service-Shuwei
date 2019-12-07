import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import { KeyboardArrowLeft } from 'styled-icons/material/KeyboardArrowLeft';
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight';

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

const Picholder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 220px;
  width: 230px;
`;

const Picnavleft = styled(KeyboardArrowLeft)`
  height: 40px;
  width: 40px;
  margin-right: -40px;
  border-radius: 20px;
  color: white;
  &:hover {
    background-color: #101820;
  }
`;

const Pic = styled.div`
  height: 220px;
  width: 230px;
  overflow: auto;
  z-index: -1;
`;

const Picnavright = styled(KeyboardArrowRight)`
  height: 40px;
  width: 40px;
  margin-left: -40px;
  border-radius: 20px;
  color: white;
  &:hover {
    background-color: #101820;
  }
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

class Recommendation extends App {

  constructor(props) {
    super(props);

    this.state = {
      imageIndex: 0
    };

    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  onLeftClick() {
    const lastIndex = this.props.rec.pics.length - 1;
    const { imageIndex } = this.state;
    const shouldResetIndex = imageIndex === 0;
    const index =  shouldResetIndex ? lastIndex : imageIndex - 1;

    this.setState({
      imageIndex: index
    });
  }

  onRightClick() {
    const lastIndex = this.props.rec.pics.length - 1;
    const { imageIndex } = this.state;
    const shouldResetIndex = imageIndex === lastIndex;
    const index =  shouldResetIndex ? 0 : imageIndex + 1;

    this.setState({
      imageIndex: index
    });
  }

  render() {
    return (
      <Rec>
        <Picholder>
          <Picnavleft onClick={this.onLeftClick}></Picnavleft>
          <Pic>
            <ImageSlide url={ this.props.rec.pics[this.state.imageIndex] }/>
          </Pic>
          <Picnavright onClick={this.onRightClick}></Picnavright>
        </Picholder>
        <Recbody>
          <Rectitle>{this.props.rec.title}</Rectitle>
          <Recprice>{this.props.genre} <span>&#183;</span>  {this.props.rec.price}</Recprice>
          <Zagatrated>
            <Logo><img src="assets/logo.svg"/></Logo>ZAGAT RATED
          </Zagatrated>
          <Rectext>{this.props.rec.text}</Rectext>
        </Recbody>
      </Rec>
    );
  }
};

const ImageSlide = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    height: '220px',
    width: '230px',
    overflow: 'auto',
    zIndex: '-1'
  };

  return (
    <div style={styles}></div>
  );
}

ReactDOM.render(<App />, document.getElementById("recommendations"));