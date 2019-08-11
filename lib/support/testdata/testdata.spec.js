'use strict';

const expect = require('chai').expect;
const testdata = require('./');
const DEFAULTS = require('../defaults');

describe('testdata', () => {
  let data;
  describe('when generating test data', () => {
    beforeEach(() => {
      data = testdata();
    });

    it('generates an array of test data', () => {
      expect(Array.isArray(data)).to.be.true;
    });

    it('generates an array of intergers', () => {
      data.forEach((d) => {
        expect(typeof d).to.eql('number');
        expect(parseInt(d, 10)).to.eql(d);
      });
    });

    describe('and not specifying the magnitude', () => {
      it('generates an array with the default magnitude', () => {
        expect(data.length).to.eql(DEFAULTS.magnitude);
      });
    });

    describe('and specifying the magnitude', () => {
      beforeEach(() => {
        data = testdata('array', 100);
      });

      it('generates an array with the given magnitude', () => {
        expect(data.length).to.eql(100);
      });
    });

    describe('and specifying object type', () => {
      beforeEach(() => {
        data = testdata('object');
      });

      it('generates an object', () => {
        expect(typeof data).to.equal('object');
      });
    });

    describe('and specifying objectMap type', () => {
      beforeEach(() => {
        data = testdata('objectMap');
      });

      it('generates an object', () => {
        expect(typeof data).to.equal('object');
      });

      it('set the size property on the object to the magnitude of testdata inserted into the map', () => {
        expect(data.size).to.equal(DEFAULTS.magnitude);
      });

      it('populates the object with integers', () => {
        Object.keys(data).forEach((key) => {
          expect(typeof data[key]).to.equal('number');
        });
      });
    });

    describe('and specifying map type', () => {
      beforeEach(() => {
        data = testdata('map');
      });

      it('generates a Map', () => {
        expect(data instanceof Map).to.be.true;
      });

      it('contains as many values as specified via magnitude', () => {
        expect(data.size).to.equal(DEFAULTS.magnitude);
      });

      it('populates the Map with integers', () => {
        data.forEach((d) => {
          expect(typeof d).to.equal('number');
        });
      });
    });

    describe('and specifying the number type', () => {
      beforeEach(() => {
        data = testdata('number');
      });

      it('generates a number', () => {
        expect(typeof data).to.equal('number');
      });

      describe('and specifying a minimum', () => {
        beforeEach(() => {
          data = testdata('number', undefined, 10);
        });

        it('generates a number greater than or equal to that minimum', () => {
          expect(data).to.be.at.least(10);
        });
      });

      describe('and specifying a maximum', () => {
        beforeEach(() => {
          data = testdata('number', undefined, undefined, 10);
        });

        it('generates a number less than that maximum', () => {
          expect(data).to.be.below(10);
        });
      });

      describe('and specifying minimum and maximum', () => {
        beforeEach(() => {
          data = testdata('number', undefined, 5, 10);
        });

        it('generates a number greater than or equal to the minimum and less than the maximum', () => {
          expect(data).to.be.at.least(5);
          expect(data).to.be.below(10);
        });
      });
    });

    describe('and specifying the arrays type', () => {
      beforeEach(() => {
        data = testdata('arrays');
      });

      it('generates an array', () => {
        expect(Array.isArray(data)).to.be.true;
      });

      it('generates an array of arrays', () => {
        for (const e of data) {
          expect(Array.isArray(e)).to.be.true;
        }
      });
    });
  });
});
