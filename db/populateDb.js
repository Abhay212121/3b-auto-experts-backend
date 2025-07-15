import { Client } from "pg";
import dotenv from 'dotenv'
dotenv.config()

const productsData = [
    { product_name: "F9X 3 inch Projectors", category: "Projector", price: 3854 },
    { product_name: "AF20X 2 inch Projectors", category: "Projector", price: 3854 },
    { product_name: "GPNE H19", category: "LED", price: 2652 },
    { product_name: "GPNE H1", category: "LED", price: 2173 },
    { product_name: "GPNE H27", category: "LED", price: 2173 },
    { product_name: "GPNE H7", category: "LED", price: 2291 },
    { product_name: "GPNE 9005", category: "LED", price: 2291 },
    { product_name: "GPNE 9012", category: "LED", price: 2291 },
    { product_name: "NW 220 H4", category: "LED", price: 2755 },
    { product_name: "NW 220 H7", category: "LED", price: 2358 },
    { product_name: "NW 220 H11", category: "LED", price: 2358 },
    { product_name: "NH 260 H7", category: "LED", price: 2490 },
    { product_name: "ND 140 H4", category: "LED", price: 2553 },
    { product_name: "ND 140 H7", category: "LED", price: 2145 },
    { product_name: "ND 140 H11", category: "LED", price: 2145 },
    { product_name: "ND 140 9005", category: "LED", price: 2145 },
    { product_name: "NG 180 H4", category: "LED", price: 2690 },
    { product_name: "NG 180 H7", category: "LED", price: 2281 },
    { product_name: "NG 180 9005", category: "LED", price: 2281 },
    { product_name: "PL 200 H4", category: "LED", price: 2821 },
    { product_name: "SAGA 200 9005", category: "LED", price: 2491 },
    { product_name: "Car Play", category: "Infotainment", price: 2072 },
    { product_name: "AP 5S 9D Mats", category: "Mats", price: 2000 },
    { product_name: "AP 5S 7D Mats", category: "Mats", price: 1750 },
    { product_name: "AP Universal 7D Mats", category: "Mats", price: 1000 },
    { product_name: "3N Audio 300 H1", category: "LED", price: 2410 },
    { product_name: "IPH 3inch Projector", category: "Projector", price: 2910 },
    { product_name: "Diamond Screen", category: "Infotainment", price: 5120 }
]


// productsData.map((product) => {
//     const addProductSQL = `INSERT INTO products(product_name,product_category,product_price) VALUES($1,$2,$3)`, [product.product_name, product.category, product.price];
// })


const userSQL = `
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(255),
    user_mail VARCHAR(255),
    user_password VARCHAR(255)
);
`
const productSQL = `
DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products(
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(255),
    product_category VARCHAR(255),
    product_price INTEGER
);
`


async function main() {
    console.log('Seeding.....')
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING
    })
    await client.connect()
    // await client.query(productSQL)
    for (const product of productsData) {
        await client.query(
            `INSERT INTO products (product_name, product_category, product_price) VALUES ($1, $2, $3)`,
            [product.product_name, product.category, product.price]
        );
    }
    await client.end()
    console.log('Done!')
}

main()