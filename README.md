Hearthstone Deck Manager
========================

[![Build Status](https://travis-ci.org/qsomazzi/hs-deck-manager.svg?branch=master)](https://travis-ci.org/qsomazzi/hs-deck-manager)
[![Codeship Status for qsomazzi/hs-deck-manager](https://codeship.com/projects/d2c87640-ac89-0133-dfd8-1e5da553331a/status?branch=master)](https://codeship.com/projects/131676)

[DEMO](http://hearthstone.qsomazzi.fr)

Require
-------
- npm ~3.3.5
- gulp ~3.9.0

Installation
------------

Run in a cmd line the following commands
- `npm install`
    - `npm start` -> for prod (build assets)
    - `npm dev`   -> for dev (build assets, launch watchers and server)
    - `npm test`  -> for test (launching tests units)

Contributions
-------------

Feel free to contribute to this project. You can submit a PR or an issue, I will look into it as soon as possible.
*Note* : All files located under `/src/scripts/resources/` are generated with API calls, don't edit them manually. 

Features that needs to be developed
-----------------------------------

With 'priority' order

* Bug
    * Wrong Sort in Collection and Current deck
* High
    * Add Lazy Load on media
    * Redesign Filters Bar
    * Redesign scroll cursor
    * Redesign search area
* Low
    * Import JSON

Resources
---------

- [Blizzards assets](http://blizzard.gamespress.com)
- [HearthStone API](https://market.mashape.com/omgvamp/hearthstone)


History
-------

| Version |                          Image                          |    Date    |
|:-------:|:-------------------------------------------------------:|:----------:|
|    v0   |                        ![v0][v0]                        | 20/12/2015 |
|    v1   |                        ![v1][v1]                        | 29/12/2015 |
|   v1.1  | ![v1.1-menu][v1.1-menu] ![v1.1-my-decks][v1.1-my-decks] | 03/01/2016 |


[v0]: resources/docs/v0.png
[v1]: resources/docs/v1.png
[v1.1-menu]: resources/docs/v1.1-menu.png
[v1.1-my-decks]: resources/docs/v1.1-my-decks.png
