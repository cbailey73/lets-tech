const postFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
      const response = await fetch('/api/dashboard/addPost', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  document
    .querySelector('#submit-btn')
    .addEventListener('submit', postFormHandler);