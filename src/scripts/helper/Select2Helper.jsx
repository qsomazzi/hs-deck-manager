import React               from 'react';
import _                   from 'lodash';
import HearthstoneStore    from './../store/HearthstoneStore';
import HearthstoneConstant from './../constant/HearthstoneConstant';
import TranslationHelper   from './TranslationHelper';

const Select2Helper = {
    renderHeroesOptions(filters) {
        return _.map(filters.heroes, hero => {
            return {
                value: hero.id,
                label: TranslationHelper.translate(hero.id),
                img:   HearthstoneStore.getHeroImage(hero, 'small')
            }
        });
    },

    renderImageOptions(filterType) {
        return _.map(HearthstoneConstant[filterType], (image, value) => {
            return {
                value: value,
                label: TranslationHelper.translate(value),
                img:   `images/${image}`
            }
        });
    },

    renderTextOptions(filterType) {
        return _.map(HearthstoneConstant[filterType], value => {
            return {
                value: value,
                label: TranslationHelper.translate(filterType + '.' + value)
            }
        });
    },

    renderOption(key, option) {
        let translateKey = key == null ? option.label : key + '.' + option.label;

        return (
            <div>
                <img src={option.img} alt={option.value} />
                {TranslationHelper.translate(translateKey)}
            </div>
        );
    },

    renderTextValue(filterType, option) {
        return <div>{TranslationHelper.translate(filterType + '.' + option.value)}</div>;
    },

    renderValue(option) {
        return <img src={option.img} style={{borderRadius: '50%'}} alt={option.value} />;
    }
};

export default Select2Helper;
