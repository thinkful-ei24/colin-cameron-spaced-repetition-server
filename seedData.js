const Pair = require('./models/pairs');

const pairs = [
  {
    question: 'AGUA',
    answer: 'WATER'
  },  {
    question: 'BUENOS DIAS',
    answer: 'GOOD MORNING'
  },  {
    question: 'FEO',
    answer: 'UGLY'
  },  {
    question: 'HOLA',
    answer: 'HELLO'
  },  {
    question: 'GRACIAS',
    answer: 'THANK YOU'
  },  {
    question: 'NO',
    answer: 'NO'
  },  {
    question: 'MARTES',
    answer: 'TUESDAY'
  },  {
    question: 'AGOSTO',
    answer: 'AUGUST'
  },  {
    question: 'CERVEZA',
    answer: 'BEER'
  },  {
    question: 'POLLO',
    answer: 'CHICKEN'
  }
];

Pair.insertMany(pairs);