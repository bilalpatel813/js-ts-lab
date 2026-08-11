# 🔷 TypeScript Complete Developer Guide

> A comprehensive reference covering every core concept a TypeScript developer needs to know — from variables to design patterns, all through TypeScript's type-system lens.

---

## 📋 Table of Contents

1. [Variables & Type Annotations](#1-variables--type-annotations)
2. [Data Types](#2-data-types)
3. [Operators](#3-operators)
4. [Conditions](#4-conditions)
5. [Loops](#5-loops)
6. [Functions](#6-functions)
7. [Arrays & Tuples](#7-arrays--tuples)
8. [Objects & Type Aliases](#8-objects--type-aliases)
9. [Interfaces](#9-interfaces)
10. [Classes](#10-classes)
11. [Constructors & Access Modifiers](#11-constructors--access-modifiers)
12. [OOP — 4 Pillars](#12-oop--4-pillars)
13. [Generics](#13-generics)
14. [Union, Intersection & Type Narrowing](#14-union-intersection--type-narrowing)
15. [Enums](#15-enums)
16. [Utility Types](#16-utility-types)
17. [Async/Await](#17-asyncawait)
18. [Error Handling](#18-error-handling)
19. [Modules & Namespaces](#19-modules--namespaces)
20. [Decorators, tsconfig & Design Patterns](#20-decorators-tsconfig--design-patterns)

---

## 1. Variables & Type Annotations

TypeScript = JavaScript + a **type system** layered on top. Variables work like JS, but you can (and should) annotate their type.

```typescript
// Type annotation — explicit
let age: number = 25;
let name: string = "Alice";
let isActive: boolean = true;

// Type inference — TS figures out the type automatically
let score = 100;          // inferred as number
let greeting = "Hi";      // inferred as string
// score = "high";        // ❌ Error: Type 'string' is not assignable to type 'number'

// const — same as JS, but TS narrows the type to the LITERAL value
const PI = 3.14159;       // type: 3.14159 (literal type), not just `number`
let mutable = 3.14159;    // type: number (widened, since it can change)

// let vs const vs var — same scoping rules as JS
let reassignable = 1;
reassignable = 2;          // ✅ OK

// Declaring type without initializing
let username: string;
username = "bob";

// any — opts out of type checking (avoid when possible!)
let anything: any = 5;
anything = "now a string";   // ✅ no error, but you lose all safety

// unknown — safer alternative to any (must narrow before use)
let value: unknown = 10;
// value.toFixed();         // ❌ Error — must check type first
if (typeof value === "number") {
  value.toFixed();           // ✅ OK now, TS knows it's a number
}
```

> **Key rule:** Prefer explicit types on function signatures and public APIs; let TS infer types for local variables when it's obvious.

---

## 2. Data Types

### Primitive Types

```typescript
let num: number       = 42;
let big: bigint        = 100n;
let str: string         = "hello";
let bool: boolean       = true;
let nothing: undefined  = undefined;
let empty: null         = null;
let sym: symbol         = Symbol("id");
```

### Special TypeScript Types

```typescript
let notAssigned: any;          // disables type checking entirely (avoid)
let safer: unknown;            // type-safe "any" — must narrow before use
function fail(): never {       // never — function never returns (throws/infinite loop)
  throw new Error("Always fails");
}
function logMsg(msg: string): void {  // void — function returns nothing useful
  console.log(msg);
}
```

### Object & Array Types

```typescript
let obj: object = { name: "Alice" };       // any non-primitive
let arr: number[] = [1, 2, 3];             // array of numbers
let arr2: Array<string> = ["a", "b"];      // generic array syntax (same thing)
let tuple: [string, number] = ["Alice", 30]; // fixed-length, fixed-type array
```

### Literal Types

```typescript
let direction: "up" | "down" | "left" | "right";
direction = "up";      // ✅
// direction = "north"; // ❌ Error — not one of the literal options

let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
```

### Type Aliases for Primitives

```typescript
type ID = string | number;     // reusable custom type name
let userId: ID = 123;
let orderId: ID = "ORD-001";
```

### Type Assertions (Casting)

```typescript
let someValue: unknown = "this is a string";

// `as` syntax (preferred)
let strLength: number = (someValue as string).length;

// Angle-bracket syntax (avoid in .tsx files — conflicts with JSX)
let strLength2: number = (<string>someValue).length;

// Non-null assertion — tell TS "this is definitely not null/undefined"
function getValue(): string | null { return "hi"; }
let val: string = getValue()!;   // ! asserts non-null
```

---

## 3. Operators

All standard JavaScript operators work identically — TypeScript adds compile-time type checking around them.

```typescript
let a: number = 10, b: number = 3;
a + b;   a - b;   a * b;   a / b;   a % b;   a ** b;

// Comparison — TS encourages strict equality
a === b;   a !== b;   a > b;   a < b;

// Logical
true && false;
true || false;
!true;

// Nullish coalescing & optional chaining (fully type-aware)
interface User { profile?: { name?: string } }
const user: User = {};
const name = user.profile?.name ?? "Anonymous";   // string, TS knows the fallback type

// Type guards used as boolean checks
function isString(val: unknown): val is string {
  return typeof val === "string";
}
```

### `typeof` as a Type Operator (not just runtime check)

```typescript
const config = { debug: true, retries: 3 };
type Config = typeof config;     // extracts the TYPE of `config`
// Config = { debug: boolean; retries: number }
```

---

## 4. Conditions

### if / else if / else — same as JS, with type narrowing benefits

```typescript
function describe(value: number | string) {
  if (typeof value === "number") {
    console.log(value.toFixed(2));   // TS knows value is number here
  } else {
    console.log(value.toUpperCase()); // TS knows value is string here
  }
}
```

### switch with Exhaustiveness Checking

```typescript
type Shape = "circle" | "square" | "triangle";

function area(shape: Shape, size: number): number {
  switch (shape) {
    case "circle":
      return Math.PI * size ** 2;
    case "square":
      return size ** 2;
    case "triangle":
      return (Math.sqrt(3) / 4) * size ** 2;
    default:
      const _exhaustive: never = shape;  // ❌ compile error if a case is missing!
      throw new Error("Unhandled shape");
  }
}
```

### Ternary Operator

```typescript
const age: number = 20;
const status: string = age >= 18 ? "Adult" : "Minor";
```

---

## 5. Loops

Loops behave exactly like JavaScript — TS just type-checks the loop variable and collection.

```typescript
for (let i: number = 0; i < 5; i++) {
  console.log(i);
}

const fruits: string[] = ["Apple", "Banana", "Cherry"];
for (const fruit of fruits) {       // fruit inferred as string
  console.log(fruit.toUpperCase());
}

const person = { name: "Alice", age: 30 };
for (const key in person) {          // key inferred as string (keyof person ideally)
  console.log(key);
}

let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}
```

---

## 6. Functions

```typescript
// Typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function with types
const multiply = (a: number, b: number): number => a * b;

// Optional parameters (use ?)
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

// Default parameters
function power(base: number, exponent: number = 2): number {
  return base ** exponent;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

// Function type annotation (the shape of a function as a type)
let mathOp: (a: number, b: number) => number;
mathOp = add;          // ✅ matches the signature
mathOp = multiply;     // ✅ also matches

// Function overloads — multiple signatures for one implementation
function format(value: number): string;
function format(value: string): string;
function format(value: number | string): string {
  return typeof value === "number" ? value.toFixed(2) : value.trim();
}

// void return type for callbacks/side effects
function logMessage(msg: string): void {
  console.log(msg);
}
```

---

## 7. Arrays & Tuples

```typescript
// Typed arrays
const nums: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// readonly array — cannot be mutated
const fixedNums: readonly number[] = [1, 2, 3];
// fixedNums.push(4);  // ❌ Error — push doesn't exist on readonly array

// Array of objects
interface Point { x: number; y: number; }
const points: Point[] = [{ x: 0, y: 0 }, { x: 1, y: 1 }];

// Tuples — fixed length AND fixed types per position
let coordinate: [number, number] = [10, 20];
let entry: [string, number, boolean] = ["Alice", 30, true];

// Named tuples (more readable)
let namedTuple: [name: string, age: number] = ["Alice", 30];

// Optional tuple elements
let optionalTuple: [string, number?] = ["Alice"];

// Rest elements in tuples
let restTuple: [string, ...number[]] = ["scores", 90, 85, 100];

// Array methods retain full type safety
const doubled: number[] = nums.map(n => n * 2);
const evens: number[] = nums.filter(n => n % 2 === 0);
```

---

## 8. Objects & Type Aliases

```typescript
// Inline object type annotation
let person: { name: string; age: number } = { name: "Alice", age: 30 };

// Type alias — reusable named type
type Person = {
  name: string;
  age: number;
  email?: string;       // optional property
  readonly id: number;  // cannot be reassigned after creation
};

const p: Person = { name: "Alice", age: 30, id: 1 };
// p.id = 2;            // ❌ Error — readonly property

// Index signatures — for objects with dynamic/unknown keys
type Dictionary = {
  [key: string]: number;
};
const scores: Dictionary = { math: 90, science: 85 };

// Nested object types
type Address = { city: string; zip: string };
type Employee = {
  name: string;
  address: Address;       // composing types
};

// Object destructuring with types
function printPerson({ name, age }: Person): void {
  console.log(`${name}, ${age}`);
}
```

---

## 9. Interfaces

An **interface** defines a contract/shape that objects, classes, or functions must follow. Similar to type aliases, but extendable and more idiomatic for object/class shapes.

```typescript
interface Animal {
  name: string;
  age: number;
  makeSound(): void;        // method signature
}

const dog: Animal = {
  name: "Rex",
  age: 3,
  makeSound() {
    console.log("Woof!");
  },
};

// Optional and readonly properties
interface Config {
  readonly apiUrl: string;
  timeout?: number;          // optional
}

// Extending interfaces (inheritance)
interface Pet extends Animal {
  owner: string;
}

const myPet: Pet = { name: "Rex", age: 3, owner: "Alice", makeSound() {} };

// Multiple inheritance
interface Swimmer { swim(): void; }
interface Flyer { fly(): void; }
interface Duck extends Swimmer, Flyer { quack(): void; }

// Interfaces for function types
interface MathFn {
  (a: number, b: number): number;
}
const add: MathFn = (a, b) => a + b;

// Interfaces for classes (a contract a class must implement)
interface Drivable {
  start(): void;
  stop(): void;
}

class Car implements Drivable {
  start() { console.log("Starting..."); }
  stop()  { console.log("Stopping..."); }
}

// Declaration merging — same-named interfaces combine automatically
interface Box { width: number; }
interface Box { height: number; }    // merges with the above
const box: Box = { width: 10, height: 20 };
```

### Interface vs Type Alias

| Feature                          | `interface`        | `type`                     |
|-----------------------------------|---------------------|------------------------------|
| Extending                        | `extends`           | `&` (intersection)          |
| Declaration merging              | ✅ Yes               | ❌ No                         |
| Union types                      | ❌ No                | ✅ Yes (`type A = X \| Y`)   |
| Primitives/tuples                | ❌ No                | ✅ Yes                        |
| Best for                         | Object/class shapes  | Unions, primitives, mapped types |

---

## 10. Classes

```typescript
class Car {
  // Property declarations with types
  brand: string;
  year: number;
  private mileage: number = 0;       // accessible only within this class

  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = year;
  }

  start(): void {
    console.log(`${this.brand} is starting...`);
  }

  drive(km: number): void {
    this.mileage += km;
  }

  // Getter / Setter
  get displayName(): string {
    return `${this.year} ${this.brand}`;
  }

  // Static members
  static category: string = "Vehicle";
  static compare(a: Car, b: Car): number {
    return a.year - b.year;
  }
}

const myCar = new Car("Toyota", 2022);
myCar.start();
console.log(myCar.displayName);     // "2022 Toyota"
console.log(Car.category);           // "Vehicle"
```

### Parameter Properties (TS shortcut)

```typescript
// Instead of declaring + assigning in the constructor body,
// add an access modifier directly to the parameter:
class Point {
  constructor(public x: number, public y: number) {}
  // TS auto-creates and assigns `this.x` and `this.y`
}

const pt = new Point(3, 4);
console.log(pt.x, pt.y);   // 3 4
```

---

## 11. Constructors & Access Modifiers

```typescript
class Person {
  constructor(
    public name: string,           // public — accessible everywhere (default)
    private age: number,           // private — only inside THIS class
    protected ssn: string          // protected — this class + subclasses
  ) {}

  // Method using private field internally
  isAdult(): boolean {
    return this.age >= 18;
  }
}

const p = new Person("Alice", 30, "123-45-6789");
console.log(p.name);        // ✅ public — accessible
// console.log(p.age);       // ❌ Error — private
// console.log(p.ssn);       // ❌ Error — protected

class Employee extends Person {
  showSSN(): void {
    console.log(this.ssn);   // ✅ OK — protected is accessible in subclass
    // console.log(this.age); // ❌ still inaccessible — private doesn't inherit
  }
}
```

### True Private Fields (`#`, ECMAScript-native)

```typescript
class BankAccount {
  #balance: number = 0;     // truly private — even reflection can't access it

  deposit(amount: number): void {
    this.#balance += amount;
  }

  get balance(): number {
    return this.#balance;
  }
}
```

### Readonly Properties

```typescript
class Config {
  readonly apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;     // can only be set once, in the constructor
  }
}
```

### Static Constructors / Initialization Blocks

```typescript
class AppConfig {
  static appName: string;
  static {                          // static initialization block (ES2022)
    AppConfig.appName = "MyApp";
  }
}
```

---

## 12. OOP — 4 Pillars

---

### 1. Encapsulation — hide implementation, expose a controlled interface

```typescript
class BankAccount {
  private balance: number = 0;

  deposit(amount: number): void {
    if (amount > 0) this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }

  get currentBalance(): number {    // controlled, read-only access
    return this.balance;
  }
}
```

---

### 2. Inheritance

```typescript
class Animal {
  constructor(public name: string) {}
  speak(): void {
    console.log("...");
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name);              // call parent constructor — required first
  }
  override speak(): void {    // `override` keyword (TS 4.3+) catches typos
    super.speak();
    console.log(`${this.name} says Woof!`);
  }
}
```

---

### 3. Polymorphism

```typescript
class Cat extends Animal {
  override speak(): void {
    console.log(`${this.name} says Meow!`);
  }
}

const animals: Animal[] = [new Dog("Rex", "Lab"), new Cat("Whiskers")];
animals.forEach(a => a.speak());   // each behaves according to its own class

// Method overloading achieves compile-time polymorphism (see Section 6)
```

---

### 4. Abstraction — `abstract` classes & interfaces

```typescript
abstract class Shape {
  abstract area(): number;          // must be implemented by subclasses — no body allowed

  display(): void {                  // concrete, shared method
    console.log(`Area: ${this.area()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

// const s = new Shape();   // ❌ Error — cannot instantiate abstract class
const c = new Circle(5);
c.display();                  // Area: 78.53...
```

> **Rule of thumb:** Use `interface` for a pure contract with no shared code; use `abstract class` when subclasses should share common logic too.

---

## 13. Generics

Generics let you write reusable, type-safe code that works with multiple types while preserving type information.

```typescript
// Generic function — T is a placeholder type, inferred or specified at call time
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");   // explicit
identity(42);                 // inferred as number

// Generic with arrays
function firstElement<T>(arr: T[]): T {
  return arr[0];
}
firstElement([1, 2, 3]);        // number
firstElement(["a", "b"]);       // string

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
pair("age", 30);    // [string, number]

// Generic constraints — restrict what T can be
interface HasLength {
  length: number;
}
function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}
logLength("hello");     // ✅ strings have .length
logLength([1, 2, 3]);   // ✅ arrays have .length
// logLength(42);        // ❌ Error — number has no .length

// Generic interfaces
interface Box<T> {
  contents: T;
}
const stringBox: Box<string> = { contents: "hello" };
const numberBox: Box<number> = { contents: 42 };

// Generic classes
class Stack<T> {
  private items: T[] = [];

  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);

// Default generic types
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

// keyof with generics — safe property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: "Alice", age: 30 };
getProperty(user, "name");   // "Alice", typed as string
// getProperty(user, "email"); // ❌ Error — "email" not a key of user
```

---

## 14. Union, Intersection & Type Narrowing

### Union Types (`|`) — value can be one of several types

```typescript
let id: string | number;
id = "abc123";   // ✅
id = 123;         // ✅
// id = true;       // ❌ Error

function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());   // narrowed to string
  } else {
    console.log(id.toFixed(2));       // narrowed to number
  }
}
```

### Intersection Types (`&`) — combine multiple types into one

```typescript
type Named = { name: string };
type Aged  = { age: number };

type Person = Named & Aged;     // must have BOTH name AND age

const p: Person = { name: "Alice", age: 30 };
```

### Type Narrowing Techniques

```typescript
// typeof guard
function process(value: string | number) {
  if (typeof value === "string") { /* string logic */ }
}

// instanceof guard
class Dog { bark() {} }
class Cat { meow() {} }
function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// in operator guard
interface Bird { fly(): void; }
interface Fish { swim(): void; }
function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}

// Discriminated unions — a shared literal "tag" property
interface Circle  { kind: "circle"; radius: number; }
interface Square  { kind: "square"; side: number; }
type Shape = Circle | Square;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
  }
}

// Custom type guards (is predicate)
function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}
```

---

## 15. Enums

Enums define a set of named constants.

```typescript
// Numeric enum — auto-increments starting at 0
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}
let dir: Direction = Direction.Up;

// Custom starting value
enum StatusCode {
  Success = 200,
  NotFound = 404,
  ServerError = 500,
}

// String enums — more readable when debugging
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}
let favColor: Color = Color.Green;   // "GREEN"

// Using enums in a switch
function getColorHex(color: Color): string {
  switch (color) {
    case Color.Red:   return "#FF0000";
    case Color.Green: return "#00FF00";
    case Color.Blue:  return "#0000FF";
  }
}

// const enum — fully inlined at compile time (no runtime object), more performant
const enum Direction2 {
  Up, Down, Left, Right
}

// Alternative: "as const" object (modern, often preferred over enum)
const Direction3 = {
  Up: "UP",
  Down: "DOWN",
} as const;
type Direction3Type = typeof Direction3[keyof typeof Direction3]; // "UP" | "DOWN"
```

---

## 16. Utility Types

TypeScript ships with built-in generic utility types that transform existing types.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T> — makes all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number }
function updateUser(id: number, fields: Partial<User>) { /* ... */ }

// Required<T> — makes all properties required (opposite of Partial)
type RequiredUser = Required<PartialUser>;

// Readonly<T> — makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick<T, K> — select a subset of properties
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit<T, K> — exclude specific properties
type UserWithoutEmail = Omit<User, "email">;
// { id: number; name: string; age: number }

// Record<K, T> — build an object type with specific keys and value type
type Roles = "admin" | "editor" | "viewer";
type RolePermissions = Record<Roles, string[]>;
const perms: RolePermissions = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

// Exclude<T, U> / Extract<T, U> — filter union types
type Status = "active" | "inactive" | "pending" | "deleted";
type ActiveStatus = Exclude<Status, "deleted">;     // "active" | "inactive" | "pending"
type FinalStatus  = Extract<Status, "deleted" | "active">; // "deleted" | "active"

// NonNullable<T> — removes null/undefined from a type
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;   // string

// ReturnType<T> — extracts a function's return type
function createUser() { return { id: 1, name: "Alice" }; }
type NewUser = ReturnType<typeof createUser>;        // { id: number; name: string }

// Parameters<T> — extracts a function's parameter types as a tuple
function greet(name: string, age: number) {}
type GreetParams = Parameters<typeof greet>;          // [string, number]

// Awaited<T> — unwraps a Promise type
type ResolvedValue = Awaited<Promise<string>>;        // string
```

### Mapped Types (how utility types work under the hood)

```typescript
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

### Template Literal Types

```typescript
type EventName = "click" | "hover" | "scroll";
type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onHover" | "onScroll"
```

---

## 17. Async/Await

Async patterns mirror JavaScript exactly, but every Promise carries a generic type so the resolved value is fully typed.

```typescript
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  await delay(1000);
  return { id, name: "Alice" };          // TS checks this matches the return type
}

async function main(): Promise<void> {
  try {
    const user = await fetchUser(1);     // user is typed as { id: number; name: string }
    console.log(user.name);
  } catch (error) {
    console.error("Failed:", error);
  }
}

main();

// Promise.all with full type inference
async function loadAll() {
  const [user, posts] = await Promise.all([
    fetchUser(1),
    Promise.resolve<string[]>(["post1", "post2"]),
  ]);
  // user: {id, name}, posts: string[]
}

// Typing fetch responses (common real-world pattern)
interface ApiUser {
  id: number;
  name: string;
}

async function getUser(id: number): Promise<ApiUser> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<ApiUser>;   // assert the shape of the JSON response
}
```

---

## 18. Error Handling

```typescript
// catch clause variables are typed `unknown` by default (safer than JS's implicit any)
try {
  JSON.parse("{invalid}");
} catch (error: unknown) {
  if (error instanceof SyntaxError) {
    console.log("Syntax error:", error.message);
  } else if (error instanceof Error) {
    console.log("Generic error:", error.message);
  } else {
    console.log("Unknown error:", error);
  }
}
```

### Custom Typed Errors

```typescript
class ValidationError extends Error {
  constructor(message: string, public readonly field: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);  // fix instanceof in older targets
  }
}

function validateAge(age: number): void {
  if (age < 0) {
    throw new ValidationError("Age cannot be negative", "age");
  }
}

try {
  validateAge(-5);
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(`${e.field}: ${e.message}`);
  }
}
```

### Result Type Pattern (type-safe alternative to exceptions)

```typescript
type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { success: false, error: "Cannot divide by zero" };
  return { success: true, value: a / b };
}

const result = divide(10, 2);
if (result.success) {
  console.log(result.value);     // narrowed to the success branch
} else {
  console.log(result.error);     // narrowed to the error branch
}
```

---

## 19. Modules & Namespaces

### ES Modules (standard, preferred)

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}
export const PI: number = 3.14159;
export default class Calculator {
  add(a: number, b: number) { return a + b; }
}

// main.ts
import Calculator, { add, PI } from "./math";
import type { User } from "./types";        // type-only import (erased at compile time)
import * as MathUtils from "./math";

// Re-exporting
export { add as sum } from "./math";
export * from "./math";
```

### Ambient Declarations (`.d.ts` files)

```typescript
// types.d.ts — describe the shape of external/untyped JS libraries
declare module "some-untyped-library" {
  export function doSomething(input: string): number;
}

// Global declarations
declare global {
  interface Window {
    myCustomProperty: string;
  }
}
```

### Namespaces (older pattern, mostly replaced by ES modules)

```typescript
namespace Utilities {
  export function log(msg: string): void {
    console.log(`[LOG]: ${msg}`);
  }
}
Utilities.log("Hello");
```

---

## 20. Decorators, tsconfig & Design Patterns

### Decorators (experimental / Stage 3 proposal, common in Angular & NestJS)

```typescript
// Class decorator
function Logger(constructor: Function) {
  console.log(`Class created: ${constructor.name}`);
}

@Logger
class Product {
  constructor(public name: string) {}
}

// Method decorator
function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number): number {
    return a + b;
  }
}
```

> Enable in `tsconfig.json` with `"experimentalDecorators": true` (legacy) or use native Stage-3 decorators in modern TS (5.0+) without the flag.

### tsconfig.json — the compiler's rulebook

```json
{
  "compilerOptions": {
    "target": "ES2020",            // JS version to compile down to
    "module": "ESNext",             // module system to output
    "strict": true,                  // enables all strict type-checking flags
    "noImplicitAny": true,           // error on implicit `any`
    "strictNullChecks": true,        // null/undefined must be handled explicitly
    "esModuleInterop": true,         // smoother CommonJS/ES module interop
    "outDir": "./dist",               // compiled JS output folder
    "rootDir": "./src",               // source TS files location
    "skipLibCheck": true,             // skip type-checking .d.ts files (faster builds)
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

```bash
npm install -D typescript
npx tsc --init        # generate tsconfig.json
npx tsc                # compile .ts → .js
npx tsc --watch        # recompile on every save
```

---

### Design Patterns in TypeScript

**Singleton** (type-safe, enforced at compile time)

```typescript
class Config {
  private static instance: Config;
  private constructor(public readonly apiUrl: string) {}   // private ctor blocks `new`

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config("https://api.example.com");
    }
    return Config.instance;
  }
}

const config = Config.getInstance();
```

**Factory** (using generics + interfaces for full type safety)

```typescript
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area() { return Math.PI * this.radius ** 2; }
}

class Square implements Shape {
  constructor(private side: number) {}
  area() { return this.side ** 2; }
}

type ShapeType = "circle" | "square";

function createShape(type: ShapeType, size: number): Shape {
  const shapes: Record<ShapeType, () => Shape> = {
    circle: () => new Circle(size),
    square: () => new Square(size),
  };
  return shapes[type]();
}
```

**Repository Pattern** (typed data access abstraction)

```typescript
interface Repository<T> {
  getById(id: number): T | undefined;
  getAll(): T[];
  add(item: T): void;
  delete(id: number): void;
}

interface User { id: number; name: string; }

class InMemoryUserRepository implements Repository<User> {
  private users: User[] = [];

  getById(id: number) { return this.users.find(u => u.id === id); }
  getAll() { return this.users; }
  add(user: User) { this.users.push(user); }
  delete(id: number) { this.users = this.users.filter(u => u.id !== id); }
}
```

**Observer** (typed event emitter)

```typescript
type Listener<T> = (data: T) => void;

class EventEmitter<T> {
  private listeners: Listener<T>[] = [];

  subscribe(listener: Listener<T>): void {
    this.listeners.push(listener);
  }

  emit(data: T): void {
    this.listeners.forEach(listener => listener(data));
  }
}

interface UserLoggedInEvent { username: string; timestamp: Date; }

const loginEvent = new EventEmitter<UserLoggedInEvent>();
loginEvent.subscribe(e => console.log(`${e.username} logged in at ${e.timestamp}`));
loginEvent.emit({ username: "Alice", timestamp: new Date() });
```

**Strategy** (using function types for swappable behavior)

```typescript
type SortStrategy<T> = (data: T[]) => T[];

class Sorter<T> {
  constructor(private strategy: SortStrategy<T>) {}

  setStrategy(strategy: SortStrategy<T>): void {
    this.strategy = strategy;
  }

  sort(data: T[]): T[] {
    return this.strategy(data);
  }
}

const ascending: SortStrategy<number> = data => [...data].sort((a, b) => a - b);
const descending: SortStrategy<number> = data => [...data].sort((a, b) => b - a);

const sorter = new Sorter(ascending);
sorter.sort([3, 1, 2]);          // [1, 2, 3]
sorter.setStrategy(descending);
sorter.sort([3, 1, 2]);          // [3, 2, 1]
```

---

## Quick Reference Card

| Concept           | Key Syntax                                              |
|-------------------|------------------------------------------------------------|
| Type annotation   | `let x: number`, `: string`, `: boolean`                  |
| Special types     | `any`, `unknown`, `never`, `void`                          |
| Union/Intersection| `A \| B`, `A & B`                                          |
| Type narrowing    | `typeof`, `instanceof`, `in`, discriminated unions         |
| Interface         | `interface X { ... }`, `extends`, `implements`             |
| Generics          | `function f<T>(x: T): T`, `class Box<T>`                  |
| Class modifiers   | `public`, `private`, `protected`, `readonly`, `#private`   |
| OOP               | `abstract`, `implements`, `extends`, `override`            |
| Enums             | `enum`, `const enum`, string/numeric enums                 |
| Utility types     | `Partial<T>`, `Pick<T,K>`, `Omit<T,K>`, `Record<K,T>`      |
| Async             | `Promise<T>`, `async`, `await`                              |
| Modules           | `import`, `export`, `import type`, `.d.ts`                 |
| Compiler          | `tsconfig.json`, `tsc`, `strict: true`                      |
| Design Patterns   | Singleton, Factory, Repository, Observer, Strategy          |

---

*Happy typing! 🔷*
