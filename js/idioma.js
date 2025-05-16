document.getElementById("language").addEventListener("change", function () {
    const selectedLang = this.value;
    const flagImg = document.getElementById("flag-img");

    if (selectedLang === "en") {
        flagImg.src = "https://reemade.com.co/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png";
        flagImg.alt = "English";
    } else {
        flagImg.src = "https://reemade.com.co/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png";
        flagImg.alt = "Español";
    }
});