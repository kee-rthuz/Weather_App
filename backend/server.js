const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const weatherSchema = new mongoose.Schema({
  location: String,
  date: Date,
  temperature: Number,
  description: String,
  icon: String
});

const Weather = mongoose.model('Weather', weatherSchema);

const apiKey = '57601574c05103fc13f3e85bea62d498';

const schema = buildSchema(`
  type Weather {
    id: ID!
    location: String!
    date: String!
    temperature: Float!
    description: String!
    icon: String!
  }

  type Query {
    getWeather(location: String!, date: String!): Weather
    getWeatherHistory(location: String!, from: String!, to: String!): [Weather]
  }

  type Mutation {
    fetchWeather(location: String!): Weather
  }
`);

const root = {
  getWeather: async ({ location, date }) => {
    try {
      return await Weather.findOne({ location, date });
    } catch (error) {
      throw new Error('Error fetching weather data: ' + error.message);
    }
  },
  getWeatherHistory: async ({ location, from, to }) => {
    try {
      return await Weather.find({ location, date: { $gte: new Date(from), $lte: new Date(to) } });
    } catch (error) {
      throw new Error('Error fetching weather history: ' + error.message);
    }
  },
  fetchWeather: async ({ location }) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      const weatherData = {
        location,
        date: new Date(),
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      };
      const weather = new Weather(weatherData);
      await weather.save();
      return weather;
    } catch (error) {
      throw new Error('Error fetching weather data from API: ' + error.message);
    }
  }
};

mongoose.connect('mongodb://localhost:27017/weather', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  customFormatErrorFn: (err) => ({
    message: err.message,
    locations: err.locations,
    path: err.path,
    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
      timestamp: new Date().toISOString()
    }
  })
}));

app.listen(4000, () => console.log('Server running on port 4000'));
