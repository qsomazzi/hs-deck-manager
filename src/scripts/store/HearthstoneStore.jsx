import Reflux              from 'reflux';
import _                   from 'lodash';
import HearthstoneActions  from './../action/HearthstoneActions';
import HearthstoneConstant from './../constant/HearthstoneConstant';
import TranslationHelper   from './../helper/TranslationHelper';
import AllCards            from './../resources/Cards.json';
import AllHeroes           from './../resources/Heroes.json';
import DefaultDecks        from './../resources/default-decks.json';

/**
 * HearthstoneStore
 */
const HearthstoneStore = Reflux.createStore({
    listenables: HearthstoneActions,

    /**
     * Initialise the store
     */
    init() {
        this.collection = localStorage.collection == undefined ? this.initCollection() : JSON.parse(localStorage.collection);
        this.decks      = localStorage.decks == undefined      ? []                    : _.sortByAll(JSON.parse(localStorage.decks), ['hero', 'name']);
        this.locale     = localStorage.locale == undefined     ? 'frFR'                : JSON.parse(localStorage.locale);
        this.heroes     = this.initHeroes();
        this.cards      = this.initCards();
        this.menu       = 'menu';
        this.current    = null;
        this.filters    = {
            search:    null,
            cards:     this.cards,
            heroes:    this.initHeroes(true),
            hero:      null,
            rarity:    null,
            cardType:  null,
            cardSet:   null,
            mechanics: null,
            status:    null,
            race:      null,
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

    /**
     * Load a deck and update filters
     *
     * @param {number} current
     */
    loadDeck(current) {
        this.current = current == this.current ? null : current;

        this.updateFilters();
    },

    /**
     * Add a new deck and load it
     *
     * @param {string} deckName
     * @param {string} hero
     */
    addDeck(deckName, hero) {
        this.decks.unshift({
            name: deckName,
            cards: [],
            hero: hero,
            nbCards: 0,
            cost: 0
        });

        this.write();

        this.current = null;
        this.loadDeck(0);
    },

    /**
     * Remove a deck and update filters
     *
     * @param {number} current
     */
    removeDeck(current) {
        this.decks.splice(current, 1);
        this.current = null;
        this.updateFilters();

        this.write();
    },

    /**
     * Add a card to current deck OR collection
     *
     * @param {number} id
     */
    addCard(id) {
        if (this.menu == 'my-decks' || this.menu == 'my-collection') {
            let card = this.filters.cards[_.findIndex(this.filters.cards, {'id': id})];

            if (this.current != null) {
                let deck = this.decks[this.current];

                this.addNewCard(card, deck.cards, deck);
            } else {
                this.addNewCard(card, this.collection);
            }
        }
    },

    /**
     * Add a card to current deck OR collection
     * Then update filtered cards
     *
     * @param {object} card
     * @param {array}  cards
     * @param {object} deck
     */
    addNewCard(card, cards, deck = null) {
        let newCard   = true;
        let currentCard;

        _.forEach(cards, unit => {
            if (unit.id == card.id) {
                currentCard = unit;
                newCard     = false;
            }
        });

        if (deck != null && deck.nbCards == 30) {
            return;
        }

        if (newCard) {
            cards.push({
                cost:   card.cost,
                id:     card.id,
                rarity: card.rarity,
                count:  1
            });

            if (deck != null) {
                deck.nbCards++;
                deck.cost = deck.cost + HearthstoneConstant.dust[card.rarity];
            }
        } else if (currentCard.count != 2 && currentCard.rarity != 'Legendary') {
            currentCard.count++;

            if (deck != null) {
                deck.nbCards++;
                deck.cost = deck.cost + HearthstoneConstant.dust[card.rarity];
            }
        }

        this.filterCards();
        this.write();
    },

    /**
     * Remove a card from current deck OR collection
     * Then update filtered cards
     *
     * @param {number} id
     */
    removeCard(id) {
        let deck = null;
        let cards;

        if (this.menu == 'my-decks' && this.current != null) {
            deck  = this.decks[this.current];
            cards = deck.cards;
        } else if(this.menu == 'my-collection') {
            cards = this.collection;
        }

        let index = _.findIndex(cards, {'id': id});

        if (index != -1) {
            cards[index].count--;

            // remove if it's the last occurrence of this card in the deck
            if (cards[index].count == 0) {
                cards.splice(index, 1);
            }

            if (deck != null) {
                deck.nbCards--;
                deck.cost = deck.cost - HearthstoneConstant.dust[cards[index].rarity];
            }

            this.filterCards();
            this.write();
        }
    },

    /**
     * Change app locale
     *
     * @param {string} locale
     */
    changeLocale(locale) {
        this.locale = locale;
        this.heroes = this.initHeroes();
        this.cards  = this.initCards();

        this.write();
    },

    /**
     * Search a card
     * Then update filtered cards
     *
     * @param {string} value
     */
    searchCard(value) {
        this.filters.search = value != '' ? value : null;

        this.filterCards();
    },

    /**
     * Select a filter
     * Then update filtered cards
     *
     * @param {string} type
     * @param {string} value
     */
    selectFilter(type, value) {
        switch (type) {
            case 'hero':
                let index = _.findIndex(this.filters.heroes, {'id': value});

                this.filters.hero = index != -1 ? this.filters.heroes[index] : null;
                break;
            case 'rarity':
            case 'cardSet':
            case 'cardType':
            case 'mechanics':
            case 'status':
            case 'race':
                this.filters[type] = value != '' ? value : null;
                break;
        }

        this.filterCards();
    },

    /**
     * Toggle a cost filter
     * Then update filtered cards
     *
     * @param {string} filter
     */
    toggleFilter(filter) {
        this.filters.cristal[filter] = ! this.filters.cristal[filter];

        this.filterCards();
    },

    /**
     * Import default decks
     */
    importDefaultDecks() {
        this.decks = DefaultDecks;

        this.write();
    },

    /**
     * Open a menu
     *
     * @param {string} menuItem
     */
    openMenu(menuItem) {
        this.menu = menuItem;
        this.loadDeck(null);
    },

    /**
     * Reinitialise the user collection
     */
    reinitCollection() {
        this.collection = this.initCollection();
    },

    /* -------------
     *   Internals
     * ------------- */

    /**
     * Initialize cards list, translate cards name and sort them
     */
    initCards() {
        let cards = [];

        _.forEach(AllCards, card => {
            let name = TranslationHelper.translate(card.id, this.locale);

            card.name = name;
            card.nameSortable = this.slugify(name);

            cards.push(card);
        });

        return _.sortByAll(cards, ['cost', 'nameSortable']);
    },

    /**
     * Initialize cards collection
     */
    initCollection() {
        let cards = [];

        _.forEach(AllCards, card => {
            if (card.rarity == 'Free' || card.cardSet == 'Basic') {
                cards.push({
                    cost:   card.cost,
                    id:     card.id,
                    rarity: card.rarity,
                    count:  2
                });
            }
        });

        return cards;
    },

    /**
     * Initialize heroes list (and filters list)
     *
     * @param {boolean} forFilters
     */
    initHeroes(forFilters = false) {
        let heroes = [];

        _.forEach(AllHeroes, hero => {
            let name = TranslationHelper.translate(hero.id, this.locale);

            hero.name         = name;
            hero.nameSortable = this.slugify(name);

            heroes.push(hero);
        });

        if (forFilters) {
            let name = TranslationHelper.translate('HERO_00', this.locale);

            heroes.push({
                id:           'HERO_00',
                name:         name,
                nameSortable: this.slugify(name),
                playerClass:  'Neutral'
            });
        }

        return _.sortByAll(heroes, ['id', 'nameSortable']);
    },

    /**
     * Save on the LocalStorage decks, locale and collection
     */
    write() {
        this.trigger();

        localStorage.decks      = JSON.stringify(this.decks);
        localStorage.locale     = JSON.stringify(this.locale);
        localStorage.collection = JSON.stringify(this.collection);
    },

    /**
     * Apply all filters on cards list
     */
    filterCards() {
        let { hero, heroes, rarity, cardType, race, cardSet, mechanics, search, status } = this.filters;
        let cards                                                                        = this.cards;

        // First filter on available heroes
        if (heroes.length == 2) {
            cards = _.filter(cards, card => {
                return heroes[1].playerClass == card.playerClass || card.playerClass == null;
            });
        }

        // Then filter on selected Hero
        if (hero != null) {
            let playerClass = hero.playerClass != 'Neutral' ? hero.playerClass : null;

            cards = _.filter(cards, {'playerClass': playerClass});
        }

        // Then filter on rarity selection
        if (rarity != null) {
            if (rarity == 'Common') {
                cards = _.filter(cards, card => {
                    return card.rarity == 'Common' && card.cardSet != 'Basic';
                });
            } else if (rarity == 'Free') {
                cards = _.filter(cards, card => {
                    return card.rarity == 'Free' || card.cardSet == 'Basic';
                });
            } else {
                cards = _.filter(cards, {'rarity': rarity});
            }
        }

        // Then filter on type selection
        if (cardType != null) {
            cards = _.filter(cards, {'type': cardType});
        }

        // Then filter on race selection
        if (race != null) {
            cards = _.filter(cards, {'race': race});
        }

        // Then filter on set selection
        if (cardSet != null) {
            cards = _.filter(cards, {'cardSet': cardSet});
        }

        // Then filter on mechanics selection
        if (mechanics != null) {
            cards = _.filter(cards, card => {
                if (card.mechanics != null) {
                    if (_.findIndex(card.mechanics, {'name': mechanics}) != -1) {
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

        // Then filter on status selection
        if (status != null) {
            cards = _.filter(cards, card => {
                let index = _.findIndex(this.collection, {'id': card.id});

                if (status == 'Owned') {
                    return index != -1 && (this.collection[index].count == 2 || this.collection[index].rarity == 'Legendary');
                } else {
                    return index == -1 || (this.collection[index].count != 2 && this.collection[index].rarity != 'Legendary');
                }
            });
        }

        // We filter at least with search because this cost a lot, so we try to filter on a smaller set of results
        if (search != null) {
            cards = _.filter(cards, card => {
                return card.name.toLowerCase().search(search) != -1;
            });
        }

        this.filters.cards = cards;

        this.trigger();
    },

    /**
     * Update heroes filters
     * Then update filtered cards
     */
    updateFilters() {
        this.filters.hero   = null;
        this.filters.heroes = this.initHeroes(true);

        // Update heroes filter for the selected deck
        if (this.current != null) {
            this.filters.heroes = _.pullAt(
                this.filters.heroes,
                0,
                _.findIndex(this.filters.heroes, {'id': this.decks[this.current].hero})
            );
        }

        this.filterCards();
    },

    /**
     * Convert a text to handle sort
     *
     * @param {string} text
     */
    slugify(text) {
        return text.toString()
            .toLowerCase()
            .replace(/[àáâãäå]/g,'a')
            .replace(/[éèêë]/g,'e')
            .replace(/[œ]/g,'oe');
    },

    /**
     * Sort a list of card by cost then translated name
     *
     * @param {array} cards
     */
    sortCards(cards) {
        return _.sortByAll(_.map(cards, card => {
            return _.assign(card, {
                name: this.slugify(TranslationHelper.translate(card.id))
            });
        }), ['cost', 'name']);
    },

    /* -------------
     *   Assessors
     * ------------- */

    /**
     * Return app locale
     */
    getLocale() {
        return this.locale;
    },

    /**
     * Return store state
     */
    getComposedState() {
        return {
            decks:      this.decks,
            current:    this.current,
            cards:      this.cards,
            heroes:     this.heroes,
            filters:    this.filters,
            collection: this.collection,
            menu:       this.menu
        };
    },

    /**
     * Calculate the mana curve for a deck
     *
     * @param {object} deck
     */
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

    /**
     * Get translated card name
     *
     * @param {object} card
     * @param {number} truncate
     */
    getCardName(card, truncate = null) {
        let name = TranslationHelper.translate(card.id);

        if (truncate != null) {
            return name < 20 ? name : `${name.substring(0, 20)}...`;
        }

        return name;
    },

    /**
     * Return card image path
     *
     * @param {object} card
     * @param {string} size
     */
    getCardImage(card, size = 'large') {
        let path = '/images/cards/';

        switch (size) {
            case 'large':
                let locale = (this.locale == 'koKR' || this.locale == 'plPL' || this.locale == 'jaJP') ? 'enUS' : this.locale;

                path += locale;
                break;
            case 'small':
                path += 'small';
                break;
        }

        return `${path}/${card.id}.png`;
    },

    /**
     * Return hero image path
     *
     * @param {object} hero
     * @param {string} size
     */
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
    },

    /**
     * Return if the card's id is in user collection
     *
     * @param {number} id
     */
    isInCollection(id) {
        let card = this.collection[_.findIndex(this.collection, {'id': id})];

        return card != undefined && (card.count == 2 || card.rarity == 'Legendary');
    },

    /**
     * Return if the card is selectable
     */
    isSelectable() {
        return this.menu === 'my-collection' || (this.menu === 'my-decks' && this.current !== null);
    },

    /**
     * Return deck dust cost calculate with user collection
     *
     * @param {object} deck
     */
    getDeckCost(deck) {
        let initialCost = deck.cost;

        _.forEach(deck.cards, card => {
            let collectionCard = this.collection[_.findIndex(this.collection, {'id': card.id})];

            if (collectionCard != undefined) {
                initialCost -= HearthstoneConstant.dust[card.rarity];

                if (card.count == 2 && collectionCard.count == 2) {
                    initialCost -= HearthstoneConstant.dust[card.rarity];
                }
            }
        });

        return initialCost;
    }
});

export default HearthstoneStore;
