# Periodic Tables
## Deployed Link

## General Information

Periodic Tables manages the scheduling and processing of a restaurant's reservations. Users may add, modify or cancel a reservation. Each reservation records key information such as name, phone, party size, date and time, and ensures that those dates and times fall within operating hours of the restaurant. A restaurant's tables can also be added to Periodic Tables to track the seating of reservations. From the dashboard, users can see all pending reservations for a given date and seat them at an open table. When the party leaves, the user can complete the reservation using the finish button, removing the reservation from the dashboard.

## Technologies
### Front-end
- React.js
- CSS
- Bootstrap
- JSX
### Back-end
- Knex.js
- Node JS
- PostgresSQL
- Express.js

## Features
### New Reservations
Create a new reservation by clicking `New Reservation` in the navigation menu. Each reservation must be for a future date/time, fall within the restaurant's hours of operation and include the following data:
- First Name
- Last Name
- Phone Number
- Reservation Date
- Reservation Time
- Party Size
Every reservation created is given a default status of "booked." Statuses are managed as the reservation is processed in the system, and are not directly editable.
![image](https://user-images.githubusercontent.com/92411694/178296696-97f68981-405e-4a57-bb10-f7a388daf061.png)

### New Table
Add a table to seat reservations at by clicking `New Table` in the navigation menu. To help identify the restaurant table and limit seating options to tables that suit the party size, every table entry must include the following data:
- Table Name (Must be at least 2 characters)
- Capacity
Upon submission, the new table will populate as a seating option on the dashboard.
![image](https://user-images.githubusercontent.com/92411694/178296801-e900bdd9-e571-46e2-95be-233b1692272a.png)

### Manage Reservations - Dashboard
The home page for Periodic Tables is the dashboard, but it can alse be selected by clicking `Dashboard` from the navigation menu. From the dashboard, reservations can be seated, edited, cancelled or completed.
![image](https://user-images.githubusercontent.com/92411694/178296198-3a3508ea-e4e4-457d-9b6f-6c8d702c2a1d.png)

#### Date Display
The dashboard defaults to reservations scheduled for the current day, but future and past dates can also be viewed using the `Previous Day` and `Next Day` buttons. If the dashboard is displaying a future or past date and the user wants to return to today's view, they can use the `Today` button or click `Dashboard` from the navigation menu again.

#### Reservations Display
Beneath the date buttons, all active reservations for the chosen day are listed. Finished or cancelled reservations will not populate. The reservation will display:
- Name of person who placed the reservation
- Reservation time
- Party size
- Current status
- `Cancel` button - Prompts the user to confirm cancellation of the reservation
- `Edit` button - Redirects to an edit page that allows the user to change the reservation information
![image](https://user-images.githubusercontent.com/92411694/178296461-196767c3-289c-42f0-b127-e528393c7216.png)

Reservations that have not been seated yet will also display a `Seat` button. When clicked, the user will be redirected to a page that displays the reservation information and all existing tables. Tables that are occupied or with too small a capacity for the party will not be selectable.
![image](https://user-images.githubusercontent.com/92411694/178296058-0aea1038-47d6-433e-a1d9-ff0adf1bd13c.png)

#### Tables Display
Beneath the listed reservations, all existing tables are displayed with the following information:
- Table Name
- Status ("Free" or "Occupied")
- Capacity
- Finish Reservation? - `Finish` button populates for "Occupied" tables. When clicked, the associated reservation will be completed.

### Search
If the user needs to look up a reservation to confirm details, edit or cancel it, they can click the `Search` option from the navigation menu. By entering the phone number, or part of the phone number, associated with the reservation and clicking `Find`, all reservations matching the criteria will populate. Upon locating the reservation, the `Edit` and `Cancel` buttons will allow the user to make the requested changes.
![image](https://user-images.githubusercontent.com/92411694/178296610-f77c5961-4ce0-41b9-b67b-708b3cc0970c.png)

## API
### Reservation 
`/reservations`
- GET - Returns all reservations without the status of finished or cancelled.
- POST - Adds a new reservation to the system.
    Required body:
    |Params             |Type       |
    |-------------------|-----------|
    |`first_name`       |`string`   |
    |`last_name`        |`string`   |
    |`mobile_number`    |`string`   |
    |`people`           |`integer`  |
    |`reservation_date` |`date`     |
    |`reservation_time` |`time`     |
    |`status`           |`string`   |



### Reservation by ID
`/reservations/:reservation_id`
Required Param: `reservation_id`
- GET - Returns reservation with matching reservation_id
- PUT - Updates reservation with matching reservation_id
    Required body:
    |Params             |Type       |
    |-------------------|-----------|
    |`first_name`       |`string`   |
    |`last_name`        |`string`   |
    |`mobile_number`    |`string`   |
    |`people`           |`integer`  |
    |`reservation_date` |`date`     |
    |`reservation_time` |`time`     |
    |`status`           |`string`   |


### Get Reservation Status
`/reservations/:reservation_id/status`
Required Param: `reservation_id`
- PUT - updates reservation with a status of "seated", "cancelled", or "finished"
    Required body:
    |Params             |Type       |
    |-------------------|-----------|
    |`status`           |`string`   |

### Table
`/tables`
- GET - Returns all tables in the system.
- POST - Adds a new table to the system.
    Required body:
    |Params             |Type       |
    |-------------------|-----------|
    |`table_name`       |`string`   |
    |`capacity`         |`integer`  |

### Table by ID
`/tables/:table_id`
Required params: `table_id`
- PUT - updates the `reservation_id` associated with the table
    Required body:
    |Params             |Type       |
    |-------------------|-----------|
    |`reservation_id`   |`integer`  |
    |`status        `   |`string`   |

- DELETE - replaces `reservation_id` associated with null, and updates `status` of previously connected reservation.


## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.


