import React, { Component }    from 'react';
import { ListenerMixin }       from 'reflux';
import { ButtonGroup, Button } from 'react-bootstrap';
import reactMixin              from 'react-mixin';
import classNames              from 'classnames';
import HearthstoneStore        from './../store/HearthstoneStore';
import HearthstoneActions      from './../action/HearthstoneActions';
import TranslationHelper       from './../helper/TranslationHelper';
import DeckList                from './deck-list/DeckList';
import DeckCurrent             from './deck-current/DeckCurrent';
import DeckAdd                 from './deck-tools/DeckAdd';
import Cards                   from './cards/Cards';
import NavBar                  from './navbar/NavBar';
import Export                  from './export/Export';

/**
 * Hearthstone
 */
class Hearthstone extends Component {
    constructor(props) {
        super(props);

        this.state = HearthstoneStore.getComposedState();
    }

    /**
     * Bind the component to the main Store
     */
    componentDidMount() {
        this.listenTo(HearthstoneStore, this.updateDecks);
    }

    /**
     * When the store is updated, update the component (and children) state
     */
    updateDecks() {
        this.setState(HearthstoneStore.getComposedState());
    }

    /**
     * @return {XML}
     */
    render() {
        let { locale, decks, current, heroes, filters, showModal } = this.state;

        let deckDetails      = current != null ? <DeckCurrent deck={decks[current]} /> : null;
        let currentDeckClass = classNames('panel deck-current', {
            active: current != null
        });

        return (
            <div>
                <img src="images/logo.png" className="logo" />

                <div className="main-app">
                    <div className="deck-builder">
                        <div className="deck-list">
                            <div className="my-decks">
                                {TranslationHelper.translate('my-decks')}
                            </div>

                            <DeckList
                                decks={decks}
                                current={current} />

                            <div className="decks-count">
                                <span className="cpt">{decks.length}</span>
                                <span>decks</span>
                            </div>

                            <DeckAdd
                                showModal={showModal}
                                heroes={heroes} />
                        </div>

                        <div className={currentDeckClass}>
                            {deckDetails}
                        </div>
                    </div>

                    <div className="panel panel-default search-area">
                        <NavBar
                            filters={filters}
                            nbCards={filters.cards.length} />

                        <Cards cards={filters.cards} />
                    </div>
                </div>

                <div className="credits">
                    <a className="btn btn-success import" onClick={HearthstoneActions.importDefaultDecks.bind(this)}>
                        {TranslationHelper.translate('import-default')}
                    </a>
                    <Export data={decks} filename="all-decks.json" className="btn btn-info export" >
                        {TranslationHelper.translate('export-decks')}
                    </Export>
                    <ButtonGroup>
                        <Button onClick={HearthstoneActions.changeLocale.bind(this, 'fr')} active={locale == 'fr'}>French</Button>
                        <Button onClick={HearthstoneActions.changeLocale.bind(this, 'en')} active={locale == 'en'}>English</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

reactMixin(Hearthstone.prototype, ListenerMixin);

export default Hearthstone;
