import HearthstoneStore    from './../store/HearthstoneStore';
import HearthstoneConstant from './../constant/HearthstoneConstant';

const TranslationHelper = {
    translate(key) {
        let locale = HearthstoneStore.getLocale();

        return HearthstoneConstant.translation[locale][key] != undefined ? HearthstoneConstant.translation[locale][key] : key;
    }
};

export default TranslationHelper;
