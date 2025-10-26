Travlr Getaways – Full Stack Web Application
Overview
Travlr Getaways started as a basic travel website and turned into a full stack web application with both a public site and a private admin dashboard. The main idea was to build something that connects the customer side (where users can view trips) with the admin side (where trips can actually be created, edited, and deleted).
The project runs on the MEAN stack: MongoDB, Express, Angular, and Node.js  and shows how all parts of a system can talk to each other through RESTful APIs. By the end, both the public website and the admin SPA worked together using the same backend and database, which made the whole system feel complete and realistic.

Architecture
For the customer-facing side, Express with Handlebars (HBS) handles the server rendering. This made it easy to pull in trip data directly from MongoDB and display it fast, while still keeping pages lightweight.
For the admin side, Angular was used to build a single-page application that lets admins log in, view all trips, and update them through live API calls. Using Angular made the admin portal feel modern and responsive, and the reusable components helped a lot with keeping things consistent.
The backend runs on Node.js with Express and connects to MongoDB. Using JavaScript (and TypeScript for Angular) across the stack kept things simpler since everything speaks the same language. MongoDB worked well because it’s flexible and doesn’t require rigid table structures like SQL, which fits perfectly for travel data that can vary from one trip to another.

Functionality
JSON is what ties the whole system together. The backend sends data as JSON, and the frontend receives it and updates the page without reloading. This helped the admin interface feel instant and interactive.
Throughout the project, a lot of the original code was cleaned up and reorganized. The routes and controllers were split out properly, and Angular components were broken down into smaller parts like trip-list, trip-form, and trip-card. This made the codebase cleaner and easier to work with later.
The end result is a system that feels stable, consistent, and professional — but still simple enough to understand how each part works under the hood.

Testing
All of the API endpoints were tested using Postman and curl. These were the main routes checked:
Method	Endpoint	Description
GET	/api/trips	Get all trips
GET	/api/trips/:tripCode	Get one specific trip
POST	/api/trips	Add a new trip
PUT	/api/trips/:tripCode	Update a trip
DELETE	/api/trips/:tripCode	Delete a trip
Once authentication was added, testing had to include secure routes with login tokens. That made debugging a bit trickier, but it was a good learning experience for understanding how security layers fit into full stack development.

Reflection
Building this project from the ground up really tied everything together - frontend, backend, and database all working as one. Seeing the app go from static HTML pages to a real, connected system was easily one of the most rewarding parts of the course.
This project taught how to organize routes and controllers, use APIs properly, and think about scalability and security early on. It also helped build more confidence in Angular, which at first seemed intimidating but ended up being one of the best parts of the project once it clicked.
Overall, Travlr Getaways was a great way to see how all the individual lessons come together into one working system. It’s something that could actually be expanded into a real product and that’s what makes it feel meaningful.


