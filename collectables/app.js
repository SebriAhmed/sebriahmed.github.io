const collections = [
    {
        name: "Zeldzame Munten",
        owner: "Jan de Vries",
        description: "Munten uit de Romeinse tijd en middeleeuwen.",
        category: "Romeins",
        items: ["Denarius Augustus", "Gouden Florijn", "Duit VOC"]
    },
    {
        name: "Pokemon Kaarten",
        owner: "Jan de Vries",
        description: "Eerste generatie holografische kaarten.",
        category: "Holo Rare",
        items: ["Charizard Holo", "Pikachu Red Cheeks"]
    },
    {
        name: "Vinyl Collectie",
        owner: "Sara Bakker",
        description: "Jazz en soul platen uit de jaren 60-70.",
        category: "Jazz",
        items: ["Kind of Blue", "What's Going On"]
    },
    {
        name: "Nike Dunks",
        owner: "Mo El Amrani",
        description: "Limited edition Nike Dunk lows.",
        category: "Low",
        items: ["Dunk Low Panda", "Dunk Low Coast"]
    },
    {
        name: "Retro Games",
        owner: "Mo El Amrani",
        description: "Cartridges voor SNES en N64.",
        category: "SNES",
        items: ["Super Mario World", "GoldenEye 007"]
    }
];

const html = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const collectionsEl = document.querySelector("#collections");
const detailContent = document.querySelector("#detailContent");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const filterForm = document.querySelector("#filterForm");

function renderCollections(list = collections) {
    if (!list.length) {
        collectionsEl.innerHTML = '<div class="col-12"><div class="alert alert-info">Geen verzamelingen gevonden.</div></div>';
        return;
    }

    collectionsEl.innerHTML = list.map((collection) => `
        <div class="col-12 col-md-6 col-xl-4">
            <article class="collection-card h-100">
                <div class="cover">${collection.name.slice(0, 1)}</div>
                <div class="p-3 d-flex flex-column h-100">
                    <h2 class="h5">${collection.name}</h2>
                    <p class="text-secondary flex-grow-1">${collection.description}</p>
                    <p class="small text-secondary mb-3">Eigenaar: <strong>${collection.owner}</strong><br>${collection.items.length} items</p>
                    <button class="btn btn-outline-primary" type="button" data-detail="${collection.name}">Bekijk collectie</button>
                </div>
            </article>
        </div>
    `).join("");
}

function renderDetail(collection) {
    detailContent.innerHTML = `
        <h2 class="h4">${collection.name}</h2>
        <p class="text-secondary">${collection.description}</p>
        <p>Door <strong>${collection.owner}</strong> - categorie <span class="badge text-bg-secondary">${collection.category}</span></p>
        <div>${collection.items.map(item => `<span class="item-pill">${item}</span>`).join("")}</div>
    `;
}

filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const filtered = collections.filter(collection => {
        const matchesQuery = !query || [collection.name, collection.description, collection.owner, ...collection.items].join(" ").toLowerCase().includes(query);
        const matchesCategory = !category || collection.category === category;
        return matchesQuery && matchesCategory;
    });
    renderCollections(filtered);
});

collectionsEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-detail]");
    if (!button) return;
    const collection = collections.find((item) => item.name === button.dataset.detail);
    if (!collection) return;
    renderDetail(collection);
    document.querySelector("#details").scrollIntoView({ behavior: "smooth", block: "start" });
});

themeToggle.addEventListener("click", () => {
    const next = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-bs-theme", next);
    themeToggle.textContent = next === "dark" ? "Licht" : "Donker";
});

renderCollections();
renderDetail(collections[0]);
