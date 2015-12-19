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

        this.updateFilters();
    },

    addDeck(deckName, hero) {
        this.decks.push({
            name: deckName,
            cards: [],
            hero: hero,
            nbCards: 0
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
                } else if (currentCard.count != 2 && currentCard.rarity != 'Legendary') {
                    currentCard.count++;

                    deck.nbCards++;
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
                deck.cards[index].count--;

                if (deck.cards[index].count == 0) {
                    deck.cards.splice(index, 1);
                }

                deck.nbCards--;

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

    updateFilters() {
        // Update heroes filter for the selected deck

        // Filtercards ??
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
