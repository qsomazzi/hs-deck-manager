import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';
import Card                            from './Card';
import TranslationHelper               from './../../helper/TranslationHelper';
import HearthstoneActions              from './../../action/HearthstoneActions';

/**
 * Cards
 */
class Cards extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { cards, nbCards, cristals } = this.props;

        return (
            <div className="cards-wrapper">
                <div className="cards">
                    {_.map(cards, (card, key) => {
                        return <Card key={`card-${key}`} card={card} />;
                    })}
                </div>

                <div className="cristals">
                    {_.map([0, 1, 2, 3, 4, 5, 6, 7], cost => {
                        return (
                            <img
                                key={`filter-${cost}`}
                                src={`images/resources/filter_${cost}${cristals[cost] ? '_active' : '' }.png`}
                                alt={cost}
                                onClick={HearthstoneActions.toggleFilter.bind(this, cost)} />
                        );
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
 * @type {array}  cristals
 * @type {number} nbCards
 * @type {object} card
 */
Cards.PropTypes = {
    cristals: PropTypes.array.isRequired,
    nbCards:  PropTypes.number.isRequired,
    cards:    PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Cards;
