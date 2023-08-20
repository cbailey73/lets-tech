// public/js/single-post.js

document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch comments for a post
  const fetchComments = async (post_id) => {
    try {
      const response = await fetch(`/post/${post_id}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
        // displayComments(data); 
      } else {
        throw new Error('Failed to fetch comments');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add a new comment to a post
  const addComment = async (post_id, content) => {

    const lastUpdated = new Date();

    try {
      const response = await fetch(`/api/posts/${post_id}/addComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, lastUpdated }),
      });

      if (response.ok) {
        // Comment added successfully, you can handle this as needed
        window.location.reload(); // Reload the page to display the new comment
      } else {
        throw new Error('Failed to add a comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Call the fetchComments function when the page loads
  // Get the HTML element with the data attribute
  const postElement = document.getElementById('post');

// Extract the postId from the data attribute
  const post_id = postElement.getAttribute('data-post-id');

  console.log(`Post ID: ${post_id}`);
  fetchComments(post_id);

  // Handle form submission for adding a comment
  const addCommentForm = document.querySelector('#addCommentForm');
  addCommentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = document.querySelector('#commentContent').value;
    addComment(post_id, content);
  });
});
