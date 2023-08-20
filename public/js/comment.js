document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch comments for a post
  // const fetchComments = async (post_id) => {
  //   try {
  //     const response = await fetch(`/post/${post_id}/comments`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       return data;
  //       // displayComments(data); 
  //     } else {
  //       throw new Error('Failed to fetch comments');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Function to add a new comment to a post
  const addComment = async (post_id, content) => {

    try {
      const response = await fetch(`/api/posts/${post_id}/addComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        // window.location.replace(`/post/:${post_id}`); // Reload the page to display the new comment
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

  // console.log(`Post ID: ${post_id}`);
  // fetchComments(post_id);

  // Handle form submission for adding a comment
  const addCommentForm = document.querySelector('#submit-button');
  addCommentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = document.querySelector('#content').value;
    addComment(post_id, content);
  });
});
