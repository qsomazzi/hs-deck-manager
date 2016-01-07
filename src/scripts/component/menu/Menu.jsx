import React, { Component, PropTypes } from 'react';
import { ListGroup, Modal }            from 'react-bootstrap';
import HearthstoneActions              from './../../action/HearthstoneActions';
import TranslationHelper               from './../../helper/TranslationHelper'
import DeckList                        from './../deck-list/DeckList';
import Collection                      from './../collection/Collection';

/**
 * Menu
 */
class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false
        };
    }

    renderMenu() {
        return (
            <ListGroup>
                <div className="list-group-item menu-btn" onClick={HearthstoneActions.openMenu.bind(this,'my-decks')}>
                    {TranslationHelper.translate('my-decks')}
                </div>

                <div className="list-group-item menu-btn" onClick={HearthstoneActions.openMenu.bind(this,'my-collection')}>
                    {TranslationHelper.translate('my-collection')}
                </div>
            </ListGroup>
        );
    }

    toggleModal() {
        this.setState({displayModal: !this.state.displayModal});
    }

    importDefaultDecks() {
        HearthstoneActions.importDefaultDecks();
        HearthstoneActions.openMenu('my-decks');
        this.toggleModal();
    }

    reinitCollection() {
        HearthstoneActions.reinitCollection();
        HearthstoneActions.openMenu('my-collection');
        this.toggleModal();
    }

    renderModal() {
        let { displayModal } = this.state;

        return (
            <Modal show={displayModal} onHide={this.toggleModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{TranslationHelper.translate('settings')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-settings">
                        <a onClick={this.importDefaultDecks.bind(this)}>
                            {TranslationHelper.translate('import-default')}
                        </a>

                        <a onClick={this.reinitCollection.bind(this)}>
                            {TranslationHelper.translate('reinit-collection')}
                        </a>
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
        let { decks, current, heroes, menu, collection } = this.props;
        let menuItem, menuTitle, menuAction;

        switch (menu) {
            case 'menu':
                menuItem   = this.renderMenu();
                menuTitle  = TranslationHelper.translate('menu');
                menuAction = <div className="menu-action" onClick={this.toggleModal.bind(this)}><i className="fa fa-cog"></i></div>;
                break;
            case 'my-decks':
                menuItem   = <DeckList heroes={heroes} decks={decks} current={current} />;
                menuTitle  = TranslationHelper.translate('my-decks');
                menuAction = <div className="menu-action" onClick={HearthstoneActions.openMenu.bind(this, 'menu')}><i className="fa fa-reply"></i></div>;
                break;
            case 'my-collection':
                menuItem   = <Collection collection={collection} />;
                menuTitle  = TranslationHelper.translate('my-collection');
                menuAction = <div className="menu-action" onClick={HearthstoneActions.openMenu.bind(this, 'menu')}><i className="fa fa-reply"></i></div>;
                break;
        }

        return (
            <div className="menu">
                <div className="title">
                    {menuTitle}
                </div>

                {menuItem}

                <div className="decks-count">
                    <span className="cpt">{decks.length}</span>
                    <span>decks</span>
                </div>

                {menuAction}
                {this.renderModal()}
            </div>
        );
    }
}

Menu.PropTypes = {
    current:    PropTypes.number,
    heroes:     PropTypes.array.isRequired,
    decks:      PropTypes.array.isRequired,
    collection: PropTypes.array.isRequired,
    menu:       PropTypes.string.isRequired
};

export default Menu;
