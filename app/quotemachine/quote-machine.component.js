import React from 'react';
import Quotes from './quotes.class'
import QuoteBox from './quote-box.component'

"use strict";

// color classes defined by css
const palettes = [
		"color-red",
		"color-blue",
		"color-sky",
		"color-purple",
		"color-green",
		"color-teal"
	];

// array of quote objects -
// { name } is used in experience switcher (#quote-select)
const quoteURLs = [
	{ name: "Inspirational", url: "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"},
	{ name: "Anchorman", url: "https://raw.githubusercontent.com/mrhanna/fcc-quote-machine/master/anchorman.json" }
];

// the app
export default class QuoteMachine extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };

		this.nextQuote = this.nextQuote.bind(this);
		this.switchExperience = this.switchExperience.bind(this);

    this.quotes = new Quotes();
	}

	// lifecycle hook, fetches an initial quotelist
	componentDidMount() {
		this.quotes.fetchQuotes(quoteURLs[0].url)
			.then(this.nextQuote)
	}

	// handle next quote button behavior
	// change color, change quote
	nextQuote() {
		return new Promise(
			(resolve) => {
				setTimeout(() => {
					const quote = this.quotes.randomQuote();
					const color = palettes[Math.floor(
						Math.random() * palettes.length)];
					this.setState({ quote: quote, color });
					resolve();
				}, 400)
			});
	}

	// on (#quote-select) change, load a different list of quotes
	switchExperience(event) {
		this.quotes.fetchQuotes(
			quoteURLs[event.target.value].url)
			.then(this.nextQuote)
	}

	render() {
		return (
			<div className={"quote-box-wrapper " + this.state.color }>

				<select id="quote-select" onChange={this.switchExperience}>
					{	quoteURLs.map((a, index) => <option value={index} key={index}>{a.name}</option>) }
				</select>

				{ this.state.quote && <QuoteBox quote={this.state.quote} nextQuote={this.nextQuote} /> }
			</div>
		);
	}
}
