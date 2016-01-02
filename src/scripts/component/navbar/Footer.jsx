import React, { Component, PropTypes } from 'react';
import HearthstoneActions              from './../../action/HearthstoneActions';
import HearthstoneStore                from './../../store/HearthstoneStore';
import TranslationHelper               from './../../helper/TranslationHelper';
import Export                          from './../export/Export';

/**
 * Footer
 */
class Footer extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { decks } = this.props;
        let locale    = HearthstoneStore.getLocale();

        return (
            <div className="footer">
                <div className="footer-left"></div>

                <div className="footer-content">
                    <a className="import" onClick={HearthstoneActions.importDefaultDecks.bind(this)}>
                        {TranslationHelper.translate('import-default')}
                    </a>
                    <Export data={decks} filename="all-decks.json" className="export">
                        {TranslationHelper.translate('export-decks')}
                    </Export>
                    <a onClick={HearthstoneActions.changeLocale}>{locale == 'fr' ? 'English' : 'French'}</a>
                </div>

                <div className="footer-right"></div>
            </div>
        );
    }
}

Footer.PropTypes = {
    decks: PropTypes.array.isRequired
};

export default Footer;
