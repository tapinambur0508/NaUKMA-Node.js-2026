let id: number | string = 123;
id = "06753bdd-373a-44b9-aa3b-7c276b58b624";

function formatId(id: number | string): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }

  return `ID-${id}`;
}

formatId("06753bdd-373a-44b9-aa3b-7c276b58b624");

let mix1: (string | number | boolean)[] = [123, "Hello, World", 234, false];
let mix2: Array<string | number | boolean> = [123, "Hello, World", 234, false];
