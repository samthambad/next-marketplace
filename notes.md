# Notes

## Auth

supabase auth uses the ssr version and directory is in app/lib/supabase

## Users

when user 1st logs in should be added to user_info

## Post

As each post is created, the post is added to posts db
Delete button for post if the user is creator
-> click button, delete straight away but post is a client component
At each post, you should be able to click on a chat button, and be able to chat with the author

## Chat

There should be db for chats with columns
person1, person2,(these will be their ids) messages a String[],
In the chat page UI: 
LHS will be all the people
RHS is the chat when you click
