export class BrandDto {
    product_id;
    area_name;
    total_compliance;

    constructor(data) {
        this.product_id = data.product_id;
        this.area_name = data.area_name;
        this.total_compliance = data.total_compliance;
    }
}