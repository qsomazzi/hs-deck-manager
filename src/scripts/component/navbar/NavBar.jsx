import React, { Component, PropTypes } from 'react';
import { Navbar }                      from 'react-bootstrap';
import _                               from 'lodash';
import Select                          from 'react-select';
import HearthstoneActions              from './../../action/HearthstoneActions';
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
                value:       hero.cardId,
                label:       hero.name,
                img:         `images/heroes/${hero.cardId}_small.png`
            }
        });
    }

    renderOptions(filterType) {
        return _.map(HearthstoneConstant[filterType], type => {
            return {
                value: type,
                label: type,
                img:   `images/resources/gem_${type.toLowerCase()}.png`
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

        // <input type="text" className="search form-control" placeholder={TranslationHelper.translate('search')} />
        return (
            <Navbar staticTop>
                <Select
                    value={filters.hero != null ? filters.hero.cardId : null}
                    options={this.renderHeroesOptions()}
                    placeholder="Heroes's Filter"
                    onChange={HearthstoneActions.selectHero}
                    optionRenderer={this.renderOption}
                    valueRenderer={this.renderOption}
                    className="heroes" />

                <Select
                    value={filters.rarity}
                    options={this.renderOptions('rarity')}
                    placeholder="Rarity Filter"
                    onChange={HearthstoneActions.selectRarity}
                    optionRenderer={this.renderOption}
                    valueRenderer={this.renderOption}
                    className="rarity" />

                <Select
                    value={filters.cardType}
                    options={this.renderOptions('cardType')}
                    placeholder="Type Filter"
                    onChange={HearthstoneActions.selectType}
                    className="type" />

                <div className="cristals">
                    {cristals}
                </div>

                <p className="navbar-text navbar-right">
                    {`${nbCards} ${TranslationHelper.translate('cards')}`}
                </p>
            </Navbar>
        );
    }
}

NavBar.PropTypes = {
    nbCards: PropTypes.number.isRequired,
    filters: PropTypes.array.isRequired
};

export default NavBar;
