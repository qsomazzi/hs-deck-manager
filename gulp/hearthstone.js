import gulp                from 'gulp';
import request             from 'request';
import _                   from 'lodash';
import http                from 'http';
import fs                  from 'fs';
import GraphicsMagick      from 'gm';
import requestSync         from 'sync-request';
import sleep               from 'sleep';
import HearthstoneConstant from '../src/scripts/constant/HearthstoneConstant.jsx';

var headers = {'X-Mashape-Key': '#'};
var url     = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1&locale=';

function getAndOptimizeCardImage(card, cpt, cardsFolder, locale) {
    let fileName = cardsFolder + locale + '/' + card.cardId + '.png';

    if (!fs.existsSync(fileName)) {
        console.log('[' + locale + '][' + card.cardId+ '] Trying to get card image (' + cpt + ')');
        let cardImageResponse = requestSync('GET', card.img);

        if (cardImageResponse.statusCode == 200) {
            console.log('[' + locale + '][' + card.cardId+ '] Trying to write card image (' + cpt + ')');
            fs.writeFileSync(fileName, cardImageResponse.getBody());

            GraphicsMagick(fileName)
                .trim()
                .resize(190)
                .noProfile()
                .quality(90)
                .write(fileName, err => {
                    if (err) {
                        console.log(err);
                    }
                })
            ;

            console.log('[' + locale + '][' + card.cardId+ '] Success ! (' + cpt + ')');
        } else {
            console.log('[' + locale + '][' + card.cardId+ '] ---------------> Error : Can\'t get card image (' + card.img + ')');
        }

        // Force sleep for 2s to avoid ban
        sleep.sleep(2);
    } else {
        console.log('[' + locale + '][' + card.cardId+ '] Already exist (' + cpt + ')');
    }
}

gulp.task('cards',  () => {
    // Get Cards and Heroes
    console.log('Call API');
    let allCards = [];
    let heroes   = [];
    let response = requestSync('GET', url + 'enUS', {headers: headers});

    console.log('Parsing results');
    _.forEach(JSON.parse(response.getBody()), cardsByType => {
        _.forEach(cardsByType, card => {
            if (card.cardSet != 'Hero Skins') {
                if (card.type != 'Hero') {
                    let mechanics = null;

                    if (card['mechanics'] != undefined) {
                        mechanics = [];
                        _.forEach(card['mechanics'], mechanic => {
                            mechanics.push({name: mechanic.name.replace(/ /, '')})
                        });
                    }

                    allCards.push({
                        id:          card.cardId,
                        cost:        card.cost,
                        cardSet:     card.cardSet == 'Promotion' ? 'Reward' : card.cardSet.replace(/ /g, ''),
                        type:        card.type,
                        rarity:      card.rarity,
                        playerClass: card['playerClass'] != undefined ? card.playerClass : null,
                        race:        card['race'] != undefined ? card.race : null,
                        mechanics:   mechanics
                    });
                } else {
                    heroes.push({
                        id:          card.cardId,
                        name:        card.name,
                        playerClass: card.playerClass
                    });
                }
            }
        });
    });

    console.log('Writing File...');
    fs.writeFileSync('src/scripts/resources/Cards.json', JSON.stringify(allCards));
    fs.writeFileSync('src/scripts/resources/Heroes.json', JSON.stringify(heroes));

    // Build translations
    _.each(HearthstoneConstant.languages, (path, locale) => {
        console.log('[' + locale + '] Start');

        console.log('[' + locale + '] Calling API');
        let response   = requestSync('GET', url + locale, {headers: headers});
        let base       = require('../resources/translations/' + locale + '.js');
        let newLocale  = _.cloneDeep(base.default);

        newLocale.locale = locale;
        newLocale.cards  = {};

        console.log('[' + locale + '] Parsing results');
        _.forEach(JSON.parse(response.getBody()), cardsByType => {
            _.forEach(cardsByType, card => {
                if (card.cardSet != "Hero Skins") {
                    newLocale.cards[card.cardId] = card.name;
                }
            });
        });

        console.log('[' + locale + '] Writing translation');
        fs.writeFileSync('src/scripts/resources/' + locale + '.json', JSON.stringify(newLocale));

        console.log('[' + locale + '] Done.');
    });

    console.log('Everything goes perfect ! ');
});

gulp.task('images',  () => {
    let cardsFolder = 'src/images/cards/';

    _.each(HearthstoneConstant.languages, (path, locale) => {
        console.log('[' + locale + '] Start');

        if (!fs.existsSync(cardsFolder + locale)) {
            console.log('[' + locale + '] Creating images directory');
            fs.mkdirSync(cardsFolder + locale);
        }

        console.log('[' + locale + '] Calling API');
        let cardsResponse = requestSync('GET', url + locale, {headers: headers});

        console.log('[' + locale + '] Parsing results');
        let cpt = 1;
        _.forEach(JSON.parse(cardsResponse.getBody()), cardsByType => {
            _.forEach(cardsByType, card => {
                if (card.cardSet != 'Hero Skins' && card.type != 'Hero') {
                    getAndOptimizeCardImage(card, cpt, cardsFolder, locale);

                    cpt++;
                }
            });
        });

        console.log('[' + locale + '] End');
    });

    console.log('Everything goes perfect ! ');
    process.exit(0);
});
