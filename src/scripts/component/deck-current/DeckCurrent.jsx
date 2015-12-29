import React, { Component, PropTypes } from 'react';
import DeckCurrentItem                 from './DeckCurrentItem';
import _                               from 'lodash';
import TranslationHelper               from '../../helper/TranslationHelper';
import Export                          from './../export/Export';

/**
 * DeckCurrent
 */
class DeckCurrent extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { deck } = this.props;

        let currentDeck = _.map(_.sortBy(deck.cards, 'cost'), (card, key) => {
            return <DeckCurrentItem card={card} key={`current-deck-item-${key}`} />;
        });

        return (
            <div className="list">
                {currentDeck}
                <p className="cpt">
                    <span>{deck.nbCards}</span>
                    <img src="./images/resources/cards.png" alt="cards" />
                    <span>{deck.cost}</span>
                    <img src="./images/resources/dust.png" alt="dust" />

                    <Export
                        data={deck}
                        filename={`${deck.name}.deck.json`}
                        type="deck"
                        className="exportDeck" />
                </p>
            </div>
        );
    }
}

DeckCurrent.PropTypes = {
    deck: PropTypes.shape({
        name: PropTypes.string.isRequired,
        cards: PropTypes.array.isRequired
    }).isRequired
};

export default DeckCurrent;
