import { RADIUS } from 'wgs84';

interface GeoJSONGeometry {
    type: string;
    coordinates?: number[] | number[][] | number[][][] | number[][][][];
    geometries?: GeoJSONGeometry[];
}


export function geometry(geom: GeoJSONGeometry): number {
    let area = 0;
    switch (geom.type) {
        case 'Polygon':
            return polygonArea(geom.coordinates as number[][][]);
        case 'MultiPolygon':
            for (const polygon of geom.coordinates as number[][][][]) {
                area += polygonArea(polygon);
            }
            return area;
        case 'Point':
        case 'MultiPoint':
        case 'LineString':
        case 'MultiLineString':
            return 0;
        case 'GeometryCollection':
            for (const g of geom.geometries || []) {
                area += geometry(g);
            }
            return area;
        default:
            return 0;
    }
}

export function polygonArea(coords: number[][][]): number {
    let area = 0;
    if (coords && coords.length > 0) {
        area += Math.abs(ringArea(coords[0]));
        for (let i = 1; i < coords.length; i++) {
            area -= Math.abs(ringArea(coords[i]));
        }
    }
    return area;
}


/**
 * Calculate the approximate area of the polygon were it projected onto
 *     the earth.  Note that this area will be positive if ring is oriented
 *     clockwise, otherwise it will be negative.
 *
 * Reference:
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 *     Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 *     Laboratory, Pasadena, CA, June 2007 http://trs-new.jpl.nasa.gov/dspace/handle/2014/40409
 *
 * Returns:
 * {float} The approximate signed geodesic area of the polygon in square
 *     meters.
 */

export function ringArea(coords: number[][]): number {
    let area = 0;
    const coordsLength = coords.length;

    if (coordsLength > 2) {
        for (let i = 0; i < coordsLength; i++) {
            let lowerIndex: number;
            let middleIndex: number;
            let upperIndex: number;

            if (i === coordsLength - 2) {
                lowerIndex = coordsLength - 2;
                middleIndex = coordsLength - 1;
                upperIndex = 0;
            } else if (i === coordsLength - 1) {
                lowerIndex = coordsLength - 1;
                middleIndex = 0;
                upperIndex = 1;
            } else {
                lowerIndex = i;
                middleIndex = i + 1;
                upperIndex = i + 2;
            }

            const p1 = coords[lowerIndex];
            const p2 = coords[middleIndex];
            const p3 = coords[upperIndex];
            area += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]));
        }

        area = area * RADIUS * RADIUS / 2;
    }

    return area;
}

export function rad(deg: number): number {
    return deg * Math.PI / 180;
}

