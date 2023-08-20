// const router = require('express').Router();
// const withAuth = require('../../utils/auth');
// const { User, Post } = require('../../models');

  
// // Add post to dashboard route
// router.post('/addPost', withAuth, async (req, res) => {
//     try {
//       const userId = req.session.userId;
//       const { title, content } = req.body;
  
//       const newPost = await Post.create({
//         title,
//         content,
//         userId,
//       });
  
//       res.redirect('/dashboard');
//     } catch (error) {
//       res.status(500).json({ message: 'An error has occurred' });
//     }
//   });
  
// // Edit post route
// router.get('/edit/:postId', withAuth, async (req, res) => {
//     try {
//       const postId = req.params.postId;
//       const post = await Post.findByPk(postId);
//       res.render('edit-post', { post });
//     } catch (error) {
//       res.status(500).json({ message: 'An error has occurred' });
//     }
//   });
  
// // Update post route
// router.put('/edit/:postId', withAuth, async (req, res) => {
//     try {
//       const postId = req.params.postId;
//       const { title, content } = req.body;
  
//       await Post.update(
//         { title, content },
//         { where: { id: postId } }
//       );
  
//       res.redirect('/dashboard');
//     } catch (error) {
//       res.status(500).json({ message: 'An error has occurred' });
//     }
//   });
  
// // Delete post route
// router.get('/delete/:postId', withAuth, async (req, res) => {
//     try {
//       const postId = req.params.postId;
  
//       await Post.destroy({ where: { id: postId } });
  
//       res.redirect('/dashboard');
//     } catch (error) {
//       res.status(500).json({ message: 'An error has occurred' });
//     }
//   });
  

// // router.delete('/post/:id', withAuth, async (req, res) => {
// //     try {
// //         const postId = req.params.id;
// //         await Post.destroy({ where: { id: postId } });
// //         res.status(200);
// //     } catch (err) {
// //         res.status(500).json({ message: 'An error has occurred' });
// //     }
// // });

// // router.delete('/comment/:id', async (req, res) => {
// //     try {
// //         const commentId = req.params.id;
// //         await Comment.destroy({ where: { id: commentId } });
// //         res.status(200);
// //     } catch (err) {
// //         res.status(500).json({ message: 'An error has occurred' });
// //     }
// // });

// module.exports = router;