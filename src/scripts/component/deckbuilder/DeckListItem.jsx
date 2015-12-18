import React, { Component, PropTypes } from 'react';
import { ListGroupItem }               from 'react-bootstrap';
import HearthstoneActions              from './../../action/HearthstoneActions';
import TranslationHelper               from './../../helper/TranslationHelper';

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
        let data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(deck));

        return (
            <ListGroupItem active={active} >
                <img src={`images/heroes/${deck.hero}_icon.png`} alt={deck.hero} />
                <span onClick={HearthstoneActions.loadDeck.bind(this, position)}>{deck.name}</span>
                <div className="actions">
                    <span className="removeDeck" onClick={HearthstoneActions.removeDeck.bind(this, position)} >
                        <i className="fa fa-remove"></i>
                    </span>
                    <a className="exportDeck" href={data} download={`${deck.name}.deck.json`} title={TranslationHelper.translate('export-decks')}>
                        <i className="fa fa-download"></i>
                    </a>
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
