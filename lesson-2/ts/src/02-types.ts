let name: string = "Dave";
let age: number = 20;
let isActive: boolean = false;

// Array
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Dave", "Mary", "Alice"];

// Tuple
let user: Readonly<[string, number, boolean]> = ["Dave", 20, false];

let anything: any = "Hello";
anything = 12345;
anything.toUpperCase();

let value: unknown = "Hello";
if (typeof value === "string") {
  value.toUpperCase();
}

function sum(a: number, b: number): number {
  return a + b;
}

const result = sum(10, 2);
