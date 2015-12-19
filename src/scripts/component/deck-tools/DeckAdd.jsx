import React, { Component, PropTypes } from 'react';
import { Button, Modal }               from 'react-bootstrap';
import _                               from 'lodash';
import classNames                      from 'classnames';
import HearthstoneActions              from './../../action/HearthstoneActions';
import TranslationHelper               from './../../helper/TranslationHelper'

/**
 * DeckAdd
 */
class DeckAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedHero: "HERO_01",
            displayModal: false
        };
    }

    selectHero(cardId) {
        this.setState({
            selectedHero: cardId
        });
    }

    addDeck(e) {
        if (e.keyCode == 13) {
            this.toggleModal();
            HearthstoneActions.addDeck(e.target.value, this.state.selectedHero);
        }
    }


    toggleModal() {
        this.setState({displayModal: !this.state.displayModal});
    }

    renderModal() {
        let { heroes } = this.props;
        let { selectedHero, displayModal } = this.state;

        return (
            <Modal show={displayModal} onHide={this.toggleModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{TranslationHelper.translate('add-deck')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{TranslationHelper.translate('hero-selection')}</h4>
                    <div className="heroes">
                        {_.map(heroes, (hero, key) => {
                            let heroClass = classNames('hero', {
                                'active': selectedHero == hero.cardId
                            });

                            return (
                                <div key={`hero-${key}`} className={heroClass} onClick={this.selectHero.bind(this, hero.cardId)}>
                                    <img src={`images/heroes/${hero.cardId}.png`} alt={hero.name} />
                                </div>
                            );
                        })}

                        <div className="clearfix" ></div>
                    </div>

                    <h4>{TranslationHelper.translate('deck-name')}</h4>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={TranslationHelper.translate('add-deck')}
                        onKeyDown={this.addDeck.bind(this)} />
                    <input type="hidden" ref="selected-hero" value={selectedHero} />
                </Modal.Body>
            </Modal>
        );
    }

    /**
     * @return {XML}
     */
    render() {
        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    block
                    onClick={this.toggleModal.bind(this)} >
                    {TranslationHelper.translate('add-deck')}
                </Button>
                {this.renderModal()}
            </div>
        );
    }
}

DeckAdd.PropTypes = {
    showModal: PropTypes.bool.isRequired,
    heroes:    PropTypes.array.isRequired
};

export default DeckAdd;
