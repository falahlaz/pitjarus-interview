export class FilterDto {
    selectedAreas;
    dateFrom;
    dateTo;

    constructor(data) {
        this.selectedAreas = data.selected_areas || null;
        this.dateFrom = data.date_from || null;
        this.dateTo = data.date_to || null;
    }
}