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
messages should be a list of dictionaries, k/v pairs are user_id, username, message
person1, person2,(these will be their ids) messages which will be String[],

In the /chat page UI: 
Only displays all chats
First it will show a list of all the chats available for either p1 or p2
: at page.tsx fetch all the chats with either p1 or p2 equal to current user_id

Create chat:
click on button on the post,
if there is already a chat present for the post_id, go to that chat
otherwise make a new chat that is relevant to p1,p2,post_id, if any changes there is new url

add a click timeout for the button

## Edit post

[x]create an edit/[post_id] route
[x]fetch the post according to its id
[x]display it onto a textarea. edit the title and description that way
[ ]image?
-> display the image in order
-> add a delete button to each image
-> add the ability to add images to end of list
[ ] update the post according to id

## Wishlist feature