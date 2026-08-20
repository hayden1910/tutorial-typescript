type Card = string | number;

const cards: Card[] = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

// NOT RECOMMEND
// the larger the array becomes, this method becomes increasingly more inefficient 
// cards.sort(() => Math.random() - 0.5); 

// Fisher-yates algorithm
shuffle(cards);

function shuffle(array: Card[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        // destructuring
        [array[i], array[random]] = [array[random], array[i]];
    }
}

console.log(cards);

export { };
