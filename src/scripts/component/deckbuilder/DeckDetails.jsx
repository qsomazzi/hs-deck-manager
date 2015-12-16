import React, { Component, PropTypes } from 'react';
import DeckDetailsItem                 from './DeckDetailsItem';
import _                               from 'lodash';
import HearthstoneStore                from '../../store/HearthstoneStore';
import TranslationHelper               from '../../helper/TranslationHelper';

/**
 * DeckDetails
 */
class DeckDetails extends Component {
    renderDeck() {
        let { decks, current } = this.props;

        let currentDeck = _.map(_.sortBy(decks[current].cards, 'cost'), (card, key) => {
            return <DeckDetailsItem card={card} key={key} />;
        });

        return (
            <div className="list">
                {currentDeck}
                <p className="cpt">
                    {HearthstoneStore.countCurrentDeck()} {TranslationHelper.translate('cards')}
                </p>
            </div>
        );
    }

    renderBlank() {
        return (
            <div className="designForBlank">
                {TranslationHelper.translate('no-deck-selected')}
            </div>
        );
    }

    /**
     * @return {XML}
     */
    render() {
        let { current } = this.props;

        return (
            <div className="panel panel-default deckdetails">
                {current != null ? this.renderDeck() : this.renderBlank()}
            </div>
        );
    }
}

DeckDetails.PropTypes = {
    current: PropTypes.number,
    decks:   PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            cards: PropTypes.array.isRequired
        })
    ).isRequired
};

export default DeckDetails;
