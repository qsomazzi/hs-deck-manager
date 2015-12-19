import React, { Component, PropTypes } from 'react';
import { ListGroup }                   from 'react-bootstrap';
import _                               from 'lodash';
import HearthstoneActions              from './../../action/HearthstoneActions';
import DeckListItem                    from './DeckListItem';

/**
 * DeckList
 */
class DeckList extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { decks, current } = this.props;

        let deckList = _.map(decks, (deck, position) => {
            return <DeckListItem key={`deck-list-item-${position}`} deck={deck} position={position} current={current} />;
        });

        return (
            <ListGroup>
                {deckList}
            </ListGroup>
        );
    }
}

DeckList.PropTypes = {
    decks:   PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            cards: PropTypes.array.isRequired
        })
    ).isRequired,
    current: PropTypes.number
};

export default DeckList;
