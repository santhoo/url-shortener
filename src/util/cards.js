import Cards from 'data/cards.json'

function GetCardPaths() {
	// Get every card path
	let cards = []
	if (Cards.length > 0) {
		cards = Cards.map((card) => ({
			params: { name: card.name },
		}))
	}

	return cards
}

export { GetCardPaths, Cards }
