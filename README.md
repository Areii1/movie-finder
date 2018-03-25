# Movie-finder

Awesome movie finding application, browse and search for different movies at your convenience. Created with React.js

You can test it out [here](https://areii1.github.io/movie-finder) 
## Prerequisites
Get an apikey from [The Movie DB](https://developers.themoviedb.org/3/getting-started/introduction)
## Usage

```bash
git clone https://github.com/Areii1/movie-finder
cd movie-finder
npm install
```
Create a file `src/apikey.js` and paste following content 

```javascript
const apikey = 'XXYY';
export default apikey;
```
Replace XXYY with your tmdb apikey

Then run these commands

```bash
npm start
open localhost:3000
```