/// <reference path="../typings/index.d.ts" />

import { Utils } from '../src/Utils';

describe('Our first util test', () => {
  it('Our first expectation', () => {
    expect(true).toBeTruthy();
  });
});

describe('the feetToInches method', () => {
  it('converts feet to inches', () => {
    expect(Utils.feetToInches(3)).toEqual(36);
  });
});

// describe('In Utils.ts', () => {
//   describe('the feetToInches() method', () => {
//     it('converts feet to inches', () => {
//       expect(Utils.feetToInches(3)).toEqual(36);
//     });
//   });
// });
