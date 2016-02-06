import HearthstoneStore from './../store/HearthstoneStore';
import frFR             from './../resources/frFR.json';
import enUS             from './../resources/enUS.json';
import deDE             from './../resources/deDE.json';
import esES             from './../resources/esES.json';
import itIT             from './../resources/itIT.json';
import koKR             from './../resources/koKR.json';
import plPL             from './../resources/plPL.json';
import ptBR             from './../resources/ptBR.json';
import ruRU             from './../resources/ruRU.json';
import zhCN             from './../resources/zhCN.json';
import jaJP             from './../resources/jaJP.json';

/**
 * TranslationHelper
 */
const TranslationHelper = {
    /**
     * Translate key in the current locale (of forced)
     *
     * @param {string} key
     * @param {string} locale
     */
    translate(key, locale = null) {
        locale = locale == null ? HearthstoneStore.getLocale() : locale;
        let translation;

        switch (locale) {
            case 'frFR':
                translation = frFR;
                break;
            case 'deDE':
                translation = deDE;
                break;
            case 'esES':
                translation = esES;
                break;
            case 'itIT':
                translation = itIT;
                break;
            case 'koKR':
                translation = koKR;
                break;
            case 'plPL':
                translation = plPL;
                break;
            case 'ptBR':
                translation = ptBR;
                break;
            case 'ruRU':
                translation = ruRU;
                break;
            case 'zhCN':
                translation = zhCN;
                break;
            case 'jaJP':
                translation = jaJP;
                break;
            case 'enUS':
            default:
                translation = enUS;
                break;
        }

        if (translation.system[key] != undefined) {
            return translation.system[key];
        }

        return translation.cards[key] != undefined ? translation.cards[key] : key;
    }
};

export default TranslationHelper;
