import * as controller from '../controller/controller.js'
import express from 'express'

let router;

export function Init() {
    router = express.Router();

    router.get('/view/index', controller.Index);
    router.get('/api/v1/get-chart', controller.GetChart);
    router.get('/api/v1/get-brand', controller.GetBrand);

    return router;
}
