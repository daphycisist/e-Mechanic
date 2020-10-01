/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("services", {
      id: {
        type: "uuid",
        notNull: true,
        primaryKey: true,
        default: pgm.func("uuid_generate_v4()"),
        comment: "Service unique id",
      },
      title: {
        type: "varchar(100)",
        notNull: true,
      },
      description: {
        type: "varchar(100)",
        notNull: true,
        },
        price: {
            type: "integer",
      }
      
    });
};

exports.down = pgm => {
    pgm.dropTable("services")
};
