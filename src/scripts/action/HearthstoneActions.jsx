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
    'selectRarity',
    'selectType',
    'selectSet',
    'selectMechanics',
    'toggleFilter',

    // Settings
    'changeLocale'
]);

export default HearthstoneActions;
