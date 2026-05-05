const params = new URLSearchParams(window.location.search);
const carId = parseInt(params.get("id"));

fetchJson("../db.json")
    .then(data => {
        const car = data.find(c => c.id === carId);

        const related = data.filter(c => c.brand === car.brand && c.id !== car.id);
        document.title = `${car.name} — MotorShow`;
        const imgSrc = "../" + car.image.replace("./", "");

        document.getElementById("pageContent").innerHTML = `
                <div class="detail-hero">
                    <div class="detail-img-wrap">
                        <img src="${imgSrc}" alt="${car.name}">
                    </div>

                    <div class="detail-info">
                        <p class="detail-brand">${car.brand}</p>
                        <h1 class="detail-name">${car.name}</h1>
                        <p class="detail-year">${car.year} · ${car.body}</p>

                        <div class="detail-price">
                            $${car.price.toLocaleString()}
                        </div>

                        <div class="specs-grid">
                            <div class="spec-box">
                                <i class="fa-solid fa-gauge"></i>
                                <div class="spec-box-text">
                                    <span>Mileage</span>
                                    <strong>${car.miles.toLocaleString()} mi</strong>
                                </div>
                            </div>
                            <div class="spec-box">
                                <i class="fa-solid fa-gas-pump"></i>
                                <div class="spec-box-text">
                                    <span>Fuel</span>
                                    <strong>${car.fuel}</strong>
                                </div>
                            </div>
                            <div class="spec-box">
                                <i class="fa-solid fa-gears"></i>
                                <div class="spec-box-text">
                                    <span>Transmission</span>
                                    <strong>${car.transmission}</strong>
                                </div>
                            </div>
                            <div class="spec-box">
                                <i class="fa-solid fa-door-open"></i>
                                <div class="spec-box-text">
                                    <span>Doors</span>
                                    <strong>${car.doors} Doors</strong>
                                </div>
                            </div>
                        </div>

                        <div class="colors-section">
                            <p class="colors-label">Available Colors</p>
                            <div class="colors-list">
                                ${car.colors.map(color => `<span class="color-tag">${color}</span>`).join("")}
                            </div>
                        </div>

                    </div>
                </div>

                
                <div class="detail-desc-section">
                    <h2 class="section-title">About This Car</h2>
                    <p>${car.description}</p>
                </div>


                ${
                    related.length > 0
                        ? `

                <div class="related-section">
                    <h2 class="section-title">More From ${car.brand}</h2>
                    <div class="related-cards" id="relatedCards">
                        ${related
                            .map(
                                (r, i) => `
                            <div class="car-card" style="transition-delay: ${i * 100}ms">
                                <div class="card-img">
                                    <img src="../${r.image.replace("./", "")}" alt="${r.name}">
                                </div>
                                <div class="card-body">
                                    <div class="car-head">
                                        <h3>${r.name}</h3>
                                    </div>
                                    <div class="car-features">
                                        <div class="car-feature">
                                            <i class="fa-solid fa-gauge"></i>
                                            <span>${r.miles.toLocaleString()} mi</span>
                                        </div>
                                        <div class="car-feature">
                                            <i class="fa-solid fa-gas-pump"></i>
                                            <span>${r.fuel}</span>
                                        </div>
                                        <div class="car-feature">
                                            <i class="fa-solid fa-gears"></i>
                                            <span>${r.transmission}</span>
                                        </div>
                                    </div>
                                    <div class="car-details">
                                        <div class="car-price">
                                            $${r.price.toLocaleString()}
                                        </div>
                                        <a href="listing_details.html?id=${r.id}" class="view-btn">
                                            Details <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `,
                            )
                            .join("")}
                    </div>
                </div>`
                        : ""
                }
            `;

        setTimeout(() => {
            document.querySelectorAll(".related-cards .car-card").forEach(card => {
                card.classList.add("show");
            });
        }, 100);
    })
    .catch(err => console.error(err));
