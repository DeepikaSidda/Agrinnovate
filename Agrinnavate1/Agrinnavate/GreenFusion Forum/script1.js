// scripts.js
const threads = [
    {
        id: 1,
        title: "Thread 1",
        author: "User1",
        date: new Date().toLocaleString(),
        comments: [
            { author: "User2", date: new Date().toLocaleString(), content: "First comment on thread 1" },
            { author: "User3", date: new Date().toLocaleString(), content: "Second comment on thread 1" }
        ]
    },
    {
        id: 2,
        title: "Thread 2",
        author: "User1",
        date: new Date().toLocaleString(),
        comments: [
            { author: "User2", date: new Date().toLocaleString(), content: "First comment on thread 2" }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const forumDiv = document.querySelector('.forum');
    const threadsDiv = document.querySelector('.threads');
    const threadDetailDiv = document.querySelector('.thread-detail');
    const backButton = document.querySelector('.back-button');
    const addCommentButton = document.querySelector('.add-comment-button');
    const commentTextarea = threadDetailDiv.querySelector('textarea');
    const newThreadTitleTextarea = document.getElementById('new-thread-title');
    const addThreadButton = document.getElementById('add-thread-button');
    let currentThread = null;

    function renderThreads() {
        threadsDiv.innerHTML = '';
        threads.forEach(thread => {
            const threadDiv = document.createElement('div');
            threadDiv.classList.add('thread');
            threadDiv.innerHTML = `
                <h3>${thread.title}</h3>
                <p>by ${thread.author} on ${thread.date}</p>
                <p>${thread.comments.length} comments</p>
            `;
            threadDiv.addEventListener('click', () => showThread(thread));
            threadsDiv.appendChild(threadDiv);
        });
    }

    function showThread(thread) {
        currentThread = thread;
        forumDiv.style.display = 'none';
        threadDetailDiv.style.display = 'block';
        const threadHeaderDiv = threadDetailDiv.querySelector('.thread-header');
        const commentsDiv = threadDetailDiv.querySelector('.comments');
        threadHeaderDiv.innerHTML = `
            <h2>${thread.title}</h2>
            <p>by ${thread.author} on ${thread.date}</p>
            <p>${thread.comments.length} comments</p>
        `;
        commentsDiv.innerHTML = '';
        thread.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p><strong>${comment.author}</strong> on ${comment.date}</p>
                <p>${comment.content}</p>
            `;
            commentsDiv.appendChild(commentDiv);
        });
    }

    backButton.addEventListener('click', () => {
        forumDiv.style.display = 'block';
        threadDetailDiv.style.display = 'none';
        commentTextarea.value = '';
    });

    addCommentButton.addEventListener('click', () => {
        const commentContent = commentTextarea.value;
        if (commentContent) {
            const newComment = {
                author: 'CurrentUser', // Replace with actual current user
                date: new Date().toLocaleString(),
                content: commentContent
            };
            currentThread.comments.push(newComment);
            showThread(currentThread);
            commentTextarea.value = '';
        }
    });

    addThreadButton.addEventListener('click', () => {
        const threadTitle = newThreadTitleTextarea.value;
        if (threadTitle) {
            const newThread = {
                id: threads.length + 1,
                title: threadTitle,
                author: 'CurrentUser', // Replace with actual current user
                date: new Date().toLocaleString(),
                comments: []
            };
            threads.push(newThread);
            renderThreads();
            newThreadTitleTextarea.value = '';
        }
    });

    renderThreads();
});
