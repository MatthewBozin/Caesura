A MEEN stack app that uses MVC architecture to help manage orders for a restaurant.

---

# Features

- Auth system that manages user accounts and validates logins/signups
- View for customers shows the customer's orders along with menu
- View for chefs shows all orders grouped by customer ID
- All orders are timestamped

# How it's made:

Tech stack: MongoDB, Express, EJS, Node

Architecture used: Model-View-Controller

Packages/dependencies used: bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Optimizations

- todos.ejs could be split into two separate pages instead of using conditional rendering
- Could use a visual overhaul - we focused on getting things functional first

---

# Lessons Learned

- Organizing and properly labeling commits ends up making project management a really smooth process!

---

# How to Use

- Install all the dependencies or node packages used for development via Terminal: `npm install` 
- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 


