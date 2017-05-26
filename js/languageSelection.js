const ANY_LANGUAGE = 'All';
const NO_LANGUAGE = 'NoLanguage';
var languageSelected = ANY_LANGUAGE;

function generateLanguageSelector() {
    function generateOption(value, text) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.text = text;
        return optionElement;
    }

    let languageSelectElement = document.createElement("select");
    languageSelectElement.id = "languageSelectElement";
    languageSelectElement.add(generateOption(ANY_LANGUAGE, "All languages"));
    languageSelectElement.add(generateOption(NO_LANGUAGE, "No Language"));
    LANGUAGES.forEach((language) => {
        languageSelectElement.add(generateOption(language, language));
    });
    languageSelectElement.addEventListener("change", selectLanguage, false);
    return languageSelectElement;
}

function renderLanguageSelector() {
    let languageSelectorElement = document.getElementById('language_selector');
    languageSelectorElement.innerHTML = "";
    languageSelectorElement.appendChild(generateLanguageSelector());
}

function selectLanguage(event) {
    languageSelected = event.target.value;
    content.innerHTML = '';
    reqNo = Math.floor(Math.random() * 3) + 1;
    projectsPerPage = (languageSelected == ANY_LANGUAGE) ? 2 : 100;
    getData();
}

const languageFilter = function (languageToFilter) {
    if (languageToFilter == ANY_LANGUAGE) {
        return function (project) { return true; };
    } else if (languageSelected == NO_LANGUAGE) {
        return function (project) {
            return project.language == null;
        };
    }
    return function (project) { return project.language == languageToFilter; };
};