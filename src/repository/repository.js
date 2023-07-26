import {ChartDto} from '../dto/chart.js'
import {Product} from '../model/product.js'
import {StoreArea} from '../model/store_area.js'
import {BrandDto} from '../dto/brand.js'

export async function GetChartCalculation(db, filter) {
    let data = [];

    let query = `select
        round((sum(rp.compliance) / count(rp.report_id)) * 100, 2) as total_compliance,
        sa.area_name
    from
        report_product rp
    join store s on
        s.store_id = rp.store_id
    join store_area sa on
        sa.area_id = s.area_id`;
    
    if (validateSelectedArea(filter)) {
        query = where(query, `lower(sa.area_id) in (${filter.selectedAreas})`);
    }
    if (validateDate(filter)) {
        query = where(query, `rp.tanggal between '${filter.dateFrom}' and '${filter.dateTo}'`);
    }

    query = `${query} group by sa.area_name order by sa.area_name;`;

    await new Promise((resolve) => {
        const dbConn = db.query(query);
        dbConn.on('error', function(error) {
            throw new Error(error);
        });
        dbConn.on('result', function(row) {
            data.push(new ChartDto(row));
        })
        dbConn.on('end', function() {
            resolve(data);
        })
    }).then((res) => {
        data = res
    })

    return data
}

export async function GetAllProducts(db) {
    let data = [];

    await new Promise((resolve) => {
        const dbConn = db.query('select * from product');
        dbConn.on('error', function(error) {
            throw new Error(error);
        });
        dbConn.on('result', function(row) {
            data.push(new Product(row));
        })
        dbConn.on('end', function() {
            resolve(data);
        })
    }).then((res) => {
        data = res
    })

    return data;
}

export async function GetAllStoreArea(db) {
    let data = [];

    await new Promise((resolve) => {
        const dbConn = db.query('select * from store_area');
        dbConn.on('error', function(error) {
            throw new Error(error);
        });
        dbConn.on('result', function(row) {
            data.push(new StoreArea(row));
        })
        dbConn.on('end', function() {
            resolve(data);
        })
    }).then((res) => {
        data = res
    })

    return data
}

export async function GetBrandCalculation(db, filter) {
    let data = [];

    let query = `select 
        rp.product_id,
        sa.area_name,
        round(sum(rp.compliance) / count(rp.report_id), 2) * 100 as total_compliance
    from
        report_product rp
    join store s on
        s.store_id = rp.store_id
    join store_area sa on
        sa.area_id = s.area_id`;
    
    if (validateSelectedArea(filter)) {
        query = where(query, `lower(sa.area_id) in (${filter.selectedAreas})`);
    }
    if (validateDate(filter)) {
        query = where(query, `rp.tanggal between '${filter.dateFrom}' and '${filter.dateTo}'`);
    }

    query = `${query} group by rp.product_id, sa.area_id`

    await new Promise((resolve) => {
        const dbConn = db.query(query);
        dbConn.on('error', function(error) {
            throw new Error(error);
        });
        dbConn.on('result', function(row) {
            data.push(new BrandDto(row));
        })
        dbConn.on('end', function() {
            resolve(data);
        })
    }).then((res) => {
        data = res
    })

    return data
}

function validateSelectedArea(filter) {
    return filter.selectedAreas != null && filter.selectedAreas.length > 0;
}

function validateDate(filter) {
    return (filter.dateFrom != null && filter.dateTo != null) && (filter.dateFrom <= filter.dateTo) && (filter.dateFrom != "" && filter.dateTo != "");
}

function where(query, condition) {
    if (query.includes("where")) {
        return `${query} and ${condition}`
    }
    return `${query} where ${condition}`
}