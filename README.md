<p align="center">
  <img src="./public/WeOut.png">
</p>

# WeOut

Welcome to WeOut(beta): An easy-to-use mobile application allowing users to efficiently and quickly coordinate events with your friends. Users can categorize their friends into groups, and invite them into a customizable poll room.

## Getting Started

### Requirements

Must have xCode installed and node.js or yarn.

### How To Install

Please fork and clone.

```
git clone https://github.com/NewYorkersUnite/WeOut.git
```

After installing, run:

```
npm run ios
npm start
```

This starts the iPhone simulator and starts the bundle.js

## Features

| Dashboard                          |               Search               |
| ---------------------------------- | :--------------------------------: |
| ![dashboard](public/Dashboard.gif) | ![searchadd](public/SearchAdd.gif) |

### Dashboard

Upon logging or signing into the app, you will be brought to your dashboard:

On this page, the user will see all their available friends appear on the top of the page. The dashboard will also be the place where you will see any pending notifications and any upcoming events.

### Search

If the user would like to add a friend, the moment the inputted characters that match to a username in the database, the filtered out users will appear on the screen with the option to add them. If selected to be added, a friend request is sent to the recipient and it will render on their notifications tab on their dashboard.

| Status                          |             Categories              |
| ------------------------------- | :---------------------------------: |
| ![dashboard](public/Status.gif) | ![searchadd](public/Categories.gif) |

### Profile

Status:
The user can see their profile page which will have the total amount of friends that they have and how many events they’ve been involved in. On this page, if a user is not available, they can simply press the `Status` button which will toggle their status from active to inactive (and visa versa). The bottom of the profile page shows all the categories that the user may have organized their friends into.

Categories:
When adding a friend, they can specify a category (or multiple categories) that they may fall into. If the user pressed on a particular category, they would be able to see all the friends that fall in that category, and at the bottom of the screen, the user has the option to invite some or all into an event using a poll.

| Invitation to Poll Room              |             All Polls             |
| ------------------------------------ | :-------------------------------: |
| ![dashboard](public/PollDetails.gif) | ![searchadd](public/AllPolls.gif) |

### Active Polls

Invitation into Poll Room:
Once the invite button has been pressed, the user will be brought to a form where they can input the event details and set limits for the amount of suggestions allowed and how long the invited participants will have to give an answer and/or add a suggestion. After submitting the details, they will be brought to all the open polls, including the newly made one.

All Polls:
On this page, the user can see all the open polls that have the preset timer still running. Once the poll timer is up, it will be removed from this view and the resulting information will be displayed on the dashboard (date & time, title of event, and winning vote).
The user can choose from the open poll and see the current suggestions and percentage of votes for each. They can only add one suggestion and/or submit one vote.

## Common Issues

React native is a relatively new framework and often times, the libraries might be depreciated or a new version may have been released. If this happens, please run:

```
npm install
```

## Resources

Built on React Native, Firebase, and Node.

## Creators

Vanessa Chan, Nayyif Oussamatou, Kaitlyn Martinez
