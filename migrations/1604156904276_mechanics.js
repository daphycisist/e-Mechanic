/* eslint-disable camelcase */

const { createTable } = require("node-pg-migrate/dist/operations/tables");

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('mechanics', {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()"),
            comment: "request unique id",
        },
        name: {
            type: 'varchar(100)',
            notNull: true,
        },
        address: {
            type: 'varchar(255)',
            notNull: true,
        },
        phonenumber: {
            type: 'varchar(15)',
            notNull: true,
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('mechanics', {
        ifExists: true
    })
};
