import React, { Component, PropTypes }  from 'react';
import { ListGroupItem, Modal, Button } from 'react-bootstrap';
import HearthstoneActions               from './../../action/HearthstoneActions';
import TranslationHelper                from './../../helper/TranslationHelper'
import Export                           from './../export/Export';

/**
 * DeckListItem
 */
class DeckListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false
        };
    }

    toggleModal() {
        this.setState({displayModal: !this.state.displayModal});
    }

    removeDeck() {
        this.toggleModal();

        HearthstoneActions.removeDeck(this.props.position);
    }

    renderModal() {
        let { displayModal } = this.state;

        return (
            <Modal show={displayModal} onHide={this.toggleModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{TranslationHelper.translate('confirm-remove-deck')}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.toggleModal.bind(this)}>{TranslationHelper.translate('no')}</Button>
                    <Button bsStyle="success" onClick={this.removeDeck.bind(this)}>{TranslationHelper.translate('yes')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }

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
                    <span className="removeDeck" onClick={this.toggleModal.bind(this)} >
                        <i className="fa fa-remove"></i>
                    </span>
                    {this.renderModal()}

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
