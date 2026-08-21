// ==========================================
// GENERICS - Generic Interfaces & Classes
// ==========================================

// Generic Interface
interface GenRepository<T> {
  findById(id: string): T | undefined;
  findAll(): T[];
  save(item: T): T;
  delete(id: string): boolean;
}

// Generic Class implementing generic interface
class InMemoryRepository<T extends { id: string }> implements GenRepository<T> {
  private items: Map<string, T> = new Map();

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  save(item: T): T {
    this.items.set(item.id, item);
    return item;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

console.log("--- Generic Repository ---");
const userRepo = new InMemoryRepository<{ id: string; name: string; email: string }>();

userRepo.save({ id: "u1", name: "Alice", email: "alice@example.com" });
userRepo.save({ id: "u2", name: "Bob", email: "bob@example.com" });

console.log("All users:", userRepo.findAll());
console.log("Find u1:", userRepo.findById("u1"));
console.log("Find u3:", userRepo.findById("u3"));
userRepo.delete("u1");
console.log("After delete:", userRepo.findAll());

// Generic Class with multiple type parameters
class GenCache<K, V> {
  private store: Map<K, V> = new Map();
  private ttl: Map<K, number> = new Map();

  set(key: K, value: V, ttlMs: number = 60000): void {
    this.store.set(key, value);
    this.ttl.set(key, Date.now() + ttlMs);
  }

  get(key: K): V | undefined {
    const expiry = this.ttl.get(key);
    if (expiry && Date.now() > expiry) {
      this.store.delete(key);
      this.ttl.delete(key);
      return undefined;
    }
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    this.ttl.delete(key);
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
    this.ttl.clear();
  }
}

console.log("\n--- Generic Cache<K, V> ---");
const stringCache = new GenCache<string, number>();
stringCache.set("count", 42);
stringCache.set("rate", 3.14);
console.log("count:", stringCache.get("count"));
console.log("rate:", stringCache.get("rate"));
console.log("missing:", stringCache.get("missing"));

const objectCache = new GenCache<number, { name: string; value: number }>();
objectCache.set(1, { name: "first", value: 100 });
console.log("Object cache:", objectCache.get(1));

// Generic Class with constraints
interface GenIdentifiable {
  id: string;
}

class EntityStore<T extends GenIdentifiable> {
  private entities: Map<string, T> = new Map();

  add(entity: T): void {
    this.entities.set(entity.id, entity);
  }

  get(id: string): T | undefined {
    return this.entities.get(id);
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const existing = this.entities.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.entities.set(id, updated);
    return updated;
  }

  remove(id: string): boolean {
    return this.entities.delete(id);
  }
}

console.log("\n--- Constrained Generic Class ---");
interface GenTask extends GenIdentifiable {
  id: string;
  title: string;
  completed: boolean;
}

const taskStore = new EntityStore<GenTask>();
taskStore.add({ id: "t1", title: "Learn Generics", completed: false });
taskStore.add({ id: "t2", title: "Build Project", completed: true });

console.log("All tasks:", taskStore.get("t1"));
console.log("Update t1:", taskStore.update("t1", { completed: true }));
console.log("After update:", taskStore.get("t1"));

// Generic with default type parameter
class GenBox<T = string> {
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue(): T {
    return this.value;
  }

  setValue(newValue: T): void {
    this.value = newValue;
  }
}

console.log("\n--- Generic Class with Default ---");
const stringBox = new GenBox("hello");
console.log("String box:", stringBox.getValue());

const numberBox = new GenBox<number>(42);
console.log("Number box:", numberBox.getValue());

const defaultBox = new GenBox(true);
console.log("Default (boolean) box:", defaultBox.getValue());

// Practical: Generic Result type (similar to Rust Result)
type GenResult<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

function divide(a: number, b: number): GenResult<number, string> {
  if (b === 0) {
    return { success: false, error: "Division by zero" };
  }
  return { success: true, data: a / b };
}

function parseJson<T>(json: string): GenResult<T, SyntaxError> {
  try {
    return { success: true, data: JSON.parse(json) };
  } catch (e) {
    return { success: false, error: e as SyntaxError };
  }
}

console.log("\n--- Practical: Result Type ---");
console.log(divide(10, 2));
console.log(divide(10, 0));

console.log(parseJson<{ name: string }>('{"name": "test"}'));
console.log(parseJson<{ name: string }>("invalid json"));

// Generic Factory Pattern
interface GenCreator<T> {
  create(): T;
}

class GenUserFactory implements GenCreator<{ id: string; name: string }> {
  private counter = 0;

  create() {
    return { id: `user_${++this.counter}`, name: `User ${this.counter}` };
  }
}

class GenProductFactory implements GenCreator<{ id: string; sku: string; price: number }> {
  create() {
    return { id: `prod_${Math.random()}`, sku: "SKU-" + Math.random(), price: 9.99 };
  }
}

function createBatch<T>(factory: GenCreator<T>, count: number): T[] {
  return Array.from({ length: count }, () => factory.create());
}

console.log("\n--- Generic Factory Pattern ---");
const userFactory = new GenUserFactory();
const productFactory = new GenProductFactory();

console.log("Users:", createBatch(userFactory, 3));
console.log("Products:", createBatch(productFactory, 2));