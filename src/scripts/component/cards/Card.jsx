import React, { Component, PropTypes } from 'react';
import classNames                      from 'classnames';
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

        let cardClass = classNames('card', {
            owned: HearthstoneStore.isInCollection(card.id)
        });

        return (
            <div className={cardClass}>
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
