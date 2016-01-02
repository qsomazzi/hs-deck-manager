import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';
import classNames                      from 'classnames';
import HearthstoneActions              from './../../action/HearthstoneActions';
import HearthstoneStore                from './../../store/HearthstoneStore';

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

        return (
            <p onClick={HearthstoneActions.removeCard.bind(this, card.id)} className="frame" style={{backgroundImage: `url('/images/resources/frame.png'), url('${HearthstoneStore.getCardImage(card, 'small')}')`}}>
                <span className={costClass}>{card.cost}</span>
                <span className="name">{HearthstoneStore.getCardName(card, 20)}</span>

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
        nameFr: PropTypes.string.isRequired,
        nameEn: PropTypes.string.isRequired,
        cost:   PropTypes.number.isRequired,
        count:  PropTypes.number.isRequired,
        id:     PropTypes.string.isRequired
    }).isRequired
};

export default DeckCurrentItem;
