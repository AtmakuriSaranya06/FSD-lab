// person.js
export class Person {
  constructor(name) {
    this.name = name;
  }
}


// app.js
import { Person } from './person.js';

const p1 = new Person("Asha");
console.log(p1.name);