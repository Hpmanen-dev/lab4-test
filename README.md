## How the project was setup

First I made the folder "Lab3" with command "mkdir Lab3"
After the Lab3 folder was created I went into it using "cd Lab3"
Then I initialised the project with "npm init" then go through all the options.
After the project was initialised I installed the external module
as well as nodemon. with these commands:
"npm install express, @hapi/joi, bcryptjs, jsonwebtoken, mongoose, dotenv -S"
and "npm install nodemon --save-dev"

Now it is only the actual coding left. The code you will be able to see in the .js files.

## How to Use

After having extracted the zip file. 
Go to the project folder, you can do this either by going there manually
and right click and then press "Git Bash Here", Make sure you have Git bash installed.

You can also go to the file path inside of the command-line using the "cd" (Change Directory) command. 

Now when you are in the correct file path you can run the program using "npm run start" or run it with nodemon using "npm run dev".

To stop the program from running you will have to press CTRL + C on your keyboard.

Now you'll have to enter: localhost:1337 into your web browser and the application should be displayed.
With this application you will first need to register your user which will be saved inside a mongoDB database.

When you're logged in after registrering you will see a menu button in the upper left corner.

The application is a work in progress concept of a "Note storage" the point is to be able to keep all your notes in one place.
This way you won't need to keep the notes in your computer and can access them anytime with this application.
The biggest downside is you have to have an internet connection to access it.

You can create a note by going to the "New Note" section and fill in the information then press "Create".
The website should reload and you'll be able to access your created notes in the "Notes" section.
The Notes are connected to the owners username which are retrieved from the JWT. This way other users will not be able to access others notes.

You can also view your account information by going to the "Account" section, this information is displayed by decoding the JSON Web Token that was generated into the local storage after logging in or registerering. 


## Improvements

There are a lot of improvements that can be done with this application some examples are:

The ability to edit/remove your created notes, right now you can only create notes. This will become a problem when you have too many notes, so it would be good to be able to remove or edit the notes.

The style to save in cookies in someway to maintain the same style when the website is refreshed. Currently when you refresh the page or the page is force refreshed the style will change back into default. 

Currently only supports desktop


# Hope you enjoy the program!
