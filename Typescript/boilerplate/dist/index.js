"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greet(firstName, lastName) {
    return 'Hello ' + firstName + ' ' + (lastName ? lastName : '');
}
var firstName = 'Rishav';
var lastName = 'Anand';
var message = greet(firstName, lastName);
console.log(message);
