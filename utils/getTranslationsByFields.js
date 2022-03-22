const { Language } = require("../models/language");

function getTranslationsByFields(fields) {
  let emptyTranslations = {};
  Language.findActive(function (err, languages) {
    emptyTranslations = Object.fromEntries(
      languages.map((lang) => [lang.locale, ""])
    );
  });
  return function () {
    return fields.reduce((res, curr) => {
      return { ...res, [curr]: { ...emptyTranslations, ...this[curr] } };
    }, {});
  };
}

exports.getTranslationsByFields = getTranslationsByFields;
