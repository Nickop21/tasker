
# Task Management Application Tasker

## Setup Instructions

To set up and run the Task Management Application locally, follow these steps:

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine (latest version ).
- You should have [npm](https://www.npmjs.com/) (Node Package Manager) installed, which usually comes with Node.js.


### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nickop21/tasker.git
   cd task-management-app
 **Install the dependencies:**

npm install

### Run the application:
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open your browser: Navigate to http://localhost:3000 to view the application.


## Description

This Task Management Application allows users to create, update, complete, and delete tasks. Each task can be prioritized, making it easier to manage daily responsibilities. The application features a user-friendly interface built using React and Next.js, with state management handled through React's `useState` and `useEffect` hooks.

### Approach to Sorting Tasks by Priority

Tasks can be assigned a priority level (e.g., low, medium, high), allowing users to sort tasks based on their urgency. The sorting mechanism leverages JavaScript's `Array.prototype.sort()` method, which compares tasks based on their priority levels. 

Each priority level is represented by a numerical value (e.g., low = 1, medium = 2, high = 3).

 When tasks are sorted, they are arranged in ascending order, ensuring that high-priority tasks appear at the top of the list.


## Features
**Create Tasks:** Users can add new tasks with titles and content.

**Update Tasks:** Users can edit existing tasks.

**Delete Tasks:** Users can remove tasks, with a confirmation prompt.

**Complete Tasks:** Users can mark tasks as completed.

**Sorting by Priority:** Tasks can be sorted by priority for better management.

**progressbar:** Provide extra feature progressbar to easier to track the tasks progress 





