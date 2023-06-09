
// custom loading bar
const showLoading = (text) => {
    $(".main-content").hide();
    $(".loading-bar").show();
    if (text != "") {
        $("#loading_title").text(text);
    } else {
        $("#loading_title").text("Loading...");
    }
}

const hideLoading = () => {
    $(".loading-bar").hide();
    $(".main-content").fadeIn();
}

// custom pie chart
const initPieChart = () => {
    $('.continue-button .chart').easyPieChart({
        size: 30,
        barColor: "lightgreen",
        scaleLength: 0,
        lineWidth: 4,
        trackColor: "white",
        lineCap: "circle",
        animate: 1000,
    });
}

const updatePieChart = (pro) => {
    $('.continue-button .chart font').text(pro);
    $('.continue-button .chart').data('easyPieChart').update(pro);
}

// custom select/search element : {tag: className }
const customSelect = {
    value: "",
    init: (tag, callback) => {
        customSelect.value = "";
        const selected = document.querySelector(`.${tag} .selected`);
        const optionsContainer = document.querySelector(`.${tag} .options-container`);
        const searchBox = document.querySelector(`.${tag} .search-box input`);

        const optionsList = document.querySelectorAll(".option");

        selected.addEventListener("click", () => {
            optionsContainer.classList.toggle("active");

            searchBox.value = "";
            filterList("");

            if (optionsContainer.classList.contains("active")) {
                searchBox.focus();
            }
        });

        optionsList.forEach(o => {
            o.addEventListener("click", () => {
                customSelect.value = o.querySelector(".radio").dataset.id;
                document.querySelector(`.${tag}`).dataset.value = customSelect.value;
                selected.innerHTML = o.querySelector("label").innerHTML;
                optionsContainer.classList.remove("active");
                if (callback)
                    callback();
            });
        });

        searchBox.addEventListener("keyup", function (e) {
            filterList(e.target.value);
        });

        const filterList = searchTerm => {
            searchTerm = searchTerm.toLowerCase();
            optionsList.forEach(option => {
                let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
                if (label.indexOf(searchTerm) != -1) {
                    option.style.display = "block";
                } else {
                    option.style.display = "none";
                }
            });
        };
    },

    setSelect: (tag, value) => {
        customSelect.value = "";
        const selected = document.querySelector(`.${tag} .selected`);
        const optionsContainer = document.querySelector(`.${tag} .options-container`);
        const searchBox = document.querySelector(`.${tag} .search-box input`);

        const optionsList = document.querySelectorAll(".option");

        optionsList.forEach(o => {
            if (o.querySelector(".radio").dataset.id == value) {
                customSelect.value = o.querySelector(".radio").dataset.id;
                document.querySelector(`.${tag}`).dataset.value = customSelect.value;
                selected.innerHTML = o.querySelector("label").innerHTML;
                optionsContainer.classList.remove("active");
            }
        });
    }
}

// set year select data
const initSelectYear = () => {
    var yearMax = 2033;
    var yearMin = 1930;
    for (var i = yearMax; i > yearMin; i--) {
        $(".select-year").append(`
            <option value=${i}>${i}</option>
        `);
    }
}

// custom radio button {id: id tag}
const customRadioButton = {
    init: (id) => {
        $(`#${id} .radio-value`).click(function () {
            value = $(this).attr("value");
            $(`#${id}`).attr('data', value);
            $(`#${id} .radio-value`).removeClass("active");
            $(this).addClass("active");
        });
    },

    getValue: (id) => {
        return $(`#${id}`).attr('data');
    },

    setValue: (id, value) => {
        var radios = $(`#${id} .radio-value`);
        radios.each((index, element) => {
            if ($(element).attr("value") == value) {
                $(element).addClass("active");
            } else {
                $(element).removeClass("active");
            }
        });
        $(`#${id}`).attr('data', value);
    }
}

const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile);
    });
};