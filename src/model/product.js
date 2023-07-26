export class Product {
    product_id;
    product_name;
    brand_id;

    constructor(data) {
        this.product_id = data.product_id;
        this.product_name = data.product_name;
        this.brand_id = data.brand_id;
    }
}