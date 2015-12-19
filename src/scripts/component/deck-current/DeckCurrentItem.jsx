import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';
import classNames                      from 'classnames';
import HearthstoneActions              from './../../action/HearthstoneActions';

/**
 * DeckCurrentItem
 */
class DeckCurrentItem extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { card } = this.props;

        let costClass = classNames('cost', {
            'expensive': card.cost > 9
        });
        let countBoxClass = classNames('countbox', {
            'enable': card.count == 2 || card.rarity == 'Legendary'
        });

        let cardImg = `/images/cards/small/${card.cardId}.png`;

        return (
            <p onClick={HearthstoneActions.removeCard.bind(this, card.cardId)} className="frame" style={{backgroundImage: `url('/images/resources/frame.png'), url('${cardImg}')`}}>
                <span className={costClass}>{card.cost}</span>
                <span className="name">{ card.name.length < 20 ? card.name : `${card.name.substring(0, 20)}...`}</span>

                <span className={countBoxClass}>
                    {card.count == 2 ? <img src="/images/resources/frame_2.png" alt="2"/> : ''}
                    {card.rarity == 'Legendary' ? <img src="/images/resources/frame_legendary.png" alt="*"/> : ''}
                </span>
            </p>
        );
    }
}

DeckCurrentItem.PropTypes = {
    card: PropTypes.shape({
        name:   PropTypes.string.isRequired,
        cost:   PropTypes.number.isRequired,
        count:  PropTypes.number.isRequired,
        cardId: PropTypes.string.isRequired
    }).isRequired
};

export default DeckCurrentItem;
