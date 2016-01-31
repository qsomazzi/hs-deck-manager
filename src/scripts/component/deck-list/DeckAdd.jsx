import React, { Component, PropTypes } from 'react';
import { Modal }                       from 'react-bootstrap';
import _                               from 'lodash';
import classNames                      from 'classnames';
import HearthstoneActions              from './../../action/HearthstoneActions';
import HearthstoneStore                from './../../store/HearthstoneStore';
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

    selectHero(id) {
        this.setState({
            selectedHero: id
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
        let { heroes }                     = this.props;
        let { selectedHero, displayModal } = this.state;

        return (
            <Modal show={displayModal} onHide={this.toggleModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{TranslationHelper.translate('ui.addDeck')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-add">
                        <div className="heroes">
                            {_.map(heroes, (hero, key) => {
                                let heroClass = classNames('hero', {
                                    'active': selectedHero == hero.id
                                });

                                return (
                                    <div key={`hero-${key}`} className={heroClass} onClick={this.selectHero.bind(this, hero.id)}>
                                        <img src={HearthstoneStore.getHeroImage(hero)} alt={hero.name} />
                                    </div>
                                );
                            })}

                            <div className="clearfix" ></div>
                        </div>

                        <input
                            type="text"
                            className="form-control"
                            placeholder={TranslationHelper.translate('ui.deckName')}
                            onKeyDown={this.addDeck.bind(this)} />
                        <input type="hidden" ref="selected-hero" value={selectedHero} />
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
        return (
            <div className="list-group-item menu-btn" onClick={this.toggleModal.bind(this)}>
                {TranslationHelper.translate('ui.addDeck')}
                {this.renderModal()}
            </div>
        );
    }
}

DeckAdd.PropTypes = {
    heroes: PropTypes.array.isRequired
};

export default DeckAdd;
