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
    return await Weather.findOne({ location, date });
  },
  getWeatherHistory: async ({ location, from, to }) => {
    return await Weather.find({ location, date: { $gte: new Date(from), $lte: new Date(to) } });
  },
fetchWeather: async ({ location }) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=57601574c05103fc13f3e85bea62d498&units=metric`);
  console.log(response.data);
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
}
};

mongoose.connect('mongodb://localhost:27017/weather', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => console.log('Server running on port 4000'));
