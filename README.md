# geojson-area

[![JSR](https://jsr.io/badges/@birkskyum/geojson-area)](https://jsr.io/@birkskyum/geojson-area)


Calculate the area inside of any [GeoJSON](http://geojson.org/) geometry.


## example

```js
import { geometry } from './index.ts';

var area = geometry(obj);
```

## api

### `geojsonArea.geometry(obj)`

Given a Geometry object, return contained
area as square meters. Invalid input will return `null`.

Adapted from [OpenLayers](http://openlayers.org/)
