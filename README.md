# geojson-area

[![JSR](https://jsr.io/badges/@birkskyum/geojson-area)](https://jsr.io/@birkskyum/geojson-area)


Calculate the area inside of any [GeoJSON](http://geojson.org/) geometry.


## instal

```sh
npx jsr add @birkskyum/geojson-area
```

## import

```ts
import { geometry } from '@birkskyum/geojson-area';
```

## use

```ts
const area = geometry(obj);
```

## api

### `geometry(obj)`

Given a Geometry object, return contained
area as square meters. Invalid input will return `null`.

Adapted from [OpenLayers](http://openlayers.org/)
