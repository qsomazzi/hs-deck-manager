import React, { Component, PropTypes } from 'react';
import DeckCurrentItem                 from './../deck-current/DeckCurrentItem';
import _                               from 'lodash';

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
                {_.map(_.sortByAll(collection, ['cost', 'name']), (card, key) => {
                    return <DeckCurrentItem card={card} key={`collection-item-${key}`} />;
                })}
            </div>
        );
    }
}

Collection.PropTypes = {
    collection: PropTypes.array.isRequired
};

export default Collection;
