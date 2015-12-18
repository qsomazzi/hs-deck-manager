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
    'selectHero',
    'toggleFilter',

    // Settings
    'changeLocale',
    'toggleModal'
]);

export default HearthstoneActions;