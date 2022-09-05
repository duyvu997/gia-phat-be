'use strict';

const bcrypt = require('bcrypt');
const createGuts = require('../model-guts');

const name = 'Employee';
const tableName = 'employees';
const selectableProps = [
  'id',
  'username',
  'password',
  'first_name',
  'last_name',
  'full_name',
  'phone',
  'birthday',
  'role',
  'joined_date',
  'avatar',
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const SALT_ROUNDS = 10;
  const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

  const beforeSave = async (user) => {
    if (!user.password) {
      return Promise.resolve(user);
    }

    return hashPassword(user.password)
      .then((hash) => ({ ...user, password: hash }))
      .catch((err) => `Error hashing password: ${err}`);
  };

  const postFind = (user) => {
    if (user && user.password) {
      delete user.password;
    }
    return user;
  };

  const create = (props) => beforeSave(props).then((user) => guts.create(user));

  const find = (filters) =>
    guts.find(filters).then((users) => {
      return users.map((user) => postFind(user));
    });

  const findOne = (filters, selects) => {
    return guts.findOne(filters, selects).then((user) => postFind(user));
  };

  return {
    ...guts,
    create,
    find,
    findOne
  };
};
