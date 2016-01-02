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
                <img
                    src={HearthstoneStore.getCardImage(card)}
                    alt={HearthstoneStore.getCardName(card)}
                    onClick={HearthstoneActions.addCard.bind(this, card.id)} />
            </div>
        );
    }
}

Card.PropTypes = {
    card: PropTypes.shape({
        nameFr: PropTypes.string.isRequired,
        nameEn: PropTypes.string.isRequired,
        id:     PropTypes.string.isRequired
    }).isRequired
};

export default Card;
