const filterForm = document.getElementById("filterOptions");
const filterBrand = document.getElementById("brand");
const filterModel = document.getElementById("model");
const filterYear = document.getElementById("year");
const filterPrice = document.getElementById("price");

const resultsContainer = document.getElementById("resultsContainer");
const resultsCount = document.getElementById("resultCount");

const searchbar = document.getElementById("searchbar");
const sortBy = document.getElementById("sortBy");
const layoutSelect = document.getElementById("layoutSelect");
const listingsContainer = document.getElementById("listingsContainer");

const sortConditions = {
    priceAscending: (a, b) => a.price - b.price,
    priceDescending: (a, b) => b.price - a.price,
    yearOld: (a, b) => a.year - b.year,
    yearNew: (a, b) => b.year - a.year,
    alphabetical: (a, b) => a.name.localeCompare(b.name),
};

var cars;
var filteredCars;

fetch("../db.json")
    .then(response => response.json())
    .then(result => {
        cars = result.sort((a, b) => a.name.localeCompare(b.name));
        filteredCars = [...cars];
        loadCars(resultsContainer, cars);
        resultsCount.textContent = `showing ${cars.length} results`;
    })
    .catch(error => console.error(error));

filterForm.addEventListener("submit", event => {
    event.preventDefault();
    const priceRange = parsePrice(filterPrice.value);

    filteredCars = cars.filter(car => {
        const [brand, model] = car.name.split(" ");
        const price = Number(car.price);

        const matchBrand = !filterBrand.value || brand.toLowerCase() === filterBrand.toLowerCase();
        const matchModel = !filterModel || model.toLowerCase() === filterModel.toLowerCase();
        const matchYear = !filterYear.value || car.year == filterYear;
        const matchPrice = priceRange.min <= price && price <= priceRange.max;

        return matchBrand && matchModel && matchYear && matchPrice;
    });

    loadCars(resultsContainer, filteredCars);
    resultsCount.textContent = `showing ${filteredCars.length} results`;
});

searchbar.addEventListener("input", event => {
    const query = searchbar.value.toLowerCase().trim();

    const result = filteredCars.filter(car => {
        const matchName = car.name.toLowerCase().includes(query);
        const matchYear = car.year.toString().includes(query);
        const matchTransmission = car.transmission.toLowerCase().includes(query);
        const matchFuel = car.fuel.toLowerCase().includes(query);

        return matchName || matchYear || matchTransmission || matchFuel;
    });

    loadCars(resultsContainer, result);
    resultsCount.textContent = `showing ${result.length} results`;
});

sortBy.addEventListener("change", event => {
    const sortName = event.target.value;
    const condition = sortConditions[sortName];

    const result = filteredCars.sort(condition);
    loadCars(resultsContainer, result);
});

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

function createCarCard(car) {
    const card = document.createElement("div");
    card.classList.add("car-card");
    card.innerHTML = `
        <div class="card-img">
            <img src="../${car.image.replace("./", "")}" alt="${car.name}">
        </div>
        <div class="card-body">
            <div class="car-head">
                <h4>${car.name} ${car.year}</h4>
            </div>
            <div class="car-features">
                <div class="car-feature">
                    <i class="fa-solid fa-gauge"></i>
                    <span>${car.miles.toLocaleString()} mi</span>
                </div>
                <div class="car-feature">
                    <i class="fa-solid fa-gas-pump"></i>
                    <span>${car.fuel}</span>
                </div>
                <div class="car-feature">
                    <i class="fa-solid fa-gears"></i>
                    <span>${car.transmission}</span>
                </div>
            </div>
            <div class="car-details">
                <div class="car-price">
                    ${car.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                    })}
                </div>
                <a href="listing_details.html?id=${car.id}" class="view-btn">
                    Details <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </div>
    `;

    return card;
}

function loadCars(container, carsData) {
    container.innerHTML = "";
    for (const car of carsData) {
        const card = createCarCard(car);
        container.appendChild(card);
    }
}
