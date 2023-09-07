let currentIndex = 0;

async function fetchPosts() {
    try {
        let response = await fetch('posts.json');
        let data = await response.json();
        return data.topics;
    } catch (error) {
        console.error("Error fetching data from posts.json:", error);
    }
}

function displayPost(posts, index) {
    let topicDiv = document.getElementById('topic');
    topicDiv.innerHTML = ""; 

    let topic = posts[index];

    let title = document.createElement('div');
    title.className = 'topic-title';
    title.textContent = topic.title;
    topicDiv.appendChild(title);

    topic.content.forEach(paragraph => {
        let content = document.createElement('div');
        content.className = 'topic-content';
        content.textContent = paragraph;
        topicDiv.appendChild(content);
    });

    let image = document.createElement('img');
    image.className = 'topic-image';
    image.src = topic.imageprompt;
    topicDiv.appendChild(image);

    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === posts.length - 1;
}

function populateTitles(posts) {
    let titlesList = document.getElementById('titles-list');
    posts.forEach((post, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = post.title;
        listItem.addEventListener('click', () => {
            currentIndex = index;
            displayPost(posts, currentIndex);
        });
        titlesList.appendChild(listItem);
    });
}

document.getElementById('prevBtn').addEventListener('click', async () => {
    let posts = await fetchPosts();
    if (currentIndex > 0) {
        currentIndex--;
        displayPost(posts, currentIndex);
    }
});

document.getElementById('nextBtn').addEventListener('click', async () => {
    let posts = await fetchPosts();
    if (currentIndex < posts.length - 1) {
        currentIndex++;
        displayPost(posts, currentIndex);
    }
});

// Load the first post and populate titles initially
(async function() {
    let posts = await fetchPosts();
    displayPost(posts, currentIndex);
    populateTitles(posts);
})();
