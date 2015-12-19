import React, { Component, PropTypes } from 'react';
import { ListGroupItem }               from 'react-bootstrap';
import HearthstoneActions              from './../../action/HearthstoneActions';
import Export                          from './../export/Export';

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
                <span onClick={HearthstoneActions.loadDeck.bind(this, position)}>
                    <img src={`images/heroes/${deck.hero}_icon.png`} alt={deck.hero} />
                    <span>{deck.name}</span>
                </span>
                
                <div className="actions">
                    <span className="removeDeck" onClick={HearthstoneActions.removeDeck.bind(this, position)} >
                        <i className="fa fa-remove"></i>
                    </span>

                    <Export 
                        data={deck}
                        filename={`${deck.name}.deck.json`}
                        type="deck"
                        className="exportDeck" />
                </div>
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
