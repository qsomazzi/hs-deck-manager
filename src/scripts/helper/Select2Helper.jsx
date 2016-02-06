import React               from 'react';
import _                   from 'lodash';
import HearthstoneStore    from './../store/HearthstoneStore';
import HearthstoneConstant from './../constant/HearthstoneConstant';
import TranslationHelper   from './TranslationHelper';

/**
 * Select2Helper
 */
const Select2Helper = {
    /**
     * Render select heroes options (img + name)
     *
     * @param {array} filters
     */
    renderHeroesOptions(filters) {
        return _.map(filters.heroes, hero => {
            return {
                value: hero.id,
                label: TranslationHelper.translate(hero.id),
                img:   HearthstoneStore.getHeroImage(hero, 'small')
            }
        });
    },

    /**
     * Render select images options
     *
     * @param {string} filterType
     */
    renderImageOptions(filterType) {
        return _.map(HearthstoneConstant[filterType], (image, value) => {
            return {
                value: value,
                label: TranslationHelper.translate(value),
                img:   `images/${image}`
            }
        });
    },

    /**
     * Render select texts options
     *
     * @param {string} filterType
     */
    renderTextOptions(filterType) {
        return _.map(HearthstoneConstant[filterType], value => {
            return {
                value: value,
                label: TranslationHelper.translate(filterType + '.' + value)
            }
        });
    },

    /**
     * Render select images and texts options
     *
     * @param {string} key
     * @param {object} option
     */
    renderOption(key, option) {
        let translateKey = key == null ? option.label : key + '.' + option.label;

        return (
            <div>
                <img src={option.img} alt={option.value} />
                {TranslationHelper.translate(translateKey)}
            </div>
        );
    },

    /**
     * Render translated text for selected option
     *
     * @param {string} filterType
     * @param {object} option
     */
    renderTextValue(filterType, option) {
        return <div>{TranslationHelper.translate(filterType + '.' + option.value)}</div>;
    },

    /**
     * Render image for selected option
     *
     * @param {object} option
     */
    renderValue(option) {
        return <img src={option.img} style={{borderRadius: '50%'}} alt={option.value} />;
    }
};

export default Select2Helper;
