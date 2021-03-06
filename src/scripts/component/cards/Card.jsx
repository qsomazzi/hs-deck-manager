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
            owned:      HearthstoneStore.isInCollection(card.id),
            selectable: HearthstoneStore.isSelectable()
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

/**
 * PropTypes
 *
 * @type {object} card
 */
Card.PropTypes = {
    card: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired
};

export default Card;
