#! /usr/bin/env node
import inquirer from "inquirer";
console.log("Welcome To OOP my Bank");
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobileNo;
    constructor(firstName, lastName, age, gender, mobileNo) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobileNo = mobileNo;
    }
}
class BankAccount {
    customer;
    balance = 1000000;
    constructor(customer) {
        this.customer = customer;
    }
    credit(amount) {
        this.balance += amount;
        console.log(`Credited ${amount}. New balance is ${this.balance}:`);
    }
    debit(amount) {
        if (amount > this.balance) {
            console.log("Insufficient Balance");
        }
        else {
            this.balance -= amount;
            console.log(`Debited ${amount}. New balance is ${this.balance}:`);
        }
    }
    getBalance() {
        return this.balance;
    }
}
async function main() {
    const customerInfo = await inquirer.prompt([
        { type: "input", name: "firstName", message: "Enter first name:" },
        { type: "input", name: "lastName", message: "Enter last name:" },
        { type: "number", name: "age", message: "Enter age:" },
        { type: "input", name: "gender", message: "Enter gender:" },
        { type: "number", name: "mobileNo", message: "Enter mobile number:" },
    ]);
    const customer = new Customer(customerInfo.firstName, customerInfo.lastName, customerInfo.age, customerInfo.gender, customerInfo.mobileNo);
    const account = new BankAccount(customer);
    while (true) {
        const action = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "What Would You Like To Do?",
                choices: ["Credit", "Debit", "Check Balance", "Exit"]
            }
        ]);
        if (action.action === "Credit") {
            const amount = await inquirer.prompt([
                { type: "number", name: "amount", message: "Enter amount to credit:" }
            ]);
            account.credit(amount.amount);
        }
        else if (action.action === "Debit") {
            const amount = await inquirer.prompt([
                { type: "number", name: "amount", message: "Enter amount to debit:" }
            ]);
            account.debit(amount.amount);
        }
        else if (action.action === "Check Balance") {
            console.log(`Current balance is ${account.getBalance()}`);
        }
        else if (action.action === "Exit") {
            console.log(`Thank You ${customer.firstName} For Using OOP My Bank.`);
            break;
        }
    }
}
main();
