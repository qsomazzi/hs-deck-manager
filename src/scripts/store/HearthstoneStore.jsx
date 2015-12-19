import Reflux              from 'reflux';
import _                   from 'lodash';
import HearthstoneActions  from './../action/HearthstoneActions';
import HearthstoneConstant from './../constant/HearthstoneConstant';
import CardsFr             from '../../../resources/data/Cards-fr.json';
import CardsEn             from '../../../resources/data/Cards-en.json';
import HeroesFr            from '../../../resources/data/Heroes-fr.json';
import HeroesEn            from '../../../resources/data/Heroes-en.json';

/**
 * HearthstoneStore
 */
const HearthstoneStore = Reflux.createStore({
    listenables: HearthstoneActions,

    init() {
        this.decks   = localStorage.decks == undefined  ? []   : JSON.parse(localStorage.decks);
        this.locale  = localStorage.locale == undefined ? 'fr' : JSON.parse(localStorage.locale);
        this.heroes  = this.initHeroes();
        this.cards   = this.initCards();
        this.current = null;
        this.filters = {
            cards:   this.cards,
            heroes:  this.initHeroes(true),
            hero:    null,
            cristal: [
                true, // 0
                true, // 1
                true, // 2
                true, // 3
                true, // 4
                true, // 5
                true, // 6
                true  // 7
            ]
        };
    },

    /* -------------
     *    Actions
     * ------------- */

    loadDeck(current) {
        this.current = current;
        this.updateFilters(current);
    },

    addDeck(deckName, hero) {
        this.decks.push({
            name: deckName,
            cards: [],
            hero: hero,
            nbCards: 0,
            cost: 0
        });

        this.write();
    },

    removeDeck(current) {
        this.decks.splice(current, 1);
        this.current = null;
        this.updateFilters();

        this.write();
    },

    addCard(id) {
        if (this.current != null) {
            let card      = this.filters.cards[_.findIndex(this.filters.cards, 'cardId', id)];
            let deck      = this.decks[this.current];
            let newCard   = true;
            let currentCard;

            _.forEach(deck.cards, unit => {
                if (unit.cardId == card.cardId) {
                    currentCard = unit;
                    newCard     = false;
                }
            });

            if (deck.nbCards < 30) {
                if (newCard) {
                    deck.cards.push({
                        name:   card.name,
                        cost:   card.cost,
                        cardId: card.cardId,
                        rarity: card.rarity,
                        count:  1
                    });

                    deck.nbCards++;
                    deck.cost = deck.cost + HearthstoneConstant.dust[card.rarity];
                } else if (currentCard.count != 2 && currentCard.rarity != 'Legendary') {
                    currentCard.count++;

                    deck.nbCards++;
                    deck.cost = deck.cost + HearthstoneConstant.dust[card.rarity];
                }

                this.write();
            }
        }
    },

    removeCard(id) {
        if (this.current != null) {
            let deck  = this.decks[this.current];
            let index = _.findIndex(deck.cards, 'cardId', id);

            if (index != -1) {
                let rarity = deck.cards[index].rarity;
                deck.cards[index].count--;

                // remove if it's the last occurrence of this card in the deck
                if (deck.cards[index].count == 0) {
                    deck.cards.splice(index, 1);
                }

                deck.nbCards--;
                deck.cost = deck.cost - HearthstoneConstant.dust[rarity];

                this.write();
            }
        }
    },

    changeLocale(locale) {
        this.locale = locale;

        this.write();
    },

    selectHero(value) {
        let index = _.findIndex(this.filters.heroes, 'cardId', value);

        this.filters.hero = index != -1 ? this.filters.heroes[index] : null;

        this.filterCards();
    },

    toggleFilter(filter) {
        this.filters.cristal[filter] = ! this.filters.cristal[filter];

        this.filterCards();
    },

    /* -------------
     *   Internals
     * ------------- */

    initCards() {
        let cards = [];

        _.forEach(this.locale == 'fr' ? CardsFr : CardsEn, CardsByType => {
            _.forEach(CardsByType, Card => {
                cards.push(Card);
            });
        });

        return _.sortByAll(cards, ['cost', 'name']);
    },

    initHeroes(forFilters = false) {
        let heroes = this.locale == 'fr'  ? HeroesFr : HeroesEn;

        if (forFilters) {
            heroes.push({
                cardId:      'HERO_00',
                name:        'Neutral',
                playerClass: 'Neutral'
            });
        }

        return _.sortByAll(heroes, ['cardId', 'name']);
    },

    write() {
        this.trigger();

        localStorage.decks  = JSON.stringify(this.decks);
        localStorage.locale = JSON.stringify(this.locale);
    },

    filterCards() {
        let { hero, heroes } = this.filters;
        let cards            = this.cards;

        // First filter on available heroes
        if (heroes.length == 2) {
            cards = _.filter(cards, card => {
                return !card.hasOwnProperty('playerClass') || heroes[1].playerClass == card.playerClass;
            });
        }

        // Then filter on selected Hero
        if (hero != null) {
            if (hero.playerClass != 'Neutral') {
                cards = _.filter(cards, 'playerClass', hero.playerClass);
            } else {
                cards = _.filter(cards, card => {
                    return !card.hasOwnProperty('playerClass');
                });
            }
        }

        // Then filter on Mana selection
        cards = _.filter(cards, card => {
            let filter = card.cost > 7 ? 7 : card.cost;

            return this.filters.cristal[filter];
        });

        this.filters.cards = cards;

        this.trigger();
    },

    updateFilters(current = null) {
        this.filters.hero   = null;
        this.filters.heroes = this.initHeroes(true);

        // Update heroes filter for the selected deck
        if (current != null) {
            let currentHero = this.decks[current].hero;
            let heroIndex   = _.findIndex(this.filters.heroes, 'cardId', currentHero);

            this.filters.heroes = _.pullAt(this.filters.heroes, 0, heroIndex);
        }

        this.filterCards();
    },

    /* -------------
     *   Assessors
     * ------------- */

    getLocale() {
        return this.locale;
    },

    getComposedState() {
        return {
            decks:   this.decks,
            locale:  this.locale,
            current: this.current,
            cards:   this.cards,
            heroes:  this.heroes,
            filters: this.filters
        };
    }
});

export default HearthstoneStore;
