import chai              from 'chai';
import TranslationHelper from '../../../src/scripts/helper/TranslationHelper';

describe('TranslationHelperTest', () => {
    describe('translate(key, locale)', () => {
        it('should return the key when not found', () => {
            chai.assert.equal(TranslationHelper.translate('undefinedKey'), 'undefinedKey');
            chai.assert.equal(TranslationHelper.translate('undefinedKey', 'frFR'), 'undefinedKey');
            chai.assert.equal(TranslationHelper.translate('undefinedKey', 'enUS'), 'undefinedKey');
        });

        it('should return the some translation', () => {
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'deDE'), 'ui.addDeck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'enUS'), 'Add Deck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'esES'), 'ui.addDeck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'frFR'), 'Ajouter un deck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'itIT'), 'ui.addDeck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'jaJP'), 'ui.addDeck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'koKR'), 'ui.addDeck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'plPL'), 'ui.addDeck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'ptBR'), 'ui.addDeck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'ruRU'), 'ui.addDeck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'zhCN'), 'ui.addDeck');
            chai.assert.equal(TranslationHelper.translate('ui.addDeck', 'otherLocale'), 'Add Deck');
        });
    });
});
