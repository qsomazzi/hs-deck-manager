import React, { Component, PropTypes } from 'react';
import HearthstoneActions              from './../../action/HearthstoneActions';
import HearthstoneStore                from './../../store/HearthstoneStore';

/**
 * Card
 */
class Card extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { card } = this.props;

        return (
            <div className="card">
                <img src={`images/cards/${HearthstoneStore.getLocale()}/${card.cardId}.png`} alt={card.name} onClick={HearthstoneActions.addCard.bind(this, card.cardId)} />
            </div>
        );
    }
}

Card.PropTypes = {
    card: PropTypes.shape({
        name:   PropTypes.string.isRequired,
        cardId: PropTypes.string.isRequired
    }).isRequired
};

export default Card;
