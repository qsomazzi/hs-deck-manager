import chai             from 'chai';
import HearthstoneStore from '../../../src/scripts/store/HearthstoneStore';

describe('HearthstoneStoreTest', () => {
    // Before each Test, we make sure our Store is fully reinitalized
    beforeEach(() => {
        HearthstoneStore.init();
    });

    describe('init()', () => {
        it('should be fully initialze', () => {
            chai.assert.equal(HearthstoneStore.menu, 'menu');
            chai.assert.equal(HearthstoneStore.current, null);
            chai.assert.equal(HearthstoneStore.locale, 'frFR');
            chai.assert.typeOf(HearthstoneStore.decks, 'array');
            chai.assert.typeOf(HearthstoneStore.collection, 'array');
            chai.assert.typeOf(HearthstoneStore.heroes, 'array');
            chai.assert.typeOf(HearthstoneStore.cards, 'array');

            let filters = HearthstoneStore.filters;
            chai.assert.equal(filters.search, null);
            chai.assert.equal(filters.hero, null);
            chai.assert.equal(filters.rarity, null);
            chai.assert.equal(filters.cardType, null);
            chai.assert.equal(filters.cardSet, null);
            chai.assert.equal(filters.mechanics, null);
            chai.assert.equal(filters.status, null);
            chai.assert.equal(filters.race, null);
            chai.assert.equal(filters.cards, HearthstoneStore.cards);
            chai.assert.typeOf(filters.cards, 'array');
            chai.assert.typeOf(filters.heroes, 'array');

            let cristals = filters.cristal;
            chai.assert.equal(cristals[0], false);
            chai.assert.equal(cristals[1], false);
            chai.assert.equal(cristals[2], false);
            chai.assert.equal(cristals[3], false);
            chai.assert.equal(cristals[4], false);
            chai.assert.equal(cristals[5], false);
            chai.assert.equal(cristals[6], false);
            chai.assert.equal(cristals[7], false);      
        });
    });

    describe('loadDeck(current)', () => {
        it('should load deck and update filters', () => {
            let originalHeroFilters = HearthstoneStore.filters.heroes;
            let originalCardsLength = HearthstoneStore.filters.cards.length;
            let expectedHeroFilters = [
                { id: 'HERO_00', name: 'Neutre', nameSortable: 'neutre', playerClass: 'Neutral' },
                { id: 'HERO_01', name: 'Garrosh Hurlenfer', playerClass: 'Warrior',nameSortable: 'garrosh hurlenfer' } 
            ];

            HearthstoneStore.decks = {1: {hero: 'HERO_01'}};
            
            // Load Deck
            chai.assert.equal(HearthstoneStore.current, null);
            HearthstoneStore.loadDeck(1);
            chai.assert.equal(HearthstoneStore.current, 1);
            chai.assert.equal(HearthstoneStore.filters.hero, null);
            chai.assert.deepEqual(HearthstoneStore.filters.heroes, expectedHeroFilters);
            chai.assert.isBelow(HearthstoneStore.filters.cards.length, originalCardsLength);

            // Unselect current deck
            chai.assert.notEqual(HearthstoneStore.current, null);
            HearthstoneStore.loadDeck(1);
            chai.assert.equal(HearthstoneStore.current, null);
            chai.assert.deepEqual(HearthstoneStore.filters.heroes, originalHeroFilters);
            chai.assert.equal(HearthstoneStore.filters.cards.length, originalCardsLength);
        });
    });

    describe('addDeck(deckName, hero)', () => {
        it('should add a deck for a specific hero', () => {
            chai.assert.equal(HearthstoneStore.decks.length, 0);

            HearthstoneStore.addDeck('Foo', 'HERO_01');

            chai.assert.equal(HearthstoneStore.decks.length, 1);
            chai.assert.deepEqual(HearthstoneStore.decks, [{
                name: 'Foo',
                cards: [],
                hero: 'HERO_01',
                nbCards: 0,
                cost: 0
            }]);
        });
        it('should be present even after reinit', () => {
            chai.assert.equal(HearthstoneStore.decks.length, 1);
        });
    });

    describe('removeDeck(current)', () => {
        it('should remove a specific deck', () => {
            chai.assert.equal(HearthstoneStore.decks.length, 1);

            HearthstoneStore.addDeck('Bar', 'HERO_02');
            chai.assert.equal(HearthstoneStore.decks.length, 2);

            HearthstoneStore.removeDeck(1);
            chai.assert.equal(HearthstoneStore.decks.length, 1);

            HearthstoneStore.removeDeck(0);
            chai.assert.equal(HearthstoneStore.decks.length, 0);
        });

        it('should be cleaned even after reinit', () => {
            chai.assert.equal(HearthstoneStore.decks.length, 0);
        });
    });

    //describe('addCard(id)', () => {
    //    it('@TODO', () => {
    //    });
    //});

    // describe('addNewCard(card, cards, deck)', () => {
    //     it('@TODO', () => {
    //     });
    // });

    // describe('removeCard(id)', () => {
    //     it('@TODO', () => {
    //     });
    // });

    describe('changeLocale(locale)', () => {
        it('should change the app locale', () => {
            chai.assert.equal(HearthstoneStore.locale, 'frFR');
            HearthstoneStore.changeLocale('enUS');
            chai.assert.equal(HearthstoneStore.locale, 'enUS');
        });

        it('should keep the locale even after reinit', () => {
            chai.assert.equal(HearthstoneStore.locale, 'enUS');
            HearthstoneStore.changeLocale('frFR');
            chai.assert.equal(HearthstoneStore.locale, 'frFR');
        });
    });

    // describe('searchCard(value)', () => {
    //     it('@TODO', () => {
    //     });
    // });

    // describe('selectFilter(type, value)', () => {
    //     it('@TODO', () => {
    //     });
    // });

    // describe('toggleFilter(filter, value)', () => {
    //     it('@TODO', () => {
    //     });
    // });

    // describe('importDefaultDecks', () => {
    //     it('@TODO', () => {
    //     });
    // });

    describe('openMenu(menuItem)', () => {
        it('should open the right menu', () => {
            chai.assert.equal(HearthstoneStore.menu, 'menu');

            HearthstoneStore.openMenu('my-decks');

            chai.assert.equal(HearthstoneStore.menu, 'my-decks');
        });
    });

    // describe('reinitCollection()', () => {
    //     it('@TODO', () => {
    //     });
    // });

    // describe('initCards()', () => {
    //     it('@TODO', () => {
    //     });
    // });

    // describe('initCollection()', () => {
    //     it('@TODO', () => {
    //     });
    // });

    // describe('initHeroes(forFilters)', () => {
    //     it('@TODO', () => {
    //     });
    // });

    describe('write()', () => {
        it('should write decks to localStorage', () => {
            chai.assert.equal(HearthstoneStore.decks.length, 0);

            HearthstoneStore.decks.push({name: 'Foo'});
            HearthstoneStore.decks.push({name: 'Bar'});

            chai.assert.equal(HearthstoneStore.decks.length, 2);

            HearthstoneStore.write();
            HearthstoneStore.init();

            chai.assert.equal(HearthstoneStore.decks.length, 2);
        });

        it('should write locale to localStorage', () => {
            chai.assert.equal(HearthstoneStore.locale, 'frFR');

            HearthstoneStore.locale = 'enUS';

            chai.assert.equal(HearthstoneStore.locale, 'enUS');

            HearthstoneStore.write();
            HearthstoneStore.init();

            chai.assert.equal(HearthstoneStore.locale, 'enUS');
        });

        it('should write collection to localStorage', () => {
            chai.assert.equal(HearthstoneStore.collection.length, 133);

            HearthstoneStore.collection.push({name: 'Foo'});
            HearthstoneStore.collection.push({name: 'Bar'});

            chai.assert.equal(HearthstoneStore.collection.length, 135);

            HearthstoneStore.write();
            HearthstoneStore.init();

            chai.assert.equal(HearthstoneStore.collection.length, 135);
        });

        after(() => {
            HearthstoneStore.decks = [];
            HearthstoneStore.locale = 'frFR';
            HearthstoneStore.collection = HearthstoneStore.reinitCollection();

            HearthstoneStore.write();
        });
    });

    // describe('filterCards()', () => {
    //     it('@TODO', () => {
    //     });
    // });

    // describe('updateFilters()', () => {
    //     it('@TODO', () => {
    //     });
    // });

    describe('slugify(text)', () => {
        it('should clean text', () => {
            chai.assert.equal(HearthstoneStore.slugify(12), '12');
            chai.assert.equal(HearthstoneStore.slugify('AZER'), 'azer');
            chai.assert.equal(HearthstoneStore.slugify('Hello World'), 'hello world');
            chai.assert.equal(HearthstoneStore.slugify('àáâãäå éèêë œ'), 'aaaaaa eeee oe');
        });
    });

    describe('getLocale()', () => {
        it('should return proper locale', () => {
            chai.assert.equal(HearthstoneStore.getLocale(), 'frFR');
        });
    });

    describe('getComposedState()', () => {    
        it('should return valid store state', () => {
            let state = HearthstoneStore.getComposedState();

            chai.assert.typeOf(state.decks, 'array');
            chai.assert.typeOf(state.collection, 'array');
            chai.assert.typeOf(state.heroes, 'array');
            chai.assert.typeOf(state.cards, 'array');
            chai.assert.typeOf(state.menu, 'string');
            chai.assert.typeOf(state.filters, 'object');
            chai.assert.equal(state.current, null);
        });
    });

    // describe('getManaCurve(deck)', () => {
    //     it('@TODO', () => {
    //     });
    // });

    describe('getCardName(card, truncate)', () => {
        it('should return full card name', () => {
            let card = {id: 'CARD__42'};

            chai.assert.equal(HearthstoneStore.getCardName(card), 'CARD__42');
            chai.assert.equal(HearthstoneStore.getCardName(card, null), 'CARD__42');
        });

        it('should return truncate card name', () => {
            let card = {id: 'CARD__424242424242424242424242424242424242'};
            
            chai.assert.equal(HearthstoneStore.getCardName(card, true), 'CARD__42424242424242...');
        });

        it('should return translated card name', () => {
            let card = {id: 'FP1_011'};

            chai.assert.equal(HearthstoneStore.getCardName(card), 'Tisseuse');

            HearthstoneStore.locale = 'enUS';
            chai.assert.equal(HearthstoneStore.getCardName(card), 'Webspinner');

            HearthstoneStore.locale = 'ruRU';
            chai.assert.equal(HearthstoneStore.getCardName(card), 'Тенетник');
        });
    });

    describe('getCardImage(card, size)', () => {
        let card = {id: 'CARD__42'};

        it('should return large card\'s image', () => {
            chai.assert.equal(HearthstoneStore.getCardImage(card), '/images/cards/frFR/CARD__42.png');
            chai.assert.equal(HearthstoneStore.getCardImage(card, 'large'), '/images/cards/frFR/CARD__42.png');
        });

        it('should return small card\'s image', () => {
            chai.assert.equal(HearthstoneStore.getCardImage(card, 'small'), '/images/cards/small/CARD__42.png');
        });
    });

    describe('getHeroImage(hero, type)', () => {
        let hero = {id: 'HERO__42'};

        it('should return the path to default image', () => {
            chai.assert.equal(HearthstoneStore.getHeroImage(hero), '/images/heroes/HERO__42.png');
            chai.assert.equal(HearthstoneStore.getHeroImage(hero, 'default'), '/images/heroes/HERO__42.png');
        });
        it('should return the path to small image', () => {
            chai.assert.equal(HearthstoneStore.getHeroImage(hero, 'small'), '/images/heroes/HERO__42_small.png');
        });
    });

    describe('isInCollection(id)', () => {
        it('should be in collection', () => {
            chai.assert.equal(HearthstoneStore.isInCollection('CS2_200'), true);
        });
        it('shouldn\'t be in collection', () => {
            chai.assert.equal(HearthstoneStore.isInCollection('CARD__42'), false);
        });
    });

    // describe('getDeckCost(deck)', () => {
    //     it('@TODO', () => {
    //     });
    // });
});
