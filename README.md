## Weather App
#### Task Title
Weather App

#### Job Role
Front End Developer (Node - Vue - Mongo/PostgreSQL)

#### Description
Develop a simple, mobile-friendly weather application that fetches weather information from a public API and displays it in a user-friendly interface. The app also stores all weather results in a database and displays them in a table with filters.

#### Requirements
###### API Integration: 
Use the OpenWeatherMap API to fetch weather data (free API key available). Implement this on the server side.
###### Responsive UI: 
Implement a clean and responsive user interface using Vue.js and Tailwind CSS.
###### Weather Display: 
Show the current temperature, weather description, and an icon representing the weather condition.
###### Error Handling: 
Include error handling for network requests.

#### Instructions

##### Environment Setup:
1. Use Vue.js with Tailwind CSS for the frontend.
2. Use Node.js as the backend with GraphQL for the API.
3. Use MongoDB or PostgreSQL as the database.
Share your code via a GitHub or GitLab repository. Make it public or provide access to the repository.

4. API Key:
Sign up for a free API key at OpenWeatherMap and use it in your application.


###### GitHub or GitLab repository link.
1. README.md file with brief explanations, instructions to run the app, and any additional comments.

How to Run the App
Clone the repository:
`git clone <repository-url>`

2. Navigate to the project directory:

`cd weather-app`

3. Install dependencies:

`npm install`

4. Set up environment variables:
Create a `.env` file in the root directory and add your OpenWeatherMap API key:
plaintext

`VUE_APP_OPENWEATHERMAP_API_KEY=your_api_key_here`

5. Run the application:

`npm run serve`

6. Run the backend server:
Navigate to the server directory:

`cd server`

7. Install server dependencies:

`npm install`

Start the server:

`node server.js`