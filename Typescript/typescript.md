# Typescript

## What

- open source
- microsoft
- typed super-set javascript

## Why

- related to JS
- static typing and type interface
  - errors are detected as you code or while compilation
  - is optional
- IDE support

## Environment setup

- install nodejs from official website
- npm i -g typescript
- tsc -v
- tsc main.ts
- node main.js

## Variable declarations

## Variable types

- boolean
- number
- string
- null
- undefined
- enum
  (null & undefined subtypes of all types so assignable to all types)

## Type association

- Similar to type casting

## Type inference

- Takes type of the initialized value

## Type union

- let multiType: number | boolean;

## Functions

- `function add(num1: number, num2: number): number {return num1 + num2}`
- throws error in no params sent
- use ? for optional params
  - `function add(num1: number, num2?: number): number {return num1 + num2}`
  - (default value) `function add(num1: number, num2?: number = 5): number {return num1 + num2}`

## Interface

```
interface Person{
  firstName: string;
  lastName?: string;
}
```

## Class

```
class Employee{

  employeeName: string;

  constructor(name: string){
    this.employeeName = name;
  }

  greet(){
    console.log(`Good morning ${this.employeeName}`)
  }
}

let emp1 = new Employee('Vishwas');
emp1.greet();

class Manager extends Employee{
  constructor(managerName: string){
    super(managerName);
  }
  delegateWork(){
    console.log('Delegating work');
  }
}

let emp2 = new Employee('Bruce');
emp2.greet();
emp2.delegateWork();
```

## Access modifiers

- public, private , protected
- default = public
- private cannot be accessed even in the derived class
- protected is accessible in derived class
- !!! check access modifier in derived class of the derived protected member

```
class Employee{

  private employeeName: string;

  constructor(name: string){
    this.employeeName = name;
  }

  greet(){
    console.log(`Good morning ${this.employeeName}`)
  }
}
```

Explore more: https://www.youtube.com/watch?v=WBPrJSw7yQA
