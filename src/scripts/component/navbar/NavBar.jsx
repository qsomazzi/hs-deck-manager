import React, { Component, PropTypes } from 'react';
import { Navbar }                      from 'react-bootstrap';
import _                               from 'lodash';
import Select                          from 'react-select';
import HearthstoneActions              from './../../action/HearthstoneActions';
import TranslationHelper               from './../../helper/TranslationHelper';

/**
 * NavBar
 */
class NavBar extends Component {
    renderOptions() {
        let { heroes } = this.props;

        return _.map(heroes, hero => {
            return {
                value:       hero.cardId,
                label:       hero.name,
                img:         `images/heroes/${hero.cardId}_small.png`,
                playerClass: hero.playerClass
            }
        });
    }

    renderOption(option) {
        return (
            <div>
                <img src={option.img} style={{borderRadius: '50%', marginRight: '10px'}} alt={option.playerClass} />
                {option.label}
            </div>
        );
    }

    /**
     * @return {XML}
     */
    render() {
        let { filters, nbCards } = this.props;

        return (
            <Navbar staticTop>
                <input type="text" className="search form-control" placeholder={TranslationHelper.translate('search')} />

                <Select
                    value={filters.hero != null ? filters.hero.cardId : null}
                    options={this.renderOptions()}
                    placeholder="Heroes's Filter"
                    onChange={HearthstoneActions.selectHero}
                    optionRenderer={this.renderOption}
                    valueRenderer={this.renderOption} />

                <div className="filters">
                    <img src={`images/resources/filter_0${filters.cristal[0] ? '_active' : '' }.png`} alt="0" onClick={HearthstoneActions.toggleFilter.bind(this, 0)} />
                    <img src={`images/resources/filter_1${filters.cristal[1] ? '_active' : '' }.png`} alt="1" onClick={HearthstoneActions.toggleFilter.bind(this, 1)} />
                    <img src={`images/resources/filter_2${filters.cristal[2] ? '_active' : '' }.png`} alt="2" onClick={HearthstoneActions.toggleFilter.bind(this, 2)} />
                    <img src={`images/resources/filter_3${filters.cristal[3] ? '_active' : '' }.png`} alt="3" onClick={HearthstoneActions.toggleFilter.bind(this, 3)} />
                    <img src={`images/resources/filter_4${filters.cristal[4] ? '_active' : '' }.png`} alt="4" onClick={HearthstoneActions.toggleFilter.bind(this, 4)} />
                    <img src={`images/resources/filter_5${filters.cristal[5] ? '_active' : '' }.png`} alt="5" onClick={HearthstoneActions.toggleFilter.bind(this, 5)} />
                    <img src={`images/resources/filter_6${filters.cristal[6] ? '_active' : '' }.png`} alt="6" onClick={HearthstoneActions.toggleFilter.bind(this, 6)} />
                    <img src={`images/resources/filter_7${filters.cristal[7] ? '_active' : '' }.png`} alt="7" onClick={HearthstoneActions.toggleFilter.bind(this, 7)} />
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
    filters: PropTypes.object.isRequired,
    heroes:  PropTypes.arrayOf(
        PropTypes.shape({
            cardId:      PropTypes.string.isRequired,
            name:        PropTypes.string.isRequired,
            playerClass: PropTypes.string.isRequired
        })
    ).isRequired
};

export default NavBar;
