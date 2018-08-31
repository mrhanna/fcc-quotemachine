import React from 'react';

export default class QuoteBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changing: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({changing: true});
    this.props.nextQuote()
      .then(() => {
        this.setState({changing: false});
      });
  }

  render() {
    return (
      <div id="quote-box">
        <div id="quote-wrapper" className={this.state.changing? "changing" : ""}>
          <blockquote>
            <i class="fa fa-quote-left"></i>
            <span id="text">{this.props.quote.quote}</span>
          </blockquote>
          <cite id="author">
            {this.props.quote.author}
          </cite>
        </div>

        <div class="buttons">
          <a id="tweet-quote" target="_blank" href={twitterURL(this.props.quote.quote, this.props.quote.author)}>tweet</a>
          <button id="new-quote" onClick={this.handleClick}>new quote</button>
        </div>
      </div>
    );
  }
}

const twitterURL = (quote, author) => `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${ encodeURIComponent(quote)}%20-${encodeURIComponent(author)}`;
