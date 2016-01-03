import Reflux from 'reflux';

const HearthstoneActions = Reflux.createActions([
    // Deck
    'loadDeck',
    'addDeck',
    'removeDeck',

    // Cards
    'addCard',
    'removeCard',

    // Filters
    'searchCard',
    'selectFilter',
    'toggleFilter',

    // Settings
    'changeLocale',
    'importDefaultDecks',
    'openMenu'
]);

export default HearthstoneActions;
