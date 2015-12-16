import Reflux             from 'reflux';
import _                  from 'lodash';
import HearthstoneActions from './../action/HearthstoneActions';
import CardsFr            from '../../../resources/data/Cards-fr.json';
import CardsEn            from '../../../resources/data/Cards-en.json';
import HeroesFr           from '../../../resources/data/Heroes-fr.json';
import HeroesEn           from '../../../resources/data/Heroes-en.json';

/**
 * HearthstoneStore
 */
const HearthstoneStore = Reflux.createStore({
    listenables: HearthstoneActions,

    init() {
        this.decks     = localStorage.decks == undefined  ? []   : JSON.parse(localStorage.decks);
        this.locale    = localStorage.locale == undefined ? 'fr' : JSON.parse(localStorage.locale);
        this.heroes    = this.initHeroes();
        this.cards     = this.initCards();
        this.current   = null;
        this.showModal = false;
        this.filters   = {
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

        this.trigger();
    },

    addDeck(deckName, hero) {
        this.decks.push({
            name: deckName,
            cards: [],
            hero: hero
        });

        // Close modal
        this.showModal = !this.showModal;

        this.write();
    },

    removeDeck(current) {
        this.decks.splice(current, 1);
        this.current = null;

        this.write();
    },

    addCard(id) {
        if (this.current != null) {
            let card      = this.cards[_.findIndex(this.cards, 'cardId', id)];
            let deckCards = this.decks[this.current].cards;
            let newCard   = true;
            let nbCards   = this.countCurrentDeck();
            let currentCard;

            _.forEach(deckCards, unit => {
                if (unit.cardId == card.cardId) {
                    currentCard = unit;
                    newCard     = false;
                }
            });

            if (nbCards < 30) {
                if (newCard) {
                    deckCards.push({
                        name:   card.name,
                        cost:   card.cost,
                        cardId: card.cardId,
                        rarity: card.rarity,
                        count:  1
                    });
                } else if (currentCard.count != 2 && currentCard.rarity != 'Legendary') {
                    currentCard.count++;
                }

                this.write();
            }
        }
    },

    removeCard(id) {
        if (this.current != null) {
            let deckCards = this.decks[this.current].cards;
            let index     = _.findIndex(deckCards, 'cardId', id);

            if (index != -1) {
                deckCards[index].count--;

                if (deckCards[index].count == 0) {
                    deckCards.splice(index, 1);
                }

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

    toggleModal() {
        this.showModal = !this.showModal;

        this.trigger();
    },

    /* -------------
     *   Internals
     * ------------- */

    countCurrentDeck() {
        if (this.current == null) {
            return null;
        }

        let deckCards = this.decks[this.current].cards;
        let nbCards   = 0;

        _.forEach(deckCards, unit => {
            nbCards = nbCards + unit.count;
        });

        return nbCards;
    },

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
        let { hero, cards } = this.filters;
        cards = this.cards;

        // First filter on Hero
        if (hero != null) {
            if (hero.playerClass != 'Neutral') {
                cards = _.filter(this.cards, 'playerClass', hero.playerClass);
            } else {
                cards = _.filter(this.cards, card => {
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

    /* -------------
     *   Assessors
     * ------------- */

    getLocale() {
        return this.locale;
    },

    getComposedState() {
        return {
            decks:     this.decks,
            locale:    this.locale,
            current:   this.current,
            cards:     this.cards,
            heroes:    this.heroes,
            filters:   this.filters,
            showModal: this.showModal
        };
    }
});

export default HearthstoneStore;
