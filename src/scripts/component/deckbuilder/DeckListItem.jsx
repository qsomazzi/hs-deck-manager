import React, { Component, PropTypes } from 'react';
import { ListGroupItem }               from 'react-bootstrap';
import HearthstoneActions              from './../../action/HearthstoneActions';

/**
 * DeckListItem
 */
class DeckListItem extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { deck, position, current } = this.props;

        let active = current == position ? 'active' : '';

        return (
            <ListGroupItem active={active} >
                <img src={`images/heroes/${deck.hero}_icon.png`} alt={deck.hero} />
                <span onClick={HearthstoneActions.loadDeck.bind(this, position)}>{deck.name}</span>
                <span className="pull-right removeDeck" onClick={HearthstoneActions.removeDeck.bind(this, position)} >
                    <i className="fa fa-remove"></i>
                </span>
            </ListGroupItem>
        );
    }
}

DeckListItem.PropTypes = {
    deck: PropTypes.shape({
            name:  PropTypes.string.isRequired,
            hero:  PropTypes.string.isRequired,
            cards: PropTypes.array.isRequired
    }).isRequired,
    position: PropTypes.number.isRequired,
    current: PropTypes.number
};

export default DeckListItem;
