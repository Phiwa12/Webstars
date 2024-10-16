<?php
// Initialize session and database connection
session_start();
$servername = "localhost";
$username = "salome.mutemwa";
$password = "2322";
$dbname = "community_forum";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Add story functionality
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['story'])) {
    $story = $conn->real_escape_string($_POST['story']);
    $sql = "INSERT INTO stories (content) VALUES ('$story')";
    $conn->query($sql);
}

// Delete story functionality
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_story'])) {
    $story_id = (int)$_POST['delete_story'];
    $sql = "DELETE FROM stories WHERE id = $story_id";
    $conn->query($sql);
}

// Fetch stories
$sql = "SELECT * FROM stories ORDER BY created_at DESC";
$result = $conn->query($sql);

// Fetch discussions with user profile picture paths
$discussions = [
    [
        'title' => 'Child Safety Tips',
        'content' => 'Join the conversation on keeping kids safe during activities.',
        'likes' => 0,
        'comments' => [],
        'profile_picture' => 'velma.jpg', // Path to profile picture
    ],
    [
        'title' => 'Holiday Prep Guide',
        'content' => 'Discuss everything related to preparing for the holiday season.',
        'likes' => 0,
        'comments' => [],
        'profile_picture' => 'precious.jpg', // Path to profile picture
    ],
    [
        'title' => 'Etsy\'s Latest Updates',
        'content' => 'Stay updated on the newest features and policies on Etsy.',
        'likes' => 0,
        'comments' => [],
        'profile_picture' => 'velma.jpg', // Path to profile picture
    ],
];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Etsy Forum Page</title>
    <link rel="stylesheet" href="communityforum.css">
</head>
<body>
    <!-- Search Widget -->
    <section id="search-section">
        <h1>Search the Forum</h1>
        <div class="search-widget">
            <input type="text" id="search-bar" placeholder="Search topics or categories">
            <select id="category">
                <option value="all">All Categories</option>
                <option value="child-safety">Child Safety</option>
                <option value="holiday-prep">Holiday Prep</option>
                <option value="updates">Updates</option>
            </select>
            <button onclick="performSearch()">Search</button>
        </div>
    </section>

    <!-- Featured Discussions -->
    <section id="featured-discussions">
        <h2>Featured Discussions</h2>
        <?php foreach ($discussions as $discussion): ?>
            <div class="discussion">
                <div class="discussion-header">
                    <!-- Profile Picture -->
                    <div class="discussion-profile-pic" style="width: 30px; height: 30px; border-radius: 50%; overflow: hidden; margin-right: 10px;">
                        <img src="<?php echo htmlspecialchars($discussion['profile_picture']); ?>" alt="User Picture" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <h3><?php echo htmlspecialchars($discussion['title']); ?></h3>
                </div>
                <p><?php echo htmlspecialchars($discussion['content']); ?></p>
                <div class="interaction">
                    <button onclick="likeDiscussion(this)">👍 Like</button>
                    <p>Likes: <span class="likes-count"><?php echo $discussion['likes']; ?></span></p>
                    <div class="comments-section">
                        <textarea placeholder="Add a comment"></textarea>
                        <button onclick="postComment(this)">Post Comment</button>
                        <ul class="comments-list">
                            <?php foreach ($discussion['comments'] as $comment): ?>
                                <li><?php echo htmlspecialchars($comment); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </section>

    <!-- Add Your Story Section -->
    <section id="add-story-section">
        <h2>Add Your Story</h2>
        <form method="POST" onsubmit="return addStory();">
            <textarea id="story-input" name="story" placeholder="Write your story..." required></textarea>
            <button type="submit">Post Story</button>
        </form>
        <ul id="story-list">
            <?php while ($row = $result->fetch_assoc()): ?>
                <li>
                    <?php echo htmlspecialchars($row['content']); ?>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="delete_story" value="<?php echo $row['id']; ?>">
                        <button type="submit">Delete</button>
                    </form>
                </li>
            <?php endwhile; ?>
        </ul>
    </section>

    <!-- Chatbox -->
    <section id="chatbox-section">
        <h2>Chat with Trained Personnel</h2>
        <div class="chatbox">
            <div id="chat-window">
                <p><strong>Support:</strong> How can I assist you today?</p>
            </div>
            <input type="text" id="user-input" placeholder="Type your message here...">
            <button onclick="sendMessage()">Send</button>
        </div>
    </section>

    <script src="communityforum.js"></script>
    <script>
        // Function for search functionality
        function performSearch() {
            const searchText = document.getElementById('search-bar').value;
            const category = document.getElementById('category').value;
            alert(`Searching for "${searchText}" in "${category}" category...`);
        }

        // Function to toggle the chatbox visibility
        document.getElementById("chat-icon").addEventListener("click", function() {
            var chatbox = document.getElementById("chatbox");
            chatbox.style.display = (chatbox.style.display === "none") ? "block" : "none";  // Toggle visibility
        });

        // Function to send messages
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

        // Post comment functionality
        function postComment(button) {
            const commentTextArea = button.previousElementSibling;
            const commentList = button.nextElementSibling;
            const commentText = commentTextArea.value.trim();

            if (commentText !== '') {
                const newComment = document.createElement('li');
                newComment.textContent = commentText;
                commentList.appendChild(newComment);
                commentTextArea.value = '';  // Clear the text area
            }
        }

        // Add story functionality
        function addStory() {
            const storyInput = document.getElementById('story-input');
            const storyText = storyInput.value.trim();
            const storyList = document.getElementById('story-list');

            if (storyText !== '') {
                const newStory = document.createElement('li');
                newStory.textContent = storyText;

                // Add delete button to the story
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () {
                    storyList.removeChild(newStory);
                };

                newStory.appendChild(deleteButton);
                storyList.appendChild(newStory);
                storyInput.value = '';  // Clear the input field
            }

            return false; // Prevent form submission
        }
    </script>
</body>
</html>

<?php
$conn->close();
?>
