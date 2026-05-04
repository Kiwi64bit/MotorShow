const resultsContainer = document.getElementById('resultsContainer');

fetch('../db.json')
    .then(res => res.json())
    .then(data => {
        const allCars = data.cars;

        resultsContainer.innerHTML = '';

        allCars.forEach((car, i) => {
            const card = document.createElement('div');
            card.classList.add('car-card');

            card.innerHTML = `
                <div class="card-img">
                    <img src="../${car.image.replace('./', '')}" alt="${car.name}">
                </div>
                <div class="card-body">
                    <div class="car-head">
                        <h3>${car.name}</h3>
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
                            $${car.price.toLocaleString()}
                        </div>
                        <a href="listing_details.html?id=${car.id}" class="view-btn">
                            Details <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            `;

            resultsContainer.appendChild(card);

            setTimeout(() => {
                card.classList.add('show');
            }, i * 100);
        });
    })
    .catch(error => console.log(error));