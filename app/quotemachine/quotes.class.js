// stores a list of quote objects
export default class Quotes {
	constructor() {
		this.quotes = [];
	}

	// returns a quote object randomly
	randomQuote() {
		const length = this.quotes.length;
		if (length > 0) {
			return this.quotes[Math.floor(Math.random() * length)];
		}

		return { quote: "", author: "" };
	}

	// attempts to fetch quotes from a json resource async-ly
	// returns a promise
	fetchQuotes(url) {
		return fetch(url)
			.then(response => response.json())
			.then(responseJson => { this.quotes = responseJson.quotes; })
			.catch( () => { this.quotes = [{ quote: "Something went wrong.", author: ""}] });
	}
}
