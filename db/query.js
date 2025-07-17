import pool from "./pool.js";

const getUserByMail = async (usermail) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE user_mail = $1', [usermail])
    return rows[0]
}

const addProductInDb = async (name, category, price) => {
    await pool.query(`INSERT INTO products(product_name,product_category,product_price) VALUES($1,$2,$3)`, [name, category, price])
}

const getAllProductsFromDb = async (req, res) => {
    const { rows } = await pool.query(`SELECT product_name,product_category FROM products`)
    return rows
}

const addSaleRecordInDb = async (product_category, product_name, selling_price, sold_by, sold_to_customer, sold_to_car, sold_on, payment_status, quantity) => {

    const result = await pool.query(`SELECT product_id FROM products WHERE product_name = $1`, [product_name])

    if (result.rows.length === 0) {
        throw new Error("Product not found in database.");
    }

    const productId = await result.rows[0].product_id
    console.log(productId)

    await pool.query(`INSERT INTO sales_records(product_category,product_name,product_id,quantity,selling_price,sold_by,sold_to_customer,sold_to_car,sold_on,payment_status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [product_category, product_name, productId, quantity, selling_price, sold_by, sold_to_customer, sold_to_car, sold_on, payment_status])
}

const addPurchaseRecordInDb = async (productCategory, productName, purchasePrice, purchasedByUser, supplier) => {
    await pool.query(`INSERT INTO purchase_records(product_category,product_name,purchase_price,purchased_by,supplier) VALUES($1,$2,$3,$4,$5)`, [productCategory, productName, purchasePrice, purchasedByUser, supplier])
}

const getHomeDataFromDb = async () => {

    //received payment
    const { rows: sumRows } = await pool.query(`
      SELECT SUM(selling_price * quantity) AS total_sales 
      FROM sales_records 
      WHERE payment_status = 'completed'
    `);
    const receivedSum = parseFloat(sumRows[0].total_sales) || 0;

    //total payment
    const { rows: totalSumRows } = await pool.query(`
      SELECT SUM(selling_price * quantity) AS total_sales 
      FROM sales_records;
    `);
    const totalSum = parseFloat(totalSumRows[0].total_sales) || 0;

    const { rows: profitRows } = await pool.query(`
      SELECT 
        products.product_price AS original_price, 
        sales_records.selling_price, 
        sales_records.quantity 
      FROM products 
      JOIN sales_records 
      ON products.product_id = sales_records.product_id 
      WHERE sales_records.payment_status = 'completed'
    `);

    const { rows: successfulTransactionsCount } = await pool.query(`
      SELECT COUNT(*) 
      FROM sales_records 
      WHERE payment_status = 'completed'
    `);
    const successfulTransactions = parseInt(successfulTransactionsCount[0].count) || 0;

    const { rows: pendingTransactionsCount } = await pool.query(`
      SELECT COUNT(*) 
      FROM sales_records 
      WHERE payment_status != 'completed'
    `);
    const pendingTransactions = parseInt(pendingTransactionsCount[0].count) || 0;

    const totalProfit = profitRows.reduce((acc, item) => {
        const costPrice = item.original_price * item.quantity;
        const sellingRevenue = item.selling_price * item.quantity;
        return acc + (sellingRevenue - costPrice);
    }, 0);

    const profitPercentage = receivedSum === 0 ? 0 : (totalProfit / receivedSum) * 100;

    return {
        receivedSum,
        totalProfit,
        profitPercentage,
        successfulTransactions,
        pendingTransactions,
        totalSum
    };
};

const getHomeDataFromDbByUser = async (username) => {

    // received amount
    const { rows: receivedRows } = await pool.query(`
      SELECT SUM(selling_price * quantity) AS total_sales 
      FROM sales_records 
      WHERE payment_status = 'completed' AND sold_by = $1
    `, [username]);
    const receivedSum = parseFloat(receivedRows[0].total_sales) || 0;


    // Total sales for this user
    const { rows: totalRows } = await pool.query(`
      SELECT SUM(selling_price * quantity) AS total_sales 
      FROM sales_records WHERE sold_by = $1
    `, [username]);
    const totalSum = parseFloat(totalRows[0].total_sales) || 0;

    // Profit calculation: selling - cost price
    const { rows: profitRows } = await pool.query(`
      SELECT 
        products.product_price AS original_price, 
        sales_records.selling_price, 
        sales_records.quantity 
      FROM products 
      JOIN sales_records 
      ON products.product_id = sales_records.product_id 
      WHERE sales_records.payment_status = 'completed' AND sales_records.sold_by = $1
    `, [username]);

    // Successful transactions
    const { rows: successfulTransactionsCount } = await pool.query(`
      SELECT COUNT(*) 
      FROM sales_records 
      WHERE payment_status = 'completed' AND sold_by = $1
    `, [username]);
    const successfulTransactions = parseInt(successfulTransactionsCount[0].count) || 0;

    // Pending transactions
    const { rows: pendingTransactionsCount } = await pool.query(`
      SELECT COUNT(*) 
      FROM sales_records 
      WHERE payment_status != 'completed' AND sold_by = $1
    `, [username]);
    const pendingTransactions = parseInt(pendingTransactionsCount[0].count) || 0;

    // Calculate total profit
    const totalProfit = profitRows.reduce((acc, item) => {
        const costPrice = item.original_price * item.quantity;
        const sellingRevenue = item.selling_price * item.quantity;
        return acc + (sellingRevenue - costPrice);
    }, 0);

    const profitPercentage = totalSum === 0 ? 0 : (totalProfit / receivedSum) * 100;

    return {
        totalSum,
        totalProfit,
        profitPercentage,
        successfulTransactions,
        pendingTransactions,
        receivedSum,
    };
};



export default { getUserByMail, addProductInDb, getAllProductsFromDb, addSaleRecordInDb, addPurchaseRecordInDb, getHomeDataFromDb, getHomeDataFromDbByUser }