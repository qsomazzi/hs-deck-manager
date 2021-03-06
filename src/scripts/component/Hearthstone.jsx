import React, { Component }    from 'react';
import { ListenerMixin }       from 'reflux';
import reactMixin              from 'react-mixin';
import classNames              from 'classnames';
import HearthstoneStore        from './../store/HearthstoneStore';
import HearthstoneActions      from './../action/HearthstoneActions';
import TranslationHelper       from './../helper/TranslationHelper';
import DeckCurrent             from './deck-current/DeckCurrent';
import Menu                    from './menu/Menu';
import Cards                   from './cards/Cards';
import NavBar                  from './navbar/NavBar';
import Footer                  from './navbar/Footer';

/**
 * Hearthstone
 */
class Hearthstone extends Component {
    /**
     * Constructor
     *
     * @param props
     */
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
        let { decks, current, heroes, filters, menu, collection } = this.state;

        let deckDetails      = current != null ? <DeckCurrent deck={decks[current]} /> : null;
        let currentDeckClass = classNames('panel deck-current', {
            active: current != null
        });

        return (
            <div>
                <img src="images/logo.png" className="logo" />

                <div className="main-app">
                    <div className="deck-builder">
                        <Menu
                            heroes={heroes}
                            decks={decks}
                            current={current}
                            menu={menu}
                            collection={collection} />

                        <div className={currentDeckClass}>
                            {deckDetails}
                        </div>
                    </div>

                    <div className="search-area">
                        <NavBar
                            filters={filters}
                            current={current} />

                        <Cards
                            cristals={filters.cristal}
                            cards={filters.cards}
                            nbCards={filters.cards.length} />
                    </div>
                </div>

                <Footer decks={decks} />
            </div>
        );
    }
}

reactMixin(Hearthstone.prototype, ListenerMixin);

export default Hearthstone;
