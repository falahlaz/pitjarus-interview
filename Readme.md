# Pitjarus Code Interview

This is a simple project to visualize product report data into charts. This project builds for code interview purposes at PT Pitjarus Teknologi. The project build with this technology :

- NodeJS (expressJS)
- ChartJS
- MySQL
- Handlerbars for HTML output

## How to run code

1. Install all dependencies

    ```sh
        npm install
   ```

2. Run application

    ```sh
        npm run start
    ```

## View

### 1. `[GET] /view/index`

This url will return html content of product report chart and product report per brand.

## API

### 1. `[GET] /api/v1/get-chart`

This url will return data for product report data per area.

**Query Param:**

| **Name**          | **Description**                           |
| :---              | :---                                      |
| selected_areas    | String of area_id and seperated by `,`    |
| date_from         | Date from                                 |
| date_to           | Date to                                   |

### 2. `[GET] /api/v1/get-brand`

This url will return data for product report data per brand and per area.

**Query Param:**

| **Name**          | **Description**                           |
| :---              | :---                                      |
| selected_areas    | String of area_id and seperated by `,`    |
| date_from         | Date from                                 |
| date_to           | Date to                                   |

## Author

Falahlaz

## License

MIT License
