# Weather Monitor [FE]
WeatherMonitorFE shows historical weather data for Warsaw (sensor is somewhere 
near main building of the Warsaw University of Technology)

WeatherMonitorFE is front end app of project which contains:
* 4 charts presenting collected weather data:
  * Temperature (°C)
  * Rain (mm)
  * Pressure (hPa)
  * Wind (km/h)
* Form to add new measurement. Form allows only for numeric values 
and is validated on front end and back end. This validation protect from potential SQL Injection attack
* `Refresh` button. The button call backend API, backend API calls for `open-meteo.com` API.
After data is fetched from `open-meteo.com` it is saved on DB and returned to FE and is shown.
* Table of weather data.
  * Under table there is datetime field to select filtering data range (default is one week from now)
  * Table displaying all data in selected time frame.
  * By clicking on the column title column can be sorted.
  * Last two columns have Edit and Delete buttons. So the data in the selected row 
can be edited or deleting (this functionality complete CRUD nature of the project)
  * Table is paginated and paginating is handled by front end side.

## How to run:
```bash
git clone https://github.com/fiodarks/WeatherMonitorFE.git
cd WeatherMonitorFE
npm install
npm run dev
```

## Environments

### Deployed app:
https://weather-monitor-fe.vercel.app/

### Local:
http://localhost:5173