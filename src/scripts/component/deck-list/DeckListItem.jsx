import React, { Component, PropTypes } from 'react';
import { Modal, Button }               from 'react-bootstrap';
import classNames                      from 'classnames';
import _                               from 'lodash';
import HearthstoneActions              from './../../action/HearthstoneActions';
import HearthstoneStore                from './../../store/HearthstoneStore';
import TranslationHelper               from './../../helper/TranslationHelper'

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

    renderDeleteModal() {
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

        let style = {
            backgroundImage: `url('/images/heroes/${deck.hero}_deck.png')`
        };

        let itemClass = classNames('list-group-item', {
            error:  deck.nbCards != 30,
            active: current == position
        });

        let barSizesRendered = _.map(HearthstoneStore.getManaCurve(deck), (height, key) => {
            return <div key={key} className={`bar bar-${key}`} style={{height: height}}></div>;
        });

        return (
            <div className={itemClass} style={style}>
                <div className="deck-name" onClick={HearthstoneActions.loadDeck.bind(this, position)} title={deck.name} >
                    <span>{ deck.name.length < 15 ? deck.name : `${deck.name.substring(0, 15)}...`}</span>
                </div>
                <span className="removeDeck" onClick={this.toggleModal.bind(this)} ></span>

                <div className="mana-curve">
                    {barSizesRendered}
                </div>
                {this.renderDeleteModal()}
            </div>
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
