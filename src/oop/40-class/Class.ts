// Class = (ES6 feature) provide a more structured and cleanner way to 
//          work with objects compared to traditional constructor functions
//          ex. static keyword, encapsulation, inheritance

class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    displayProduct(): void {
        console.log(`Product: ${this.name}`);
        console.log(`Price: $${this.price.toFixed(2)}`);
    }

    calculateTotal(salesTax: number): number {
        return this.price + (this.price * salesTax);
        // Pass salesTax as a parameter instead of accessing it as a property of the class (this.salesTax))
    }
}

const salesTax = 0.05;

const product1 = new Product("Shirt", 19.99);
const product2 = new Product("Pants", 22.50);
const product3 = new Product("Underwear", 100.00);

product1.displayProduct();

// const totalPrice = product1.calculateTotal(salesTax);
// console.log(`Total price (with tax) : $${totalPrice.toFixed(2)}`);

const getTotalPrice = (product: Product, salesTax: number): void => {
    const totalPrice = product.calculateTotal(salesTax);
    console.log(`Total price (with tax) : $${totalPrice.toFixed(2)}`);
};

getTotalPrice(product1, 0.1);

export { };
