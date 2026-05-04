function createCarCard(data) {
    const card = document.createElement("div");
    card.classList.add("car-card");
    card.innerHTML = `
        <div class="card-header">
            <img src="${data.image}" alt="car image" onerror="this.src = 'https://placehold.co/600x400?text=Failed+to+load'" />
        </div>
        <div class="card-body">
            <h5 class="name">
                <span class="brand">${data.name}</span>
                <span class="year">${data.year}</span>
            </h5>
            <p class="summary">
                ${data.description}
            </p>
            <div class="bottom-info">
                <h5 class="price">
                    ${data.price.toLocaleString("en-EG", {
                        style: "currency",
                        currency: "EGP",
                        maximumFractionDigits: 0,
                    })}
                </h5>
                <a href="#" class="view-details">
                    View Details
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none">
                        <path
                            d="M 2 12 L 12 2 M 6 2 H 12 V 8"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
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
