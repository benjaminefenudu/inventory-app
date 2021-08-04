# Inventory Management App

## Overview

This App is intended to serve as an inventory management application for a store. The codes here powers the backend functionality of the App.

## Objectives

- Users can register an account through the signup route
- Only registered Users can:
  - sign into their account
- Only signed users can:
  - update their profiles
  - change password
  - create items and store details of the items in our database
  - get all the items peculiar to their accounts
  - get a specific item from their list of items
  - update and delete their items from the database
- A user cannot update, get, or delete another user's details
- A user cannot update or delete another user's account

# More...

[https://documenter.getpostman.com/view/16946957/TzshH5YV]

## Technologies Utilized

- Nodejs
- Expressjs
- Multer
- Mongoose
- MongoDB (Atlas)
- Testing
- POSTMAN: User and Product details for account creation and product creation respectively can be entered using the Form-Data field of postman. Data from the Form-Data field is parsed by Multer

## Dependecies

- bcrypt: encrypts user's passwords
- cookie-parser: stores user's token
- dotenv: for environment variables
- express: server setup, middlewares e.t.c
- joi: data validation
- jsonwebtoken: generates token
- mongoose: MongoDB driver
- multer: image upload and form data parser
- ngrok: for testing endpoints online

## Contributors

- Benjamin Efenudu
- Eric Enukpere
- Pella Oyovwe
- Shedrack Ogoro
