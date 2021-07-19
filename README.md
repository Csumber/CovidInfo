# Ambrus Török Demo Project

## Structure

### Home

On the top, there is a banner.  
Picture full width, info on cards below
"Get data"
"Get Info"
"Register Vaccine"

### News

You can find news cards here, each separate article has a page.

### Reporting

This menu contains data about the current infection, vaccination and morality values and rates. You can find a regional breakdown here.

### Vaccine

This is where you can fill out a form, to register to be vaccinated (not for real of course). The inputs are validated.

### FAQ

Expansion panel with categories.

### Licensing

This site is going to contain all the third party resources with MIT license.

## Usage

After pulling, run `npm install`, and then `ng serve`

You also need to set up an environment.ts file.
```
export const environment = {
  production: false,
  firebase: {
    apiKey: '...',
    authDomain: '...',
    databaseURL: '.',
    projectId: '....',
    storageBucket: '...',
    messagingSenderId: '...',
  },
  firebaseAPIKey: '...',
  postFirebaseSignupURL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  postFirebaseSignInURL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  firebaseFaqURL:
    '...',
  firebaseVaccineURL:
    '...',
  newsAPIURL:
    'https://newsapi.org/v2/top-headlines?country=hu&category=health&apiKey=',
  newsAPIKey: '...',
  CovidAPIURL: 'https://api.covid19api.com',
  CovidAPIURLMAPDAILY: 'https://covid19.mathdro.id/api/daily',
  GoogleMapsAPIKey: '...',
  mapboxAPIKey:
    '...',
};
```
