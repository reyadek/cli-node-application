const yargs = require('yargs');
const chalk = require('chalk');
const contact = require('./contact');

//Add some contact
yargs.command({
    command: 'add',
    describe: `Input new contact example type: node . add --name="john" --email="john@gmail.com" --phone="08123123123" `,
    builder: {
        name: {
            describe: 'Input fullname',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Input email',
            demandOption: true,
            type: 'string'
        },
        phone: {
            describe: 'Input phone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.saveContact(argv.name, argv.email, argv.phone);
    }
}).demandCommand();

//show all contact
yargs.command({
    command: 'list',
    describe: `Listing all contact, name, email nomor phone example type: node . list `,
    handler() {
        contact.listContact();
    }
});

//Search contact by name
yargs.command({
    command: 'search',
    describe: `Search contact by name example type: node . search --name="john"`,
    builder: {
        name: {
            describe: 'Input fullname',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.detailContact(argv.name);
    }
});

//Delete contact by email
yargs.command({
    command: 'delete',
    describe: `Delete contact by email example type: node . delete --email="john@gmail.com" `,
    builder: {
        email: {
            describe: 'Input email',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.deleteContact(argv.email);
    }
});

//run yargs
yargs.parse();