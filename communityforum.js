// Function for search functionality
function performSearch() {
    const searchText = document.getElementById('search-bar').value;
    const category = document.getElementById('category').value;
    alert(`Searching for "${searchText}" in "${category}" category...`);
}

// Function to toggle the chatbox visibility
document.getElementById("chat-icon").addEventListener("click", function() {
    var chatbox = document.getElementById("chatbox");
    if (chatbox.style.display === "none") {
        chatbox.style.display = "block";  // Show chatbox when icon is clicked
    } else {
        chatbox.style.display = "none";  // Hide chatbox if already open
    }
});



// Function to send messages (as it was before)
function sendMessage() {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const message = userInput.value;

    if (message.trim() !== '') {
        const userMessage = `<p><strong>You:</strong> ${message}</p>`;
        chatWindow.innerHTML += userMessage;
        userInput.value = '';

        // Simulate a support response
        setTimeout(() => {
            const supportResponse = `<p><strong>Support:</strong> We have received your message and will assist you shortly.</p>`;
            chatWindow.innerHTML += supportResponse;
        }, 1000);
    }
}



// Like functionality
function likeDiscussion(button) {
    const likesCountElement = button.nextElementSibling.querySelector('.likes-count');
    let currentLikes = parseInt(likesCountElement.textContent, 10);
    likesCountElement.textContent = currentLikes + 1;
}

// Updated postComment function
function postComment(button) {
    const commentTextArea = button.previousElementSibling;
    const commentList = button.nextElementSibling;
    const commentText = commentTextArea.value.trim();

    if (commentText !== '') {
        const newComment = document.createElement('li');
        newComment.className = 'comment';
        
        const commentContent = document.createElement('span');
        commentContent.textContent = commentText;
        newComment.appendChild(commentContent);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-comment';
        deleteButton.onclick = function() {
            commentList.removeChild(newComment);
        };
        newComment.appendChild(deleteButton);

        commentList.appendChild(newComment);
        commentTextArea.value = '';
    }
}

// New function for handling story submission
document.getElementById('story-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addStory();
});


function addStory() {
    const storyInput = document.getElementById('story-input');
    const storyText = storyInput.value.trim();
    const storyList = document.getElementById('story-list');

    if (storyText !== '') {
        const newStory = document.createElement('li');
        
        const storyContent = document.createElement('span');
        storyContent.textContent = storyText;
        newStory.appendChild(storyContent);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-story';
        deleteButton.onclick = function() {
            storyList.removeChild(newStory);
        };
        newStory.appendChild(deleteButton);

        storyList.appendChild(newStory);
        storyInput.value = '';
    }
}
