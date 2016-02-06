import React, { Component, PropTypes } from 'react';

/**
 * Export
 */
class Export extends Component {
    /**
     * @return {XML}
     */
    render() {
        let { data, filename, icon, className, children } = this.props;

        let href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;

        return (
            <a className={className} href={href} download={filename}>
                <i className={icon}></i> {children}
            </a>
        );
    }
}

/**
 * PropTypes
 *
 * @type {object} data
 * @type {string} filename
 * @type {string} classname
 * @type {string} icon
 */
Export.PropTypes = {
    data:      PropTypes.object.isRequired,
    filename:  PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    icon:      PropTypes.string
};

Export.defaultProp = {
    icon: null
};

export default Export;
