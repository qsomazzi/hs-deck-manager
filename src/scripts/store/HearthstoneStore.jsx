import Reflux              from 'reflux';
import _                   from 'lodash';
import HearthstoneActions  from './../action/HearthstoneActions';
import HearthstoneConstant from './../constant/HearthstoneConstant';
import AllCards            from '../../../resources/json/Cards.json';
import AllHeroes           from '../../../resources/json/Heroes.json';
import DefaultDecks        from '../../../resources/json/default-decks.json';

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
            search:    null,
            cards:     this.cards,
            heroes:    this.initHeroes(true),
            hero:      null,
            rarity:    null,
            cardType:  null,
            cardSet:   null,
            mechanics: null,
            cristal:   [
                false, // 0
                false, // 1
                false, // 2
                false, // 3
                false, // 4
                false, // 5
                false, // 6
                false  // 7
            ]
        };
    },

    /* -------------
     *    Actions
     * ------------- */

    loadDeck(current) {
        this.current = current == this.current ? null : current;

        this.updateFilters();
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
            let card      = this.filters.cards[_.findIndex(this.filters.cards, 'id', id)];
            let deck      = this.decks[this.current];
            let newCard   = true;
            let currentCard;

            _.forEach(deck.cards, unit => {
                if (unit.id == card.id) {
                    currentCard = unit;
                    newCard     = false;
                }
            });

            if (deck.nbCards < 30) {
                if (newCard) {
                    deck.cards.push({
                        nameFr: card.nameFr,
                        nameEn: card.nameEn,
                        cost:   card.cost,
                        id:     card.id,
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
            let index = _.findIndex(deck.cards, 'id', id);

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

    searchCard(value) {
        this.filters.search = value != '' ? value : null;

        this.filterCards();
    },

    selectFilter(type, value) {
        switch (type) {
            case 'hero':
                let index = _.findIndex(this.filters.heroes, 'id', value);

                this.filters.hero = index != -1 ? this.filters.heroes[index] : null;
                break;
            case 'rarity':
            case 'cardSet':
            case 'cardType':
            case 'mechanics':
                this.filters[type] = value != '' ? value : null;
                break;

                break;
        }

        this.filterCards();
    },

    toggleFilter(filter) {
        this.filters.cristal[filter] = ! this.filters.cristal[filter];

        this.filterCards();
    },

    importDefaultDecks() {
        this.decks = DefaultDecks;

        this.write();
    },

    /* -------------
     *   Internals
     * ------------- */

    initCards() {
        let sort = this.locale == 'fr' ? 'nameFr' : 'nameEn';

        return _.sortByAll(AllCards, ['cost', sort]);
    },

    initHeroes(forFilters = false) {
        let heroes = AllHeroes;

        if (forFilters) {
            heroes.push({
                id:          'HERO_00',
                name:        'Neutral',
                playerClass: 'Neutral'
            });
        }

        return _.sortByAll(heroes, ['id', 'name']);
    },

    write() {
        this.trigger();

        localStorage.decks  = JSON.stringify(this.decks);
        localStorage.locale = JSON.stringify(this.locale);
    },

    filterCards() {
        let { hero, heroes, rarity, cardType, cardSet, mechanics, search } = this.filters;
        let cards                                                          = this.cards;

        // First filter on available heroes
        if (heroes.length == 2) {
            cards = _.filter(cards, card => {
                return heroes[1].playerClass == card.playerClass || card.playerClass == null;
            });
        }

        // Then filter on selected Hero
        if (hero != null) {
            let playerClass = hero.playerClass != 'Neutral' ? hero.playerClass : null;

            cards = _.filter(cards, 'playerClass', playerClass);
        }

        // Then filter on rarity selection
        if (rarity != null) {
            if (rarity == 'Common') {
                cards = _.filter(cards, card => {
                    return card.rarity == 'Common' && card.cardSet != 'Basic';
                });
            } else if (rarity == 'Free') {
                cards = _.filter(cards, card => {
                    return card.rarity == 'Free' || (card.rarity == 'Common' && card.cardSet == 'Basic');
                });
            } else {
                cards = _.filter(cards, 'rarity', rarity);
            }
        }

        // Then filter on type selection
        if (cardType != null) {
            cards = _.filter(cards, 'type', cardType);
        }

        // Then filter on set selection
        if (cardSet != null) {
            cards = _.filter(cards, 'cardSet', cardSet);
        }

        // Then filter on mechanics selection
        if (mechanics != null) {
            cards = _.filter(cards, card => {
                if (card.mechanics != null) {
                    if (_.findIndex(card.mechanics, 'name', mechanics) != -1) {
                        return true;
                    }
                }

                return false;
            });
        }

        // Then filter on Mana selection
        let oneSelected = false;
        _.forEach(this.filters.cristal, cristal => {
            if (cristal == true) {
                oneSelected = true;
            }
        });
        if (oneSelected) {
            cards = _.filter(cards, card => {
                let filter = card.cost > 7 ? 7 : card.cost;

                return this.filters.cristal[filter];
            });
        }

        // We filter at least with search because this cost a lot, so we try to filter on a smaller set of results
        if (search != null) {
            let name = this.locale == 'fr' ? 'nameFr' : 'nameEn';

            cards = _.filter(cards, card => {
                return card[name].toLowerCase().search(search) != -1;
            });
        }

        this.filters.cards = cards;

        this.trigger();
    },

    updateFilters() {
        this.filters.hero   = null;
        this.filters.heroes = this.initHeroes(true);

        // Update heroes filter for the selected deck
        if (this.current != null) {
            this.filters.heroes = _.pullAt(
                this.filters.heroes,
                0,
                _.findIndex(
                    this.filters.heroes,
                    'id',
                    this.decks[this.current].hero
                )
            );
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
    },

    getManaCurve(deck) {
        let barSizes = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        };

        _.forEach(deck.cards, card => {
            let cost = card.cost < 8 ? card.cost : 7;

            barSizes[cost]++;

            if (card.count == 2) {
                barSizes[cost]++;
            }
        });

        return _.map(barSizes, bar => {
            let height = (bar * 100) / 30;

            return height <= 45 ? height : 45;
        });
    },

    getCardName(card, truncate = null) {
        let name = this.locale == 'fr' ? card.nameFr : card.nameEn;

        if (truncate != null) {
            return name < 20 ? name : `${name.substring(0, 20)}...`;
        }

        return name;
    },

    getCardImage(card, size = 'large') {
        let path = '/images/cards/';

        switch (size) {
            case 'large':
                path += this.locale;
                break;
            case 'small':
                path += 'small';
                break;
        }

        return `${path}/${card.id}.png`;
    },

    getHeroImage(hero, size = 'default') {
        let path = '/images/heroes';

        switch (size) {
            case 'default':
                path += `/${hero.id}.png`;
                break;
            case 'small':
                path += `/${hero.id}_small.png`;
                break;
        }

        return path;
    }
});

export default HearthstoneStore;
