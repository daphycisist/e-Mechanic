/* eslint-disable camelcase */

const { text } = require("express");

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("users", {
      id: {
        type: "uuid",
        notNull: true,
        primaryKey: true,
        default: pgm.func("uuid_generate_v4()"),
        comment: "user unique id",
      },
      email: {
        type: "varchar(100)",
        notNull: true,
        unique: true,
      },
      phone: {
        type: "varchar(20)",
        notNull: true,
        comment: "The unique user id",
      },
      password: {
        type: "text",
      },
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      updated_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });
};

exports.down = pgm => {
    pgm.dropTable("users")
};
