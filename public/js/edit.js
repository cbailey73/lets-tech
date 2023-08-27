document.addEventListener('DOMContentLoaded', () => {
    const editPostForm = document.querySelector('#editPostForm');
    const postIdInput = document.querySelector('#postId');
  
    // Function to edit post upon submission of the edit post form
    editPostForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const title = document.querySelector('#title').value;
      const content = document.querySelector('#content').value;
      const postId = postIdInput.value;
  
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        });
  
        console.log(response);
        
        if (response.ok) {
          window.location.href = `/post/${postId}`;
        } else {
          throw new Error('Failed to update the post');
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
  