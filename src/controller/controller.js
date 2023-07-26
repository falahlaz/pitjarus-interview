import { FilterDto } from '../dto/filter.js'
import { db } from '../database/database.js'
import * as repository from '../repository/repository.js'

export async function GetChart(req, res) {
    let result;
    let filter = new FilterDto(req.query);

    await repository.GetChartCalculation(db, filter).then((res) => {
        result = res
    })

    return res.json(result)
}

export async function GetBrand(req, res) {
    let result = {};
    let products;
    let storeAreas;
    let brands;
    let filter = new FilterDto(req.query);

    await repository.GetAllProducts(db, filter).then((res) => {
        products = res
    })
    await repository.GetAllStoreArea(db, filter).then((res) => {
        storeAreas = res
    })
    await repository.GetBrandCalculation(db, filter).then((res) => {
        brands = res
    })

    products.map(product => {
        result[product.product_id] = {
            product_name: product.product_name
        }
        storeAreas.map(storeArea => {
            result[product.product_id][ParseAreaName(storeArea.area_name)] = 0
        })
    })

    brands.map(brand => {
        result[brand.product_id][ParseAreaName(brand.area_name)] = brand.total_compliance
    })

    return res.json(result)
}

export async function Index(req, res) {
    let storeAreas;

    await repository.GetAllStoreArea(db, null).then((res) => {
        storeAreas = res;
    });

    res.render('index', {
        storeAreas
    })
}

function ParseAreaName(area_name) {
    return area_name.replace(/ /g,'_').toLowerCase()
}