function createCarCard(car) {
    const card = document.createElement("div");
    card.classList.add("car-card");
    card.innerHTML = `
        <div class="card-img">
            <img src="../${car.image.replace("./", "")}" alt="${car.name}">
        </div>
        <div class="card-body">
            <div class="car-head">
                <h4>${car.name}</h4>
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
                    ${car.price.toLocaleString("en-EG", {
                        style: "currency",
                        currency: "EGP",
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

var resultsContainer = document.getElementById("resultsContainer");
var cars;

fetchJson("../db.json")
    .then(result => {
        cars = result.cars;
        return result;
    })
    .then(result => {
        loadCars(resultsContainer, cars);
    });
