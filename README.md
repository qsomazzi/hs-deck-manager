# Hearthstone Deck Manager

[![Build Status](https://travis-ci.org/qsomazzi/hs-deck-manager.svg?branch=master)](https://travis-ci.org/qsomazzi/hs-deck-manager)
[![Codeship Status for qsomazzi/hs-deck-manager](https://codeship.com/projects/d2c87640-ac89-0133-dfd8-1e5da553331a/status?branch=master)](https://codeship.com/projects/131676)

This app will provide a fast and simple deck manager for Hearthstone. 
Users can easily create and share a deck.

## Live-Demo

[See a live demo of the last stable version](http://hearthstone.qsomazzi.fr)

## Features

* Manage as many deck as you want
* Import default builded decks
* Manage my collection
* Select language between :
    * `enUS`
    * `frFR`
    * `deDE`
    * `esES`
    * `itIT` 
    * `koKR`
    * `plPL`
    * `ptBR`
    * `ruRU`
    * `zhCN`
    * `jaJP`
* Export one deck to share it, or all your decks !
* Calculate deck dust's cost within your current collection
* Fast filters on cards list, find your card with the help of multiples filters
    * Card Name
    * Hero
    * Rarity
    * Card set
    * Card Type
    * Race
    * Mechanics
    * Status
    * Cost

## Planned features

* Add more Unit tests
* Add Lazy Load on media
* Add translations on cards images (`koKR`, `plPL` and `jaJP`)
* Add more mechanics filters
* Redesign Filters Bar
* Redesign scroll cursor
* Import JSON

## Requirement

* npm ~3.3.5
* gulp ~3.9.0

## Installation

Run in a cmd line the following commands
* `npm install`  
* Then :
    * `npm start` -> for prod (build assets)
    * `npm dev`   -> for dev (build assets, launch watchers and server)
    * `npm test`  -> for test (launching tests units)

## License

Licensed under [MIT](http://www.opensource.org/licenses/mit-license.php). 
Totally free for private or commercial projects.

## Resources

* [Blizzards assets](http://blizzard.gamespress.com)
* [HearthStone API](https://market.mashape.com/omgvamp/hearthstone)

## History

| Version |   Image   |    Date    |
|:-------:|:---------:|:----------:|
|    v0   | ![v0][v0] | 20/12/2015 |
|    v1   | ![v1][v1] | 03/01/2016 |
|    v2   | ![v2][v2] | 06/02/2016 |

[v0]: resources/docs/v0.png
[v1]: resources/docs/v1.png
[v2]: resources/docs/v2.png
