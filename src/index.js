import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Button from "react-bootstrap/Button";
import ReactFCCTest from "react-fcctest";

const tweet = <FontAwesomeIcon icon={faTwitter} color="rgb(31, 66, 62)" />;

class QuoteMachine extends React.Component {
  render() {
    return (
      <div id="quote-box">
        <GetQuote />
        <ReactFCCTest />
      </div>
    );
  }
}

class GetQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quotes: [],
      quoteNo: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quotes: result.quotes,
            quoteNo: randomQuoteNo(result.quotes)
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      );
  }

  handleClick() {
    this.setState({
      quoteNo: randomQuoteNo(this.state.quotes)
    });
  }

  render() {
    const { error, isLoaded, quotes, quoteNo } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let tweeturl =
        "https://www.twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent(
          '"' + quotes[quoteNo].quote + '"' + quotes[quoteNo].author
        );
      return (
        <div>
          <div id="text">&quot; {quotes[quoteNo].quote} &quot;</div>
          <div id="author-wrapper">
            <p></p>
            <p id="author">&ndash; {quotes[quoteNo].author}</p>
          </div>
          <div className="flex">
            <a
              id="tweet-quote"
              href={tweeturl}
              target="_blank"
              rel="noreferrer"
              title="Tweet the quote"
            >
              {tweet}
            </a>
            <Button id="new-quote" variant="dark" onClick={this.handleClick}>
              New Quote
            </Button>
          </div>
        </div>
      );
    }
  }
}

function randomQuoteNo(items) {
  return Math.floor(Math.random() * items.length);
}

ReactDOM.render(<QuoteMachine />, document.getElementById("root"));
