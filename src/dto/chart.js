export class ChartDto {
    total_compliance;
    area_name;

    constructor(data) {
        this.total_compliance = data.total_compliance;
        this.area_name = data.area_name;
    }
}