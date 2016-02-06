import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';
import DeckCurrentItem                 from './../deck-current/DeckCurrentItem';
import HearthstoneStore                from './../../store/HearthstoneStore';

/**
 * Collection
 */
class Collection extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { collection } = this.props;

        return (
            <div className="list-group">
                {_.map(HearthstoneStore.sortCards(collection), (card, key) => {
                    return <DeckCurrentItem card={card} key={`collection-item-${key}`} />;
                })}
            </div>
        );
    }
}

/**
 * PropTypes
 *
 * @type {array} collection
 */
Collection.PropTypes = {
    collection: PropTypes.array.isRequired
};

export default Collection;
