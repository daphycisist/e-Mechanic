/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('requests', {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()"),
            comment: "request unique id",
        },
        servicetype: {
            type: "varchar(20)",
            notNull: true
        },
        description: {
            type: "varchar(255)",
            notNull: true
        },
        requestedservice: {
            type: "uuid",
            references: "services(id)",
            onDelete: 'cascade',
            onUpdate: 'cascade',
            notNull: true
        },
        serviceaddress: {
            type: "varchar(255)",
            notNull: true
        },
        open: {
            type: "boolean",
            default: false
        },
        inprogress: {
            type: "boolean",
            default: false
        },
        closed: {
            type: "boolean",
            default: false
        },
        cancelled: {
            type: "boolean",
            default: false
        },
        assigned: {
            type: "boolean",
            default: false
        },
        assignedmechanic: {
            type: "uuid",
            references: 'mechanics(id)',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('requests', {
        ifExists: true
    })
};
