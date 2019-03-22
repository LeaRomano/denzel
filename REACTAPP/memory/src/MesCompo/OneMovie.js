import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Media,
  CardDeck,
  UncontrolledCarousel,
  Spinner
} from "reactstrap";
import "../App.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class OneMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      pic: "",
      isLoaded: false
    };
  }
  componentDidMount() {
    fetch("http://localhost:9292/movies/populate")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          item: json
        });
      });
  }
  render() {
    var { isLoaded, item } = this.state;

    if (!isLoaded) {
      return (
        <div>
          <Spinner color="danger" />
        </div>
      );
    } else {
      var ref1 = getRandomInt(56);
      var ref2 = getRandomInt(56);
      var ref3 = getRandomInt(56);

      const items = [
        {
          src: item[ref1].poster,
          altText: "Rating : " + item[ref1].rating,
          caption: item[ref1].synopsis,
          header: item[ref1].title
        },
        {
          src: item[ref2].poster,
          altText: "Rating : " + item[ref2].rating,
          caption: item[ref2].synopsis,
          header: item[ref2].title
        },
        {
          src: item[ref3].poster,
          altText: "Rating : " + item[ref3].rating,
          caption: item[ref3].synopsis,
          header: item[ref3].title
        }
      ];

      return (
        <div>
          <p class="App-diapo">
            <UncontrolledCarousel items={items} />
          </p>
        </div>
      );
    }
  }
}

export default OneMovie;
