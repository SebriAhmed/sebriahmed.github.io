const posts = [
    {
        author: "Sarah Johnson",
        initials: "SJ",
        headline: "Senior Software Engineer at TechCorp",
        time: "2 uur geleden",
        content: "Just finished implementing a microservices architecture for our main product. The scalability improvements are already showing.",
        likes: 2
    },
    {
        author: "Sarah Johnson",
        initials: "SJ",
        headline: "Full-stack developer",
        time: "1 dag geleden",
        content: "Looking for recommendations on the best CI/CD tools for PHP projects. Currently using GitHub Actions but exploring alternatives.",
        likes: 1
    },
    {
        author: "Michael Chen",
        initials: "MC",
        headline: "Product Manager | Ex-Google",
        time: "1 dag geleden",
        content: "I am improving my Symfony skills and experimenting with charts in Symfony UX. It is going surprisingly well.",
        likes: 0
    }
];

const postsEl = document.querySelector("#posts");
const postForm = document.querySelector("#postForm");
const postContent = document.querySelector("#postContent");

function renderPosts() {
    postsEl.innerHTML = posts.map((post, index) => `
        <article class="card post-card">
            <div class="card-body">
                <div class="post-header mb-3">
                    <div class="avatar">${post.initials}</div>
                    <div>
                        <strong>${post.author}</strong>
                        <div class="small text-secondary">${post.headline}</div>
                        <div class="small text-secondary">${post.time}</div>
                    </div>
                </div>
                <p>${post.content}</p>
                <button class="btn btn-sm ${post.liked ? "btn-primary" : "btn-outline-primary"}" data-like="${index}">
                    Like (${post.likes})
                </button>
            </div>
        </article>
    `).join("");
}

postsEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-like]");
    if (!button) return;
    const post = posts[Number(button.dataset.like)];
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts();
});

postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = postContent.value.trim();
    if (!content) return;
    posts.unshift({
        author: "Demo gebruiker",
        initials: "DG",
        headline: "Ingelogde bezoeker",
        time: "net geplaatst",
        content,
        likes: 0
    });
    postContent.value = "";
    renderPosts();
});

renderPosts();
