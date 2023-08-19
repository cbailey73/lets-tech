// Function to handle post update
const editPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    
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
  
    if (title && content && postId) {
      const response = await fetch(`/api/dashboard/edit/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to the dashboard or another page
      } else {
        alert('Failed to update post');
      }
    }
  };
  
  // Add event listener to the edit post form
  document.querySelector('#edit-post-form').addEventListener('submit', editPostFormHandler);
  