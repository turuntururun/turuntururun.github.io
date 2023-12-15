import {expect, test} from "@jest/globals";
import {
  closed,
  generateFingering,
  harmonicMajor,
  harmonicMinor,
  major,
  melodicMinor,
  noteName,
  octaves,
  onDegree,
  scaleComposer,
  withFlat
} from "../../assets/scales";

test('Major works', () => {
  expect(scaleComposer(major)(0)).toStrictEqual([0, 2, 4, 5, 7, 9, 11])
});

test('Definition composing', () => {

  expect(scaleComposer(major, withFlat(3))(0))
    .toStrictEqual(scaleComposer(melodicMinor)(0))

  expect(scaleComposer(major, onDegree(6))(0))
    .toStrictEqual(scaleComposer(harmonicMinor, withFlat(7))(9))

  expect(scaleComposer(major, closed)(0))
    .toStrictEqual([0, 2, 4, 5, 7, 9, 11, 12])

  expect(scaleComposer(major, octaves(1))(0))
    .toStrictEqual([0, 2, 4, 5, 7, 9, 11])

  expect(scaleComposer(major, octaves(2))(0))
    .toStrictEqual([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23])
  expect(scaleComposer(major, octaves(2), closed)(0))
    .toStrictEqual([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24])

  expect(scaleComposer(major, octaves(2))(9))
    .toStrictEqual([9, 11, 13, 14, 16, 18, 20, 21, 23, 25, 26, 28, 30, 32])
  expect(scaleComposer(major, octaves(2), closed)(9))
    .toStrictEqual([9, 11, 13, 14, 16, 18, 20, 21, 23, 25, 26, 28, 30, 32, 33])

});

test('Mode creation works', () => {
  expect(scaleComposer(major, onDegree(1))(0).map(noteName).join()).toBe('C,D,E,F,G,A,B')
  expect(scaleComposer(major, onDegree(2))(0).map(noteName).join()).toBe('D,E,F,G,A,B,C')
  expect(scaleComposer(major, onDegree(3))(0).map(noteName).join()).toBe('E,F,G,A,B,C,D')
  expect(scaleComposer(major, onDegree(4))(0).map(noteName).join()).toBe('F,G,A,B,C,D,E')
  expect(scaleComposer(major, onDegree(5))(0).map(noteName).join()).toBe('G,A,B,C,D,E,F')
  expect(scaleComposer(major, onDegree(6))(0).map(noteName).join()).toBe('A,B,C,D,E,F,G')
  expect(scaleComposer(major, onDegree(7))(0).map(noteName).join()).toBe('B,C,D,E,F,G,A')

});

test('C melodic minor works', () => {
  expect(melodicMinor(0).map(noteName).join()).toBe('C,D,Eb,F,G,A,B')
});

test('C harmonic minor works', () => {
  expect(harmonicMinor(0).map(noteName).join()).toBe('C,D,Eb,F,G,Ab,B')
});

test('C harmonic major works', () => {
  expect(harmonicMajor(0).map(noteName).join()).toBe('C,D,E,F,G,Ab,B')
});

test('Fingering generation works', () => {
  const majorScale = scaleComposer(major, octaves(2), closed);

  expect(generateFingering(majorScale(48)))
    .toStrictEqual([
      {string: 6, fret: 8},
      {string: 6, fret: 10},
      {string: 5, fret: 7},
      {string: 5, fret: 8},
      {string: 5, fret: 10},
      {string: 4, fret: 7},
      {string: 4, fret: 9},
      {string: 4, fret: 10},
      {string: 3, fret: 7},
      {string: 3, fret: 9},
      {string: 3, fret: 10},
      {string: 2, fret: 8},
      {string: 2, fret: 10},
      {string: 1, fret: 7},
      {string: 1, fret: 8},
    ])
});
