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
                value: hero.cardId,
                label: hero.name,
                img:   `images/heroes/${hero.cardId}_small.png`
            }
        });
    }

    renderImageOptions(filterType) {
        return _.map(HearthstoneConstant[filterType], (image, value) => {
            return {
                value: value,
                label: value,
                img:   `images/${image}`
            }
        });
    }

    renderTextOptions(filterType) {
        return _.map(HearthstoneConstant[filterType], value => {
            return {
                value: value,
                label: value
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
                    placeholder="Hero"
                    onChange={HearthstoneActions.selectHero}
                    optionRenderer={this.renderOption}
                    valueRenderer={this.renderValue}
                    className="heroes" />

                <Select
                    value={filters.rarity}
                    options={this.renderImageOptions('rarity')}
                    placeholder="Rarity"
                    onChange={HearthstoneActions.selectRarity}
                    optionRenderer={this.renderOption}
                    valueRenderer={this.renderValue}
                    className="rarity" />

                <Select
                    value={filters.cardSet}
                    options={this.renderImageOptions('cardSet')}
                    placeholder="Extension"
                    onChange={HearthstoneActions.selectSet}
                    optionRenderer={this.renderOption}
                    valueRenderer={this.renderValue}
                    className="set" />

                <Select
                    value={filters.cardType}
                    options={this.renderTextOptions('cardType')}
                    placeholder="Type"
                    onChange={HearthstoneActions.selectType}
                    className="type" />

                <Select
                    value={filters.mechanics}
                    options={this.renderTextOptions('mechanics')}
                    placeholder="Mechanics"
                    onChange={HearthstoneActions.selectMechanics}
                    className="mechanics" />

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
