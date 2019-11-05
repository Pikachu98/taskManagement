# Assignment 1 - Agile Software Practice.

Name: Qianwen Zhang

## Overview.

...... A statement of the API's context and objectives (just a paragraph)........

## API endpoints.

 . . . . . List the API's endpoints and state the purpose of each . . . . 
 
 e.g.

 + DELETE /deleteUser/:id - Delete some user according id by administrator.
 + GET /allUsers - Get all users of the system.
 + GET /addFriend/:id - Get users related to the searching condition(:id is not the real id, that is the name of user.)
 + GET /getCoinBalance/:id  - Get all coins of specific user.
 + GET /getUser/:id   -  Get the detail of specific user.
 + GET/plantList      -  Get the plants saling in the store.
 + POST /user/register  - A new user regist the system.
 + POST/tagCreation  - A new tag is created.
 + POST /addTree  - A new tree is created by the administrator.
 + DELETE /deleteTag/:id   - A tag can be deleted.
 + DELETE  /deleteRecord/:id   - A record can be deleted.
 + PUT /tagEdition/:id   - Tag can be editted by the user.
 + PUT /buyTree/:id     - A user can buy a new tree from store.
 + PUT /deleteTree/:id  - A user can delete a tree they bought and get extra coins.

## Data model.

Check with the image link below.


## Sample Test execution.

Firstly, all the tests can be run separately. However, there're some problems if they run together.

~~~
Users
    GET /allUsers
        ✓ should return all the users 
    GET /addFriend/:id
      when there are related results
        ✓ should return the matching user
      when no results are related
        ✓ should return the NOT found message
    GET /getCoinBalance/:id
      get the coins when id is valid
        ✓ should return the coins that user has
      return the information if id is invalid
        ✓ return the error
    GET /getUser/:id
      get the user if id is valid
        ✓ should return the information of specific user
      return the error information if id is invalid
        ✓ return the error information
    POST /user/register
      if the input userEmail is the only one
        ✓ should return confirmation and update database
      if the email has already be registerd
        ✓ should return the error message
    PUT /buyTree/:id
      when userId is right and buy the tree successfully
        ✓ should insert the tree id into the user tree array
    PUT /deleteTree/:id
      when userId is right and delete the tree successfully
        ✓ should delete the tree id from the user tree array
      when user click on the tree they haven't bought
        ✓ should return the message that tells you info

Tags
  POST /tagCreation
    when user creates an tag
      ✓ should return message about creation is successful or not

  DELETE /deleteTag/:id
    when the id is valid
      ✓ should return the successful message with valid input when deleting TAG
    when the tag id is invalid
      ✓ should return message with invalid input when deleting TAG

  PUT /tagEdition/:id
    when the id is valid during editing
      ✓ should return a message and database updates
    when the id is invalid while editing
      ✓ should return the message

Trees
  GET /plantList
    ✓ should return all the plants in store
  POST /addTree
    if the inputs are valid
      ✓ should return confirmation and update database
    if the inputs are invalid
      ✓ should return the error message
    if input a tree name that has already existed
      ✓ should return the message that let you know the tree has already existed

Records
  DELETE /deleteRecord/:id
    when the id is valid
      ✓ should return the successful message with valid id when deleting the planting records
    when the record id is invalid
      ✓ should return message with invalid id when deleting planting records


## Extra features.

User will be checked whether their user email is the only one. If not, it means that they have already registered, so they cannot register again.

I still use fuzzy search, when user want to add their friend, they don't need to know their long complex id, only input part of their name, then they can get the related results.


[datamodel]: ./img/sample_data_model.jpg