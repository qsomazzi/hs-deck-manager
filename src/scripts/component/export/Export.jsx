import React, { Component, PropTypes } from 'react';
import TranslationHelper               from './../../helper/TranslationHelper';

/**
 * Export
 */
class Export extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { data, filename, type, className } = this.props;

        let href    = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
        let content = type == 'deck' ? <i className="fa fa-download"></i> : TranslationHelper.translate(`export-${type}`);

        return (
            <a className={className} href={href} download={filename}>
                {content}
            </a>
        );
    }
}

Export.PropTypes = {
    data:      PropTypes.object.isRequired,
    filename:  PropTypes.string.isRequired,
    type:      PropTypes.oneOf(['deck', 'decks']).isRequired,
    className: PropTypes.string.isRequired
};

export default Export;
