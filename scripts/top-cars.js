const TopCarsCards = document.getElementById('TopCarsCards');

fetch('db.json')
    .then(res => res.json())
    .then(data => {
        const best = data.cars.filter(c => c.best === true);

        TopCarsCards.innerHTML = '';

        best.forEach((car, i) => {
            const card = document.createElement('div');
            card.classList.add('car-card');

            card.innerHTML = `
                <div class="card-img">
                    <img src="${car.image}" alt="${car.name}">
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
                        <a href="pages/listing_details.html?id=${car.id}" class="view-btn">
                            Details <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            `;

            TopCarsCards.appendChild(card);

            setTimeout(() => {
                card.classList.add('show');
            }, i * 200);
        });
    })
    .catch(error => console.log(error));