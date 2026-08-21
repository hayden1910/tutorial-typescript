// ==========================================
// ADVANCED OOP: abstract, implements, modifiers, overloads, readonly
// ==========================================

// ==========================================
// 1. ABSTRACT CLASSES & METHODS
// ==========================================

abstract class AOAnimal {
  constructor(public name: string) {}

  // Abstract method - MUST be implemented by subclasses
  abstract makeSound(): string;

  // Concrete method - can be used directly or overridden
  move(): void {
    console.log(`${this.name} is moving`);
  }

  // Abstract property
  abstract readonly species: string;
}

class AODog extends AOAnimal {
  // Must implement abstract method
  makeSound(): string {
    return "Woof!";
  }

  // Must implement abstract property
  readonly species = "Canis lupus familiaris";

  // Can override concrete method
  move(): void {
    console.log(`${this.name} runs on four legs`);
  }

  // Additional method
  fetch(): void {
    console.log(`${this.name} fetches the ball`);
  }
}

class AOCat extends AOAnimal {
  makeSound(): string {
    return "Meow!";
  }

  readonly species = "Felis catus";
}

console.log("--- Abstract Classes ---");
const aoDog = new AODog("Rex");
const aoCat = new AOCat("Whiskers");

console.log(aoDog.makeSound());
console.log(aoCat.makeSound());
aoDog.move();
aoCat.move();

// Abstract class cannot be instantiated
// const animal = new Animal("Generic"); // Error!

// ==========================================
// 2. IMPLEMENTS - Class implements Interface
// ==========================================

interface AOSerializable {
  toJSON(): string;
  fromJSON(json: string): void;
}

interface AOIdentifiable {
  id: string;
}

interface AOTimestamped {
  createdAt: Date;
  updatedAt: Date;
}

// Class implementing multiple interfaces
class AOUser implements AOSerializable, AOIdentifiable, AOTimestamped {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  fromJSON(json: string): void {
    const data = JSON.parse(json);
    this.name = data.name;
    this.email = data.email;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}

console.log("\n--- Implements ---");
const aoUser = new AOUser("u1", "Alice", "alice@example.com");
console.log(aoUser.toJSON());

const aoJson = aoUser.toJSON();
const aoUser2 = new AOUser("u2", "", "");
aoUser2.fromJSON(aoJson);
console.log(aoUser2);

// ==========================================
// 3. ACCESS MODIFIERS: public, protected, private
// ==========================================

class AOBankAccount {
  // public - accessible everywhere (default)
  public accountNumber: string;

  // protected - accessible in class and subclasses
  protected balance: number;

  // private - accessible ONLY in this class
  private pin: number;

  // private with getter/setter
  private _interestRate: number = 0.01;

  constructor(accountNumber: string, initialBalance: number, pin: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.pin = pin;
  }

  // Public method
  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    }
  }

  // Public method with validation
  withdraw(amount: number, pin: number): boolean {
    if (pin !== this.pin) {
      console.log("Invalid PIN");
      return false;
    }
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
      return true;
    }
    console.log("Insufficient funds");
    return false;
  }

  // Protected method - for subclasses
  protected addInterest(): void {
    const interest = this.balance * this._interestRate;
    this.balance += interest;
    console.log(`Interest added: $${interest}`);
  }

  // Private method - only in this class
  private validatePin(pin: number): boolean {
    return pin === this.pin;
  }

  // Getter for private field
  get interestRate(): number {
    return this._interestRate;
  }

  // Setter with validation
  set interestRate(rate: number) {
    if (rate >= 0 && rate <= 1) {
      this._interestRate = rate;
    }
  }

  getBalance(): number {
    return this.balance;
  }
}

// Subclass can access protected members
class AOSavingsAccount extends AOBankAccount {
  constructor(accountNumber: string, initialBalance: number, pin: number) {
    super(accountNumber, initialBalance, pin);
  }

  applyInterest(): void {
    // Can access protected balance and addInterest()
    this.addInterest();
    console.log(`Savings balance: $${this.balance}`);
  }

  // Cannot access private pin or validatePin()
  // this.pin; // Error!
  // this.validatePin(1234); // Error!
}

console.log("\n--- Access Modifiers ---");
const aoAccount = new AOBankAccount("ACC123", 1000, 1234);
aoAccount.deposit(500);
aoAccount.withdraw(200, 1234);
console.log("Balance:", aoAccount.getBalance());
// aoAccount.balance; // Error: protected
// aoAccount.pin; // Error: private

const aoSavings = new AOSavingsAccount("SAV456", 5000, 5678);
aoSavings.applyInterest();

// ==========================================
// 4. READONLY PROPERTIES
// ==========================================

class AOConfig {
  // Readonly - can only be assigned in constructor or declaration
  readonly apiUrl: string;
  readonly version: string = "1.0.0";

  // Readonly with initialization
  readonly createdAt: Date = new Date();

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    // this.version = "2.0"; // Error: readonly
  }

  // Can have readonly methods that don't modify state
  readonly getInfo = (): string => {
    return `${this.apiUrl} v${this.version}`;
  };
}

const aoConfig = new AOConfig("https://api.example.com");
console.log("\n--- Readonly Properties ---");
console.log(aoConfig.getInfo());
// aoConfig.apiUrl = "https://other.com"; // Error!

// Readonly in interfaces
interface AOPoint {
  readonly x: number;
  readonly y: number;
}

const aoPoint: AOPoint = { x: 10, y: 20 };
// aoPoint.x = 15; // Error!

// ==========================================
// 5. PARAMETER PROPERTIES
// ==========================================

// Shorthand: constructor parameter + property declaration
class AOPoint3D {
  // public x: number;
  // public y: number;
  // public z: number;

  // constructor(x: number, y: number, z: number) {
  //   this.x = x;
  //   this.y = y;
  //   this.z = z;
  // }

  // Equivalent to above:
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number,
    private _label: string = "Point"
  ) {}

  getLabel(): string {
    return this._label;
  }

  setLabel(label: string): void {
    this._label = label;
  }
}

console.log("\n--- Parameter Properties ---");
const aoP = new AOPoint3D(1, 2, 3, "Origin");
console.log(aoP.x, aoP.y, aoP.z, aoP.getLabel());
// aoP.x = 5; // Error: readonly

// Parameter properties with modifiers
class AOService {
  constructor(
    private readonly apiKey: string,    // private readonly
    protected timeout: number = 5000,    // protected
    public retries: number = 3           // public
  ) {}

  getConfig() {
    return { apiKey: this.apiKey, timeout: this.timeout, retries: this.retries };
  }
}

const aoService = new AOService("secret-key", 10000, 5);
console.log(aoService.getConfig());
// aoService.apiKey; // Error: private
// console.log(aoService.timeout); // Error: protected
console.log(aoService.retries); // OK: public

// ==========================================
// 6. METHOD OVERLOADS
// ==========================================

class AOCalculator {
  // Overload signatures
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number[], b: number[]): number[];
  add(a: Date, days: number): Date;

  // Implementation signature
  add(a: any, b: any): any {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      return [...a, ...b];
    }
    if (a instanceof Date && typeof b === "number") {
      const result = new Date(a);
      result.setDate(result.getDate() + b);
      return result;
    }
    throw new Error("Invalid arguments");
  }
}

console.log("\n--- Method Overloads ---");
const aoCalc = new AOCalculator();
console.log(aoCalc.add(1, 2));                    // 3
console.log(aoCalc.add("Hello, ", "World!"));     // "Hello, World!"
console.log(aoCalc.add([1, 2], [3, 4]));          // [1, 2, 3, 4]
console.log(aoCalc.add(new Date("2024-01-01"), 5)); // Date + 5 days

// Overloads with optional parameters
class AOLogger {
  log(message: string): void;
  log(message: string, level: "info" | "warn" | "error"): void;
  log(message: string, level: "info" | "warn" | "error", meta: object): void;

  log(message: string, level?: "info" | "warn" | "error", meta?: object): void {
    const prefix = level ? `[${level.toUpperCase()}]` : "[INFO]";
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : "";
    console.log(`${prefix} ${message}${metaStr}`);
  }
}

console.log("\n--- Overloads with Optional Params ---");
const aoLogger = new AOLogger();
aoLogger.log("Application started");
aoLogger.log("User logged in", "info");
aoLogger.log("Disk space low", "warn", { disk: "90%" });
aoLogger.log("Connection failed", "error", { code: "ECONNREFUSED" });

// ==========================================
// 7. STATIC MEMBERS
// ==========================================

class AOMathUtils {
  static readonly PI = 3.14159;
  static readonly E = 2.71828;

  // Static property
  static instanceCount = 0;

  // Static method
  static circleArea(radius: number): number {
    return AOMathUtils.PI * radius * radius;
  }

  static circleCircumference(radius: number): number {
    return 2 * AOMathUtils.PI * radius;
  }

  // Instance method
  constructor() {
    AOMathUtils.instanceCount++;
  }

  // Static factory method
  static create(): AOMathUtils {
    return new AOMathUtils();
  }
}

console.log("\n--- Static Members ---");
console.log("PI:", AOMathUtils.PI);
console.log("Area (r=5):", AOMathUtils.circleArea(5));
console.log("Circumference (r=5):", AOMathUtils.circleCircumference(5));

const aoM1 = new AOMathUtils();
const aoM2 = AOMathUtils.create();
console.log("Instance count:", AOMathUtils.instanceCount);

// ==========================================
// 8. GETTERS & SETTERS (Advanced)
// ==========================================

class AOTemperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero");
    }
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(value: number) {
    this.celsius = ((value - 32) * 5) / 9;
  }

  get kelvin(): number {
    return this._celsius + 273.15;
  }

  set kelvin(value: number) {
    if (value < 0) {
      throw new Error("Kelvin cannot be negative");
    }
    this.celsius = value - 273.15;
  }
}

console.log("\n--- Getters & Setters ---");
const aoTemp = new AOTemperature();
aoTemp.celsius = 25;
console.log(`${aoTemp.celsius}°C = ${aoTemp.fahrenheit}°F = ${aoTemp.kelvin}K`);

aoTemp.fahrenheit = 98.6;
console.log(`${aoTemp.celsius}°C = ${aoTemp.fahrenheit}°F`);

// ==========================================
// 9. ABSTRACT CLASS WITH IMPLEMENTS
// ==========================================

interface AORepository<T> {
  findById(id: string): T | undefined;
  findAll(): T[];
  save(item: T): T;
  delete(id: string): boolean;
}

abstract class AOBaseRepository<T extends { id: string }> implements AORepository<T> {
  protected items: Map<string, T> = new Map();

  // Abstract - must be implemented by subclass
  abstract validate(item: T): boolean;

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  save(item: T): T {
    if (!this.validate(item)) {
      throw new Error("Invalid item");
    }
    this.items.set(item.id, item);
    return item;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

interface AOProduct {
  id: string;
  name: string;
  price: number;
}

class AOProductRepository extends AOBaseRepository<AOProduct> {
  validate(product: AOProduct): boolean {
    return product.price >= 0 && product.name.length > 0;
  }

  findByPriceRange(min: number, max: number): AOProduct[] {
    return this.findAll().filter((p) => p.price >= min && p.price <= max);
  }
}

console.log("\n--- Abstract + Implements ---");
const aoProductRepo = new AOProductRepository();
aoProductRepo.save({ id: "p1", name: "Laptop", price: 999 });
aoProductRepo.save({ id: "p2", name: "Mouse", price: 29 });
aoProductRepo.save({ id: "p3", name: "Monitor", price: 299 });

console.log("All products:", aoProductRepo.findAll());
console.log("Price 100-300:", aoProductRepo.findByPriceRange(100, 300));

// ==========================================
// 10. OVERRIDE KEYWORD (TypeScript 4.3+)
// ==========================================

class AOBase {
  greet(): string {
    return "Hello from Base";
  }
}

class AODerived extends AOBase {
  override greet(): string {
    return "Hello from Derived";
  }

  // override nonExistent(): string { return ""; } // Error: no method to override
}

console.log("\n--- Override Keyword ---");
console.log(new AOBase().greet());
console.log(new AODerived().greet());

// ==========================================
// 11. PRIVATE FIELD SYNTAX (TypeScript 3.8+)
// ==========================================

class AOModernClass {
  #privateField = "secret";
  #privateMethod() {
    return this.#privateField;
  }

  getSecret(): string {
    return this.#privateMethod();
  }
}

console.log("\n--- Private Field Syntax (#) ---");
const aoModern = new AOModernClass();
console.log(aoModern.getSecret());
// aoModern.#privateField; // Error: private

// ==========================================
// 12. IMPLEMENTS WITH GENERICS
// ==========================================

interface AOCache<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
  has(key: K): boolean;
  delete(key: K): boolean;
}

class AOMapCache<K, V> implements AOCache<K, V> {
  private store = new Map<K, V>();

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  delete(key: K): boolean {
    return this.store.delete(key);
  }
}

console.log("\n--- Generic Implements ---");
const aoStringCache = new AOMapCache<string, number>();
aoStringCache.set("count", 42);
console.log(aoStringCache.get("count"));
console.log(aoStringCache.has("count"));