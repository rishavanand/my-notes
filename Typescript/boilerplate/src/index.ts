export { };

function greet(firstName: string, lastName?: string): string {
    return 'Hello ' + firstName + ' ' + (lastName ? lastName : '');
}

let firstName: string = 'Rishav';
let lastName: string = 'Anand';

const message: string = greet(firstName, lastName)
console.log(message);