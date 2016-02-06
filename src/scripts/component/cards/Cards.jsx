import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';
import Card                            from './Card';
import TranslationHelper               from './../../helper/TranslationHelper';

/**
 * Cards
 */
class Cards extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { cards, nbCards } = this.props;

        return (
            <div className="cards-wrapper">
                <div className="cards">
                    {_.map(cards, (card, key) => {
                        return <Card key={`card-${key}`} card={card} />;
                    })}
                </div>

                <p className="cards-cpt">
                    {`${nbCards} ${TranslationHelper.translate('ui.cards')}`}
                </p>
            </div>
        );
    }
}

/**
 * PropTypes
 *
 * @type {number} nbCards
 * @type {object} card
 */
Cards.PropTypes = {
    nbCards: PropTypes.number.isRequired,
    cards:   PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Cards;
