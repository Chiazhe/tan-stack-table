# Server Side Pagination, Column Filtering and Sorting with TanStack Table and TanStack Query

This project showcases how to seamlessly intergrate TanStack's React Query Library and TanStack's React Table to perform server side pagination, column filtering and column sorting.

For this purpose, I've created a simple backend that will return a list of user. This list of users came from a JSON file that's generate from Mockaroo instead of actual database but it simulates the real world scenario whereby admin can get user list from database.

As for the frontend where the magic happens, I've created two projects with ReactJS and NextJS.

NextJS Application is deployed at: https://tanstack-table-nextjs.vercel.app/

ReactJS Application is deployed at: https://tanstack-table-demo-react.netlify.app/

## Getting Started

1. Serve the backend:

   a. `cd backend`

   b. `npm i`

   c. `npm run devStart`

   This will serve the backend at http://localhost:3000

2. Depending on whether you would like to use the NextJS frontend or ReactJS frontend. cd into the respective route:

   a. `cd frontend-nextjs` or `cd frontend`

   b. `npm i`

   c. `npm run dev`

   This will serve the frontend application at http://localhost:5173/ for ReactJS or http://localhost:3001/ for NextJS.
