import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';
import Select                          from 'react-select';
import HearthstoneActions              from './../../action/HearthstoneActions';
import HearthstoneStore                from './../../store/HearthstoneStore';
import TranslationHelper               from './../../helper/TranslationHelper';
import HearthstoneConstant             from './../../constant/HearthstoneConstant';

/**
 * NavBar
 */
class NavBar extends Component {
    renderHeroesOptions() {
        let { filters } = this.props;

        return _.map(filters.heroes, hero => {
            return {
                value: hero.id,
                label: TranslationHelper.translate(hero.name),
                img:   HearthstoneStore.getHeroImage(hero, 'small')
            }
        });
    }

    renderImageOptions(filterType) {
        return _.map(HearthstoneConstant[filterType], (image, value) => {
            return {
                value: value,
                label: TranslationHelper.translate(value),
                img:   `images/${image}`
            }
        });
    }

    renderTextOptions(filterType) {
        return _.map(HearthstoneConstant[filterType], value => {
            return {
                value: value,
                label: TranslationHelper.translate(value)
            }
        });
    }

    renderOption(option) {
        return (
            <div>
                <img src={option.img} style={{borderRadius: '50%', marginRight: '10px'}} alt={option.value} />
                {option.label}
            </div>
        );
    }

    renderValue(option) {
        return <img src={option.img} style={{borderRadius: '50%'}} alt={option.value} />;
    }

    searchCard(event) {
        HearthstoneActions.searchCard(event.target.value);
    }

    selectFilter(type, value) {
        HearthstoneActions.selectFilter(type, value);
    }

    /**
     * @return {XML}
     */
    render() {
        let { filters, nbCards } = this.props;

        let cristals = _.map([0, 1, 2, 3, 4, 5, 6, 7], cost => {
            return (
                <img
                    key={`filter-${cost}`}
                    src={`images/resources/filter_${cost}${filters.cristal[cost] ? '_active' : '' }.png`}
                    alt={cost}
                    onClick={HearthstoneActions.toggleFilter.bind(this, cost)} />
            );
        });

        return (
            <nav role="navigation" className="navbar navbar-default navbar-static-top">
                <div className="filters">
                    <input
                        type="text"
                        className="search form-control"
                        placeholder={TranslationHelper.translate('search')}
                        onChange={this.searchCard.bind(this)} />

                    <Select
                        value={filters.hero != null ? filters.hero.id : null}
                        options={this.renderHeroesOptions()}
                        placeholder={TranslationHelper.translate('hero')}
                        onChange={this.selectFilter.bind(this, 'hero')}
                        optionRenderer={this.renderOption}
                        valueRenderer={this.renderValue}
                        className="heroes" />

                    <Select
                        value={filters.rarity}
                        options={this.renderImageOptions('rarity')}
                        placeholder={TranslationHelper.translate('rarity')}
                        onChange={this.selectFilter.bind(this, 'rarity')}
                        optionRenderer={this.renderOption}
                        valueRenderer={this.renderValue}
                        className="rarity" />

                    <Select
                        value={filters.cardSet}
                        options={this.renderImageOptions('cardSet')}
                        placeholder={TranslationHelper.translate('extension')}
                        onChange={this.selectFilter.bind(this, 'cardSet')}
                        optionRenderer={this.renderOption}
                        valueRenderer={this.renderValue}
                        className="set" />

                    <Select
                        value={filters.cardType}
                        options={this.renderTextOptions('cardType')}
                        placeholder={TranslationHelper.translate('type')}
                        onChange={this.selectFilter.bind(this, 'cardType')}
                        className="type" />

                    <Select
                        value={filters.mechanics}
                        options={this.renderTextOptions('mechanics')}
                        placeholder={TranslationHelper.translate('mechanics')}
                        onChange={this.selectFilter.bind(this, 'mechanics')}
                        className="mechanics" />

                    <div className="cristals">
                        {cristals}
                    </div>

                    <p className="navbar-text navbar-right">
                        {`${nbCards} ${TranslationHelper.translate('cards')}`}
                    </p>
                </div>
            </nav>
        );
    }
}

NavBar.PropTypes = {
    nbCards: PropTypes.number.isRequired,
    filters: PropTypes.array.isRequired
};

export default NavBar;
