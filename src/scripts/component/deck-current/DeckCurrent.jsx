import React, { Component, PropTypes } from 'react';
import DeckCurrentItem                 from './DeckCurrentItem';
import _                               from 'lodash';
import HearthstoneStore                from './../../store/HearthstoneStore';
import TranslationHelper               from './../../helper/TranslationHelper';
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

        let currentDeck = _.map(_.sortByAll(deck.cards, ['cost', 'nameFr']), (card, key) => {
            return <DeckCurrentItem card={card} key={`current-deck-item-${key}`} />;
        });

        return (
            <div className="list">
                {currentDeck}
                <p className="cpt">
                    <span>{deck.nbCards}</span>
                    <img src="./images/ui/deck-current/cards.png" alt="cards" />
                    <span>{HearthstoneStore.getDeckCost(deck)}</span>
                    <img src="./images/ui/deck-current/dust.png" alt="dust" />

                    <Export data={deck} filename={`${deck.name}.deck.json`} icon="fa fa-download" className="exportDeck" >
                        {TranslationHelper.translate('export-deck')}
                    </Export>
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
