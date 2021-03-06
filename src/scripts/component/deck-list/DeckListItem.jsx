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
    /**
     * Constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false
        };
    }

    /**
     * Display remove deck modal
     */
    toggleModal() {
        this.setState({displayModal: !this.state.displayModal});
    }

    /**
     * Remove a deck
     */
    removeDeck() {
        this.toggleModal();

        HearthstoneActions.removeDeck(this.props.position);
    }

    /**
     * Render remove deck modal
     *
     * @return {XML}
     */
    renderDeleteModal() {
        let { displayModal } = this.state;

        return (
            <Modal show={displayModal} onHide={this.toggleModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{TranslationHelper.translate('ui.remove')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-remove">
                        {TranslationHelper.translate('ui.confirmRemoveDeck')}

                        <img className="cancel" onClick={this.toggleModal.bind(this)} src="../images/ui/modal/cancel.png" alt={TranslationHelper.translate('ui.no')} />
                        <img className="confirm" onClick={this.removeDeck.bind(this)} src="../images/ui/modal/confirm.png" alt={TranslationHelper.translate('ui.yes')} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
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

/**
 * PropTypes
 *
 * @type {object} deck
 * @type {number} position
 * @type {number} current
 */
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
