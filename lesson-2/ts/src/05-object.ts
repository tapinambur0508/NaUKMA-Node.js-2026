type Role = "Admin" | "User";

type User = {
  name: string;
  age: number;
  role: Role;
  greet(): string;
  greeting: () => string;
  log: () => void;
};

let user: User = {
  name: "Dave",
  age: 20,
  role: "Admin",
  greet() {
    return `Hello, I am ${this.name}`;
  },
  greeting: () => {
    return `Hello`;
  },
  log: () => console.log("Logging"),
};
