const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//Create folder if not exist
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

//Create file contact.js if not exist
const filePath = './data/contact.json';
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

const loadContact = () => {
    const fileTemp = fs.readFileSync('data/contact.json', 'utf-8');
    const fileJson = JSON.parse(fileTemp);
    return fileJson;
};

const saveContact = (name, email, phone) => {
    const contact = {
        name: name,
        email: email,
        phone: phone
    }

    const fileJson = loadContact();

    const duplicatEmail = fileJson.find((contact) => contact.email == email);
    if (duplicatEmail || !validator.isEmail(email)) {
        console.log(chalk.red.inverse.bold(`Email "${email}" already exist or not valid, try another email !!`));
        return false;
    }

    //Indonesian phone number ex: 08123123123 min 11 digit
    const duplicatPhone = fileJson.find((contact) => contact.phone == phone);
    if (duplicatPhone || !validator.isMobilePhone(phone, 'id-ID')) {
        console.log(chalk.red.inverse.bold(`Phone "${phone}" already exist or not valid, try another phone number !!`));
        return false;
    }

    fileJson.push(contact);

    fs.writeFileSync('data/contact.json', JSON.stringify(fileJson));
    console.log(chalk.green.inverse.bold('Thankyou your contact success save !'));
}

const listContact = () => {
    const fileJson = loadContact();
    console.log(chalk.blue.inverse.bold('List data contact !'));
    fileJson.forEach((kontak, i) => {
        console.log(`${i+1}. ${kontak.name} - ${kontak.email} - ${kontak.phone}`);
    });
};

//Seacrh contact by name
const detailContact = (name) => {

    const fileJson = loadContact();

    const result = fileJson.filter((res) => res.name.toLowerCase() === name.toLowerCase());

    if (!result || result.length === 0) {
        console.log(chalk.red.inverse.bold(`Name ${name} not found !`));
        return false;
    } else {
        console.log(chalk.blue.inverse.bold(`Name ${name} found!`));
        result.forEach((val, i) => {
            console.log(`${i+1}. Name:${val.name} - Email:${val.email} - Phone Number:${val.phone}`);
        });
    }
}

//Delete contact by email
const deleteContact = (email) => {
    const fileJson = loadContact();

    const newContact = fileJson.filter((res) => res.email.toLowerCase() !== email.toLowerCase());

    if (fileJson.length === newContact.length) {
        console.log(chalk.red.inverse.bold(`Email ${email} not found !`));
        return false;
    } else {
        console.log(chalk.blue.inverse.bold(`Email ${email} success deleted!`));
        fs.writeFileSync('data/contact.json', JSON.stringify(newContact));
    }
}

module.exports = { saveContact, listContact, detailContact, deleteContact };