![bubble_logo](/bubble/src/resources/logo.png)

* Application is still in development, not yet hosted on Heroku.*

## Introduction

Bubble is an online scheduling web application for users to keep track of their meetings and daily routines

## Tech Stack

Bubble is built with the following technologies:

* Frontend: React and React Router
* Backend: Express and Node.js
* Database: MongoDB
* State Management: Redux

## Functions

1. Manage Account
	* Create Account
		- Allow users to create new accounts with their email address.
		- Send a welcome/verification email when a user creates an account.
	* Edit Profile
		- Allow users to edit their personal information provided during registration, such as name, password, email, etc.
	* Login
		- Allow users to login using their registered email address and password.

2. Manage Events
	* Create event
		- Allow users to add a new event with an optional deadline, color, and custom prompts for reminders.
	* Modify event
		- Allow users to modify existing bubbles and change any property such as the prompt, color, deadline and description.
	* View Event
		- Allow users to view existing bubbles 
	* Delete event
		- Allow users to delete an existing event.
	* Search event
		- Allow users to search for events by name, date, and description.
	* Sort event
		- Allow users to sort events based on type or importance with different colored bubbles.
	* Recurring event
		- Allow users to set recurring events.

3. Performance
	* Send welcome emails within 10 minutes of registration.
	* Have an average response time that is below 5 ms.
	* Complete an event search request within 3 seconds.
	* Able to handle hundreds of events.
	* Send a reminder email to the user 2 hr before their upcoming deadlines.

4. Security
	* Protect user passwords and data securely by encrypting them.

## Getting Started
### Installation and Setup

1. Install [Node.js](https://nodejs.org/) if you haven't already.

2. Clone this repository and install its dependencies. (make sure to delete the "node modules" folders from the /bubble as well as the /bubble/server folder)
		
		> git clone https://github.com/Yuanionrings/Bubble.git Bubble
		> cd Bubble/bubble
		> npm install
		> cd server
		> npm install

### Run
1. Open up a shell for the server.

		> cd Bubble/bubble/server
		> npm start

2. Open up a second shell for the webapp.

		> cd Bubble/bubble
		> npm start

3. The locally hosted web application should be automatically opened up in your browser.

## Demo video

https://youtu.be/FVurDWqRhXI

## Contributors

* Yuan Gao (gaoy3@wit.edu), Team Lead
* Garnet Yeates (yeatesg@wit.edu), Developer
* Anish Menghani (menghania@wit.edu), Developer

