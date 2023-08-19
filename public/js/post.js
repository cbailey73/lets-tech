// Function to handle comment submission
const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const commentContent = document.querySelector('#commentContent').value.trim();

    // Function to extract post ID from the URL
    const getPostIdFromURL = () => {
    const url = window.location.pathname; // Get the current URL
    const parts = url.split('/'); // Split the URL into parts using '/'
    const postIdIndex = parts.indexOf('post'); // Find the index of 'post' in the URL
  
    if (postIdIndex !== -1 && postIdIndex < parts.length - 1) {
      // If 'post' is found and there's a part after it, assume it's the post ID
      return parts[postIdIndex + 1];
    }
  
    return null; // Return null if no post ID is found
    };
  
    // Extract post Id
    const postId = getPostIdFromURL();
    
    if (postId) {
        console.log(`Post ID: ${postId}`);
    } else {
        console.log('No Post ID found in the URL');
    }
  
    if (commentContent && postId) {
      const response = await fetch(`/api/post/${postId}/addComment`, {
        method: 'POST',
        body: JSON.stringify({ commentContent }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // Reload the page to display the new comment
        location.reload();
      } else {
        alert('Failed to add comment');
      }
    }
  };
  
// Add event listener to the comment form
document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);
  