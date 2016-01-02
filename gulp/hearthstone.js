import gulp    from 'gulp';
import request from 'request';
import _       from 'lodash';
import fs      from 'fs';

var apiKey = '#';

gulp.task('cards',  () => {
    let headers = {'X-Mashape-Key': apiKey};
    let url     = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1&locale=';

    // Get Cards FR
    request({url: url + 'frFR', headers: headers}, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let cardsFr = {};

            console.log('Parsing Cards - FR');
            _.forEach(JSON.parse(body), cardsByType => {
                _.forEach(cardsByType, card => {
                    cardsFr[card.cardId] = card.name;
                });
            });

            // Get Cards EN
            request({url: url + 'enUS', headers: headers}, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let allCards = [];

                    console.log('Parsing Cards - EN');
                    _.forEach(JSON.parse(body), cardsByType => {
                        _.forEach(cardsByType, card => {
                            if (card.cardSet != "Hero Skins" && card.type != "Hero") {
                                let hsCard = {
                                    id:          card.cardId,
                                    nameFr:      cardsFr[card.cardId],
                                    nameEn:      card.name,
                                    cost:        card.cost,
                                    cardSet:     card.cardSet == "Promotion" ? "Reward" : card.cardSet,
                                    type:        card.type,
                                    rarity:      card.rarity,
                                    playerClass: card['playerClass'] != undefined ? card.playerClass : null,
                                    mechanics:   card['mechanics']   != undefined ? card.mechanics   : null
                                };

                                allCards.push(hsCard);
                            }
                        });
                    });

                    console.log('Writing File...');
                    fs.writeFileSync('resources/json/Cards.json', JSON.stringify(allCards));
                    console.log('Done !');
                }
            });
        }
    });
});

gulp.task('heroes',  () => {
    let headers = {'X-Mashape-Key': apiKey};
    let url     = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1&locale=frFR';

    request({url: url, headers: headers}, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let heroes = [];

            console.log('Parsing Heroes');
            _.forEach(JSON.parse(body), cardsByType => {
                _.forEach(cardsByType, card => {
                    if (card.cardSet == "Basic" && card.type == 'Hero') {
                        let hero = {
                            id:          card.cardId,
                            name:        card.name,
                            playerClass: card.playerClass
                        };

                        heroes.push(hero);
                    }
                });
            });

            console.log('Writing File...');
            fs.writeFileSync('resources/json/Heroes.json', JSON.stringify(heroes));
            console.log('Done !');
        }
    });
});
