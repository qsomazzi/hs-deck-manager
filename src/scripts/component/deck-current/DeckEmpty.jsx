import React, { Component, PropTypes } from 'react';
import TranslationHelper               from '../../helper/TranslationHelper';

/**
 * DeckEmpty
 */
class DeckEmpty extends Component {
    /**
     * @return {XML}
     */
    render() {
        return (
            <div className="designForBlank">
                {TranslationHelper.translate('no-deck-selected')}
            </div>
        );
    }
}

export default DeckEmpty;
