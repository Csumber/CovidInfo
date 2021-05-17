// Chart
export interface ChartWorldResponse {
  Date: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface ChartCountryResponse {
  Date: string;
  ID: string;
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
}

export interface ChartEntry {
  name: string;
  value: number;
}

export interface ChartLine {
  name: string;
  series: ChartEntry[];
}

// Table
export interface CountrySummarizedTable {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
  Premium: {};
}

export interface CountriesSummarizedTableResponse {
  ID: string;
  Message: string;
  Global: {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
  };
  Countries: CountrySummarizedTable[];
}

export interface TableCountry {
  countryName: string;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
  mortalityRate: number;
}

// Map
export interface MapResponse {
  fips: string;
  admin2: string;
  provinceState: string;
  countryRegion: string;
  lastUpdate: string;
  lat: string;
  long: string;
  confirmed: string;
  deaths: string;
  recovered: string;
  active: string;
  combinedKey: string;
  incidentRate: string;
  caseFatalityRatio: string;
}

export interface MapDataEntry {
  lat: number;
  long: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  combinedKey: string;
}
