import Reflux from 'reflux';

const HearthstoneActions = Reflux.createActions([
    // Deck
    'loadDeck',
    'addDeck',
    'removeDeck',
    'importDefaultDecks',

    // Cards
    'addCard',
    'removeCard',

    // Filters
    'searchCard',
    'selectFilter',
    'toggleFilter',

    // Settings
    'changeLocale'
]);

export default HearthstoneActions;
