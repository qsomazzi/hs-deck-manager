import chai          from 'chai';
import Select2Helper from '../../../src/scripts/helper/Select2Helper';

describe('Select2HelperTest', () => {
    describe('renderHeroesOptions(filters)', () => {
        it('should render a formated list for heroes options', () => {
            let heroes  = {heroes: [{id: 'HERO_01'}, {id: 'HERO_09'}, {id: 'HERO_04'}, {id: 'HERO_08'}]};
            let options = Select2Helper.renderHeroesOptions(heroes);

            chai.assert.equal(options[0].value, 'HERO_01');
            chai.assert.equal(options[0].label, 'Garrosh Hurlenfer');
            chai.assert.equal(options[0].img, '/images/heroes/HERO_01_small.png');

            chai.assert.equal(options[1].value, 'HERO_09');
            chai.assert.equal(options[1].label, 'Anduin Wrynn');
            chai.assert.equal(options[1].img, '/images/heroes/HERO_09_small.png');

            chai.assert.equal(options[2].value, 'HERO_04');
            chai.assert.equal(options[2].label, 'Uther le Porteur de Lumière');
            chai.assert.equal(options[2].img, '/images/heroes/HERO_04_small.png');

            chai.assert.equal(options[3].value, 'HERO_08');
            chai.assert.equal(options[3].label, 'Jaina Portvaillant');
            chai.assert.equal(options[3].img, '/images/heroes/HERO_08_small.png');
        });
    });

    describe('renderImageOptions(filterType)', () => {
        it('should render a formated list for Images', () => {
            let options = Select2Helper.renderImageOptions('rarity');

            chai.assert.equal(options[0].value, 'Free');
            chai.assert.equal(options[0].label, 'Free');
            chai.assert.equal(options[0].img, 'images/resources/gem_free.png');

            chai.assert.equal(options[4].value, 'Legendary');
            chai.assert.equal(options[4].label, 'Legendary');
            chai.assert.equal(options[4].img, 'images/resources/gem_legendary.png');
        });
    });

    describe('renderTextOptions(filterType)', () => {
        it('should render a formated list for text', () => {
            let options = Select2Helper.renderTextOptions('status');

            chai.assert.equal(options[0].value, 'Owned');
            chai.assert.equal(options[0].label, 'Possédés');

            chai.assert.equal(options[1].value, 'NotOwned');
            chai.assert.equal(options[1].label, 'Non possédés');
        });
    });

    describe('renderOption(key, option)', () => {
        it('should render an option', () => {
            let value = Select2Helper.renderOption('bar', {label: 'FooBar', img: 'foo.png', value: 'foo'});

            chai.assert.isObject(value);
            chai.assert.equal(value.type, 'div');
            chai.assert.equal(value._store.props.children[0].type, 'img');
            chai.assert.equal(value._store.props.children[0]._store.props.src, 'foo.png');
            chai.assert.equal(value._store.props.children[0]._store.props.alt, 'foo');

            chai.assert.equal(value._store.props.children[1], 'bar.FooBar');
        });
    });

    describe('renderTextValue(filterType, option)', () => {
        it('should render a text value', () => {
            let value = Select2Helper.renderTextValue('bar', {value: 'foo'});

            chai.assert.isObject(value);
            chai.assert.equal(value.type, 'div');
            chai.assert.equal(value._store.props.children, 'bar.foo');
        });
    });

    describe('renderValue(option)', () => {
        it('should render an image value', () => {
            let value = Select2Helper.renderValue({img: 'foo.png', value: 'foo'});

            chai.assert.isObject(value);
            chai.assert.equal(value.type, 'img');
            chai.assert.equal(value._store.props.src, 'foo.png');
            chai.assert.equal(value._store.props.alt, 'foo');

        });
    });
});
