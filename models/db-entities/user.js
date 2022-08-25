"use strict";

const bcrypt = require("bcrypt");
const createGuts = require("../model-guts");
const { createError, BAD_REQUEST } = require("../../common/error-utils");
const name = "User";
const tableName = "users";
const selectableProps = [
  "id",
  "username",
  "email",
  "role",
  "password",
  "hometown",
  "college",
  "name",
  "bio",
  "age",
  "gender",
  "birthday",
  "is_onboarded",
  "job",
  "industry",
  "user_type",
  "photos",
  "dating_standard",
  "lifestyle",
  "following",
  "followers",
  "not_interested",
  "is_phone_verified",
  "phone",
  "influencer",
  "sent_verify_phone_at",
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
  const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

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

  const findAll = () =>
    guts.findAll().then((users) => {
      return users.map((user) => postFind(user));
    });

  const findAllUserIn = (userIds) => {
    if (!userIds) {
      return [];
    }
    return knex("users").select(selectableProps).whereIn("id", userIds);
  };

  const getAndVerify = async (username, password) => {
    const matchErrorMsg = "username or password do not match";
    const user = await guts.findOne({ username });

    if (!user) throw createError(BAD_REQUEST, matchErrorMsg);

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) throw createError(BAD_REQUEST, matchErrorMsg);

    return user;
  };

  const getSuggestedUsersAsDefault = (user) => {
    return knex("users").where(function () {
      if (user.dating_standard) {
        user.dating_standard.forEach((standard) => {
          this.orWhereRaw("? = any (??)", [standard, "dating_standard"]);
        });
      }
      if (user.lifestyle) {
        user.lifestyle.forEach((style) => {
          this.orWhereRaw("? = any (??)", [style, "lifestyle"]);
        });
      }
      if (user.hometown) {
        this.orWhere("hometown", "like", `%${user.hometown}$`);
      }
    });
  };

  const getMembers = async (userIds) => {
    if (!userIds) {
      return [];
    }
    const userSelectedProps = [
      "username",
      "name",
      "email",
      "id",
      "photos",
      "phone",
    ];
    const users = await knex("users")
      .select(userSelectedProps)
      .whereIn("id", userIds);

    return users.map((user) => ({
      id: user.id,
      name: user.name || "",
      username: user.username,
      avatar: user.photos?.portrait || "",
      phone: user.phone,
    }));
  };

  const checkPhonesAreUsed = async (phones) => {
    if (!phones) {
      return [];
    }
    const userSelectedProps = [
      "username",
      "name",
      "email",
      "id",
      "photos",
      "phone",
    ];
    const users = await knex("users")
      .select(userSelectedProps)
      .whereIn("phone", phones);

    return users.map((user) => ({
      id: user.id,
      name: user.name || "",
      username: user.username,
      avatar: user.photos?.portrait || "",
      phone: user.phone,
    }));
  };

  return {
    ...guts,
    create,
    find,
    findOne,
    findAll,
    getAndVerify,
    findAllUserIn,
    getSuggestedUsersAsDefault,
    getMembers,
    checkPhonesAreUsed,
  };
};
