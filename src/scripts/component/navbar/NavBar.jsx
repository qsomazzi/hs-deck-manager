import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';
import Select                          from 'react-select';
import classNames                      from 'classnames';
import HearthstoneActions              from './../../action/HearthstoneActions';
import HearthstoneStore                from './../../store/HearthstoneStore';
import TranslationHelper               from './../../helper/TranslationHelper';
import Select2Helper                   from './../../helper/Select2Helper';
import HearthstoneConstant             from './../../constant/HearthstoneConstant';

/**
 * NavBar
 */
class NavBar extends Component {
    /**
     * Search a card
     *
     * @param {object} event
     */
    searchCard(event) {
        HearthstoneActions.searchCard(event.target.value);
    }

    /**
     * Select one filter
     *
     * @param {string} type
     * @param {string} value
     */
    selectFilter(type, value) {
        HearthstoneActions.selectFilter(type, value);
    }

    /**
     * @return {XML}
     */
    render() {
        let { filters, current } = this.props;

        let navBarClass = classNames('navbar', {
            'small': current !== null
        });

        return (
            <nav className={navBarClass}>
                <div className="filters">
                    <input
                        type="text"
                        className="search form-control"
                        placeholder={TranslationHelper.translate('ui.search')}
                        onChange={this.searchCard.bind(this)} />

                    <Select
                        value={filters.hero != null ? filters.hero.id : null}
                        options={Select2Helper.renderHeroesOptions(filters)}
                        placeholder={TranslationHelper.translate('ui.hero')}
                        onChange={this.selectFilter.bind(this, 'hero')}
                        optionRenderer={Select2Helper.renderOption.bind(this, null)}
                        valueRenderer={Select2Helper.renderValue}
                        className="heroes" />

                    <Select
                        value={filters.rarity}
                        options={Select2Helper.renderImageOptions('rarity')}
                        placeholder={TranslationHelper.translate('ui.rarity')}
                        onChange={this.selectFilter.bind(this, 'rarity')}
                        optionRenderer={Select2Helper.renderOption.bind(this, 'rarity')}
                        valueRenderer={Select2Helper.renderValue}
                        className="rarity" />

                    <Select
                        value={filters.cardSet}
                        options={Select2Helper.renderImageOptions('cardSet')}
                        placeholder={TranslationHelper.translate('ui.extension')}
                        onChange={this.selectFilter.bind(this, 'cardSet')}
                        optionRenderer={Select2Helper.renderOption.bind(this, 'cardSet')}
                        valueRenderer={Select2Helper.renderValue}
                        className="set" />

                    <Select
                        value={filters.cardType}
                        options={Select2Helper.renderTextOptions('cardType')}
                        placeholder={TranslationHelper.translate('ui.type')}
                        onChange={this.selectFilter.bind(this, 'cardType')}
                        className="type" />

                    <Select
                        value={filters.race}
                        options={Select2Helper.renderTextOptions('race')}
                        placeholder={TranslationHelper.translate('ui.race')}
                        onChange={this.selectFilter.bind(this, 'race')}
                        className="race" />

                    <Select
                        value={filters.mechanics}
                        options={Select2Helper.renderTextOptions('mechanics')}
                        placeholder={TranslationHelper.translate('ui.mechanics')}
                        onChange={this.selectFilter.bind(this, 'mechanics')}
                        className="mechanics" />

                    <Select
                        value={filters.status}
                        options={Select2Helper.renderTextOptions('status')}
                        placeholder={TranslationHelper.translate('ui.status')}
                        onChange={this.selectFilter.bind(this, 'status')}
                        className="status" />
                </div>
            </nav>
        );
    }
}

/**
 * PropTypes
 *
 * @type {array}  filters
 * @type {number} current
 */
NavBar.PropTypes = {
    filters: PropTypes.array.isRequired,
    current: PropTypes.number
};

export default NavBar;
