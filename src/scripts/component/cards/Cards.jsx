import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';
import Card                            from './Card';

/**
 * Cards
 */
class Cards extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { cards } = this.props;

        return (
            <div className="cards">
                {_.map(cards, (card, key) => {
                    return <Card key={`card-${key}`} card={card} />;
                })}
            </div>
        );
    }
}

/**
 * PropTypes
 *
 * @type {object} card
 */
Cards.PropTypes = {
    cards:  PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Cards;
