solitaire = {
    config: {
        openPlaceholdersLimit: 7,
        suitPlaceholders: 7,
        cardTypes: ['spade', 'clubs', 'hearts', 'diamond'],
        cardsLimit: 52,
        cardColors: ['black', 'red'],
        cardConstants: {
            king: 'K',
            queen: 'Q',
            jack: 'J',
            ace: 'A'
        }

    },
    selectedCard: {},
    openPlaceholders: [],
    suitPlaceholders: [], //{type: , stack: }
    cardDeck: [],
    closedCardDeck: [],
    init: function () {

    },
    gameInitialization: function () {
        this.initializeCardDeck();
        this.initializeClosedDeck();
        this.getNewCardFromClosedDeck();
    },
    //initialize 52 cards with their data and save in an array
    initializeCardDeck: function () {
        let cardTypeCount = 0;
        for (let index = 1; index <= this.config.cardsLimit; index++) {
            this.cardDeck.push(this.getCard(this.config.cardTypes[cardTypeCount], index));
            if (index % 13 === 0) {
                cardTypeCount++;
            }
        }
        this.cardDeck = this.shuffleDeck(this.cardDeck);
        this.initializeOpenPlaceholders();
    },

    //set open placeholders and inser cards 1 , 2, .... 
    initializeOpenPlaceholders: function () {
        let cardsCount = 0;
        for (let cardsLimit = 1; cardsLimit <= this.config.openPlaceholdersLimit; cardsLimit++) {
            let placeholder = [];
            for (let i = 0; i < cardsLimit; i++) {
                if (i === cardsLimit - 1) {
                    this.cardDeck[cardsCount].revealed = true;
                }
                placeholder.push(this.cardDeck[cardsCount]);
                cardsCount++;
            }
            this.openPlaceholders.push(placeholder);
        }
    },

    // initialize the closed deck i.e. remaining cards after setting open placeholders
    initializeClosedDeck: function () {
        let usedCardsCount = this.config.openPlaceholdersLimit * (this.config.openPlaceholdersLimit + 1) / 2;
        this.closedCardDeck = [...this.cardDeck];
        this.closedCardDeck.splice(0, usedCardsCount);
    },

    //card data structure
    getCard: function(type, value) {
        return { type: type, color: this.getCardTypeColor(type), value: (value % 13) + 1, name: this.getCardName((value % 13) + 1), revealed: false, id: this.generateId(type, value)}
    },

    generateId: function(type, value) {
        return type[0] + value;
    },
    //get card color based on type
    getCardTypeColor: function(cardType) {
        if (cardType === this.config.cardTypes[0] || cardType === this.config.cardTypes[1]) {
            return this.config.cardColors[0];
        } else {
            return this.config.cardColors[1];
        }
    },

    //get card names for cards like Ace, Jack, Queen
    getCardName: function(id) {
        switch (id) {
            case 1: return this.config.cardConstants.ace;
            case 11: return this.config.cardConstants.jack;
            case 12: return this.config.cardConstants.queen;
            case 13: return this.config.cardConstants.king;
            default: return id.toString();
        }
    },

    //shuffle cards in the deck
    shuffleDeck: function(deck) {
        let tempCard, currentIndex = deck.length;
        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            tempCard = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = tempCard;
        }
        return deck;
    },

    checkCardMatchForOpenPlaceHolder() {

    },
    checkCardMatchSuit() {

    },
    //hide and show card faces
    revealcard: function(card) {
        card.revealed = true;
        return card;
    },
    unrevealCard: function(card) {
        card.revealed = false;
        return card;
    },

    isCardKing: function(card) {
        return (card.name === this.config.cardConstants.king);
    },
    isCardAce: function(card) {
        return (card.name === this.config.cardConstants.ace);
    },

    // check if card deck,placeholders etc are empty
    isEmpty: function(array) {
        return (array.length === 0);
    },

    isCardLower: function(parentCard, childCard) {
        return (parentCard.id === childCard.id + 1);
    },

    isColorOpposite: function (parentCard, childCard) {
        return (parentCard.color !== childCard.color);
    },
    //if selectecard exists then click will attempt drop

    onCardClick:  function () {

    },

    //select unselect a card
    selectCard: function (card) {
        this.selectCard = card;
    },

    unSelectCard: function () {
        this.selectCard = {};
    },
    //array roataion for deck
    getNewCardFromClosedDeck: function () {
        let lastCard = this.closedCardDeck[this.closedCardDeck.length - 1];
        for (let index = this.closedCardDeck.length - 1 ; index > 0; index--) {
            this.closedCardDeck[index] = this.closedCardDeck[index - 1];
        }
        this.closedCardDeck[0] = lastCard;
        return this.closedCardDeck[this.closedCardDeck.length - 1];
    },

}