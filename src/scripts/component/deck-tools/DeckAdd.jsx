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
                    <Modal.Title>{TranslationHelper.translate('add-deck')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        placeholder={TranslationHelper.translate('deck-name')}
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
                <div className={`add-deck ${HearthstoneStore.getLocale()}`} onClick={this.toggleModal.bind(this)} >
                    {TranslationHelper.translate('add')}
                </div>
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
