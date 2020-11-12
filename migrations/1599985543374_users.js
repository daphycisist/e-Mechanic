/* eslint-disable camelcase */

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
      firstname: {
        type: "varchar(100)",
        notNull: true,
        comment: "The user firstname",
      },
      lastname: {
        type: "varchar(100)",
        notNull: true,
        comment: "The user lastname",
      },
      email: {
        type: "varchar(100)",
        notNull: true,
        unique: true,
        comment: "The user email",
      },
      phonenumber: {
        type: "varchar(20)",
        notNull: true,
        comment: "The user phonenumber",
      },
      address: {
        type: "varchar(100)",
        notNull: true,
        comment: "The user address",
      },
      password: {
        type: "text",
        notNull: true,
        comment: "The user password",
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
    pgm.dropTable("users", {
      ifExists: true
  })
};
