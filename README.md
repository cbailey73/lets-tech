# Tech Blog

## Introduction
This website was created to allow users to create, view, and comment upon blog posts that focus on entry-level coding - both the experiences of new coders and helpful information about coding language and practices, as well as tips and tricks that helped them when starting out. Ideally, it will foster a positive environment for new coders to connect and learn.

The website is a Content Management System (CMS)-style site built using Node.js, SQL, and several key dependencies: bcrypt, connect-session-sequelize, dotenv, express, express-handlebars, express-session, mysql2, and sequelize.

## Usage
When you visit the site for the first time, you will be prompted to log in or create an account. To create an account, enter in your email, username, and password. After entering these in, click the "Sign Up" button to save your user credentials and log into the site. You will then be redirected to the homepage. You can also visit the homepage any time by clicking the "Home" link in the navbar.

The homepage contains the title, author, and date last updated of all existing posts, with those updated the latest appearing first. Click "Read More" button on a post you are interested in. You will be taken to the post's page, which includes the contents of the posts as well as the title and author, and all comments about the post. To create your own comment, go to the Add Comment section below the post, type in your comment, and press the "Add Comment" button. Press the back button or click on "Home" in the navbar to return to the homepage.

This website also includes a user dashboard, which you can access by clicking the "Dashboard" link in the navbar. In your dashboard, the first section you see is titled Add a New Post. To make a new post, enter the title and content of the post you want to make, and click "Create Post." Below this section you will see the "My Posts" section, which contains all the posts you've made, as well as the option to edit or delete them. Click "Edit", and the post will pop up with the option to modify its title and content. Click "Delete", and the post will be deleted.

If you wish to logout, click the "Logout" button in the navbar. Be aware that if you are idle on the site for more than a set time, you will be automatically logged out. You'll still be able to access the homepage and view posts and comments, but will no longer be able to make, edit, or delete your own posts via the dashboard.

## License
This project is protected under an MIT License. Further details can be found under the "LICENSE" section of this repository.

## Credits
The code for formatting time was obtained from this repository: https://github.com/DavidTunnell/tech-blog-fullstack-mvc-node-express-mysql-handlebars-authentication/blob/main/utils/helpers.js

The code for creating the navbar was obtained by following this tutorial: https://getbootstrap.com/docs/5.0/components/navbar/

The code for passing variables through partials was obtained by following this tutorial: https://stackoverflow.com/questions/11523331/passing-variables-through-handlebars-partial

The code for passing objects through functions written on handlebars templates was obtained by following this tutorial: https://stackoverflow.com/questions/26642048/pass-object-as-parameter-to-onclick-method-in-handlebars-template

## Deployment
You can view the website here: https://secret-beyond-52845-feb3c4f0627c.herokuapp.com/
