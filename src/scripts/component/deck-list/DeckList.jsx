import React, { Component, PropTypes } from 'react';
import { ListGroup }                   from 'react-bootstrap';
import _                               from 'lodash';
import DeckListItem                    from './DeckListItem';
import DeckAdd                         from './DeckAdd';

/**
 * DeckList
 */
class DeckList extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { decks, current, heroes } = this.props;

        return (
            <ListGroup>
                <DeckAdd heroes={heroes} />

                {_.map(decks, (deck, position) => {
                    return <DeckListItem key={`deck-list-item-${position}`} deck={deck} position={position} current={current} />;
                })}
            </ListGroup>
        );
    }
}

/**
 * PropTypes
 *
 * @type {number} current
 * @type {array}  heroes
 * @type {array}  decks
 */
DeckList.PropTypes = {
    current: PropTypes.number,
    heroes:  PropTypes.array.isRequired,
    decks:   PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            cards: PropTypes.array.isRequired
        })
    ).isRequired
};

export default DeckList;
