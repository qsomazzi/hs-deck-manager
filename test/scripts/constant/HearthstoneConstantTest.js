import chai                from 'chai';
import HearthstoneConstant from '../../../src/scripts/constant/HearthstoneConstant';

describe('HearthstoneConstantTest', () => {
    it('should contains all keys', () => {
        chai.assert.property(HearthstoneConstant, 'dust');
        chai.assert.isObject(HearthstoneConstant.dust);

        chai.assert.property(HearthstoneConstant, 'rarity');
        chai.assert.isObject(HearthstoneConstant.rarity);

        chai.assert.property(HearthstoneConstant, 'cardType');
        chai.assert.isArray(HearthstoneConstant.cardType);

        chai.assert.property(HearthstoneConstant, 'status');
        chai.assert.isArray(HearthstoneConstant.status);

        chai.assert.property(HearthstoneConstant, 'cardSet');
        chai.assert.isObject(HearthstoneConstant.cardSet);

        chai.assert.property(HearthstoneConstant, 'mechanics');
        chai.assert.isArray(HearthstoneConstant.mechanics);

        chai.assert.property(HearthstoneConstant, 'languages');
        chai.assert.isObject(HearthstoneConstant.languages);

        chai.assert.property(HearthstoneConstant, 'race');
        chai.assert.isArray(HearthstoneConstant.race);
    });

    it('should contains dust values', () => {
        chai.assert.property(HearthstoneConstant.dust, 'Free');
        chai.assert.equal(HearthstoneConstant.dust.Free, 0);
        chai.assert.property(HearthstoneConstant.dust, 'Common');
        chai.assert.equal(HearthstoneConstant.dust.Common, 40);
        chai.assert.property(HearthstoneConstant.dust, 'Rare');
        chai.assert.equal(HearthstoneConstant.dust.Rare, 100);
        chai.assert.property(HearthstoneConstant.dust, 'Epic');
        chai.assert.equal(HearthstoneConstant.dust.Epic, 400);
        chai.assert.property(HearthstoneConstant.dust, 'Legendary');
        chai.assert.equal(HearthstoneConstant.dust.Legendary, 1600);
    });

    it('should contains rarity values', () => {
        chai.assert.property(HearthstoneConstant.rarity, 'Free');
        chai.assert.property(HearthstoneConstant.rarity, 'Common');
        chai.assert.property(HearthstoneConstant.rarity, 'Rare');
        chai.assert.property(HearthstoneConstant.rarity, 'Epic');
        chai.assert.property(HearthstoneConstant.rarity, 'Legendary');
    });

    it('should contains cardTypes values', () => {
        chai.assert.include(HearthstoneConstant.cardType, 'Spell');
        chai.assert.include(HearthstoneConstant.cardType, 'Minion');
        chai.assert.include(HearthstoneConstant.cardType, 'Weapon');

        chai.assert.equal(HearthstoneConstant.cardType.length, 3);
    });

    it('should contains status values', () => {
        chai.assert.include(HearthstoneConstant.status, 'Owned');
        chai.assert.include(HearthstoneConstant.status, 'NotOwned');

        chai.assert.equal(HearthstoneConstant.status.length, 2);
    });

    it('should contains cardSet values', () => {
        chai.assert.property(HearthstoneConstant.cardSet, 'Basic');
        chai.assert.property(HearthstoneConstant.cardSet, 'Classic');
        chai.assert.property(HearthstoneConstant.cardSet, 'Naxxramas');
        chai.assert.property(HearthstoneConstant.cardSet, 'GoblinsvsGnomes');
        chai.assert.property(HearthstoneConstant.cardSet, 'Reward');
        chai.assert.property(HearthstoneConstant.cardSet, 'BlackrockMountain');
        chai.assert.property(HearthstoneConstant.cardSet, 'TheGrandTournament');
        chai.assert.property(HearthstoneConstant.cardSet, 'TheLeagueofExplorers');
    });

    it('should contains mechanics values', () => {
        chai.assert.include(HearthstoneConstant.mechanics, 'Battlecry');
        chai.assert.include(HearthstoneConstant.mechanics, 'Freeze');
        chai.assert.include(HearthstoneConstant.mechanics, 'Aura');
        chai.assert.include(HearthstoneConstant.mechanics, 'Taunt');
        chai.assert.include(HearthstoneConstant.mechanics, 'Charge');
        chai.assert.include(HearthstoneConstant.mechanics, 'Silence');
        chai.assert.include(HearthstoneConstant.mechanics, 'Overload');
        chai.assert.include(HearthstoneConstant.mechanics, 'Windfury');
        chai.assert.include(HearthstoneConstant.mechanics, 'Stealth');
        chai.assert.include(HearthstoneConstant.mechanics, 'DivineShield');
        chai.assert.include(HearthstoneConstant.mechanics, 'Deathrattle');
        chai.assert.include(HearthstoneConstant.mechanics, 'Secret');
        chai.assert.include(HearthstoneConstant.mechanics, 'Enrage');
        chai.assert.include(HearthstoneConstant.mechanics, 'Combo');
        chai.assert.include(HearthstoneConstant.mechanics, 'Inspire');

        chai.assert.equal(HearthstoneConstant.mechanics.length, 15);
    });

    it('should contains languages values', () => {
        chai.assert.property(HearthstoneConstant.languages, 'enUS');
        chai.assert.property(HearthstoneConstant.languages, 'frFR');
        chai.assert.property(HearthstoneConstant.languages, 'deDE');
        chai.assert.property(HearthstoneConstant.languages, 'esES');
        chai.assert.property(HearthstoneConstant.languages, 'itIT');
        chai.assert.property(HearthstoneConstant.languages, 'koKR');
        chai.assert.property(HearthstoneConstant.languages, 'plPL');
        chai.assert.property(HearthstoneConstant.languages, 'ptBR');
        chai.assert.property(HearthstoneConstant.languages, 'ruRU');
    });

    it('should contains race values', () => {
        chai.assert.include(HearthstoneConstant.race, 'Murloc');
        chai.assert.include(HearthstoneConstant.race, 'Beast');
        chai.assert.include(HearthstoneConstant.race, 'Demon');
        chai.assert.include(HearthstoneConstant.race, 'Totem');
        chai.assert.include(HearthstoneConstant.race, 'Pirate');
        chai.assert.include(HearthstoneConstant.race, 'Dragon');
        chai.assert.include(HearthstoneConstant.race, 'Mech');

        chai.assert.equal(HearthstoneConstant.race.length, 7);
    });
});
