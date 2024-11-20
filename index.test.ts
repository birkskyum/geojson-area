import { geometry } from './index.ts';
import { assertEquals } from 'jsr:@std/assert';
import ill from './fixtures/illinois.json' with { type: "json" };
import all from './fixtures/all.json' with { type: "json" };

Deno.test('computes the area of illinois', () => {
    assertEquals(geometry(ill), 145978332359.36746);
});

Deno.test('computes the area of the world', () => {
    // http://www.wolframalpha.com/input/?i=surface+area+of+earth
    assertEquals(geometry(all), 511207893395811.06);
});

Deno.test('point has zero area', () => {
    assertEquals(geometry({ type: 'Point', coordinates: [0,0] }), 0);
});

Deno.test('linestring has zero area', () => {
    assertEquals(geometry({ type: 'LineString', coordinates: [[0,0],[1,1]] }), 0);
});

Deno.test('geometrycollection is the sum', () => {
    assertEquals(geometry({ type: 'GeometryCollection', geometries: [all, ill] }), 511353871728170.44);
});
