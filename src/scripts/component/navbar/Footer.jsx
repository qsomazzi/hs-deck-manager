import React, { Component, PropTypes } from 'react';
import HearthstoneActions              from './../../action/HearthstoneActions';
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

        return (
            <div className="footer">
                <div className="footer-left"></div>

                <div className="footer-content">
                    <Export data={decks} filename="all-decks.json" className="export">
                        {TranslationHelper.translate('ui.exportDecks')}
                    </Export>
                </div>

                <div className="footer-right"></div>
            </div>
        );
    }
}

/**
 * PropTypes
 *
 * @type {array} decks
 */
Footer.PropTypes = {
    decks: PropTypes.array.isRequired
};

export default Footer;
