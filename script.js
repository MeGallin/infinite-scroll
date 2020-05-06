const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch from API
let getPosts = async () => {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
    { mode: 'cors' }
  );
  const data = await response.json();
  return data;
};

// Show all post in DOM
let showPost = async () => {
  const post = await getPosts();
  console.log(post);

  post.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
      `;
    postsContainer.appendChild(postEl);
  });
};

// show loader and fetch more posts
let showLoading = () => {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
};

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// show posts
showPost();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //   console.log(document.documentElement);
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
