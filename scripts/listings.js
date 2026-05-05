function getInputFields(container) {
    if (!container) return {};

    const inputFields = container.querySelectorAll("input, select");
    const data = {};

    for (const field of inputFields) {
        const key = field.name;
        const value = field.value.trim();

        if (key) {
            data[key] = value;
        }
    }

    return data;
}

function parsePrice(str) {
    if (typeof str !== "string") return { min: null, max: null };

    str = str.trim();

    if (str.endsWith("+")) {
        return { min: Number(str.slice(0, -1)), max: Infinity };
    }

    const parts = str.split("-");

    if (parts.length === 2) {
        return {
            min: Number(parts[0]),
            max: Number(parts[1]),
        };
    }

    const value = Number(str);

    return {
        min: value,
        max: value,
    };
}

const filterForm = document.getElementById("filterOptions");

filterForm.addEventListener("submit", event => {
    event.preventDefault();
    const filters = getInputFields(filterForm);
    const priceRange = parsePrice(filters.price);

    filteredCars = cars.filter(car => {
        const [brand, model] = car.name.split(" ");
        const price = Number(car.price);

        const matchBrand = !filters.brand || brand.toLowerCase() === filters.brand.toLowerCase();
        const matchModel = !filters.model || model.toLowerCase() === filters.model.toLowerCase();
        const matchYear = !filters.year || car.year == filters.year;
        const matchPrice = priceRange.min <= price && price <= priceRange.max;

        return matchBrand && matchModel && matchYear && matchPrice;
    });

    loadCars(resultsContainer, filteredCars);
    resultsCount.textContent = `showing ${filteredCars.length} results`;
});

const searchbar = document.getElementById("searchbar");

searchbar.addEventListener("input", event => {
    const query = searchbar.value.toLowerCase().trim();

    const result = filteredCars.filter(car => {
        const matchName = car.name.toLowerCase().includes(query);
        const matchYear = car.year.toString().includes(query);

        return matchName || matchYear;
    });

    loadCars(resultsContainer, result);
    resultsCount.textContent = `showing ${result.length} results`;
});

const sortBy = document.getElementById("sortBy");

const sortConditions = {
    priceAscending: (a, b) => a.price - b.price,
    priceDescending: (a, b) => b.price - a.price,
    yearOld: (a, b) => a.year - b.year,
    yearNew: (a, b) => b.year - a.year,
    alphabetical: (a, b) => a.name.localeCompare(b.name),
};

sortBy.addEventListener("change", event => {
    const sortName = event.target.value;
    const condition = sortConditions[sortName];

    const result = filteredCars.sort(condition);
    loadCars(resultsContainer, result);
});

const layoutSelect = document.getElementById("layoutSelect");
const listingsContainer = document.getElementById("listingsContainer");

layoutSelect.addEventListener("change", event => {
    const layout = event.target.value;

    if (layout === "full") {
        listingsContainer.classList.remove("sidebar");
        listingsContainer.classList.add("full");
    } else {
        listingsContainer.classList.remove("full");
        listingsContainer.classList.add("sidebar");
    }
});
