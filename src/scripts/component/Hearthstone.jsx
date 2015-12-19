import React, { Component }    from 'react';
import { ListenerMixin }       from 'reflux';
import { ButtonGroup, Button } from 'react-bootstrap';
import reactMixin              from 'react-mixin';
import HearthstoneStore        from './../store/HearthstoneStore';
import HearthstoneActions      from './../action/HearthstoneActions';
import DeckList                from './deck-list/DeckList';
import DeckCurrent             from './deck-current/DeckCurrent';
import DeckEmpty               from './deck-current/DeckEmpty';
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

        let deckDetails = current != null ? <DeckCurrent deck={decks[current]} /> : <DeckEmpty />;

        return (
            <div>
                <img src="images/logo.png" className="logo" />

                <div className="main-app">
                    <div className="deck-builder">
                        <div className="deck-list">
                            <DeckList
                                decks={decks}
                                current={current} />

                            <DeckAdd
                                showModal={showModal}
                                heroes={heroes} />
                        </div>

                        <div className="panel panel-default deckdetails">
                            {deckDetails}
                        </div>
                    </div>

                    <div className="panel panel-default search-area">
                        <NavBar
                            filters={filters}
                            heroes={filters.heroes}
                            nbCards={filters.cards.length} />
                        <Cards cards={filters.cards} />
                    </div>
                </div>

                <div className="credits">
                    <Export 
                        data={decks}
                        filename="all-decks.json" 
                        type="decks"
                        className="btn btn-info export" />
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
