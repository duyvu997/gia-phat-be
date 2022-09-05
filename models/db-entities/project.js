'use strict';

const createGuts = require('../model-guts');

const name = 'Project';
const tableName = 'projects';
const selectableProps = [
  'id',
  'name',
  'location',
  'investor',
  'start_date',
  'end_date',
  'duration_in_days',
  'budget',
  'staffs',
  'supplies',
  'phases',
  'staffs',
  'staffs',
  'status',
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  return {
    ...guts,
  };
};
