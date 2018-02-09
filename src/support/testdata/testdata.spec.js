'use strict';

const join = require('path').join;
const expect = require('chai').expect;
const testdata = require(join(__appRoot, 'src/support/testdata/testdata'));
const DEFAULTS = require(join(__appRoot, 'src/support/defaults'));

describe('testdata', () => {
  let data;
  describe('when generating test data', () => {
    beforeEach(() => {
      data = testdata();
    });

    it('should generate an array of test data', () => {
      expect(Array.isArray(data)).to.be.true;
    });

    it('should generate an array of intergers', () => {
      data.forEach((d) => {
        expect(typeof d).to.eql('number');
        expect(parseInt(d, 10)).to.eql(d);
      });
    });

    describe('and not specifying the magnitude', () => {
      it('should generate an array with the default magnitude', () => {
        expect(data.length).to.eql(DEFAULTS.testdataMagnitude);
      });
    });

    describe('and specifying the magnitude', () => {
      beforeEach(() => {
        data = testdata('array', 100);
      });

      it('should generate an array with the given magnitude', () => {
        expect(data.length).to.eql(100);
      });
    });

    describe('and specifying object type', () => {
      beforeEach(() => {
        data = testdata('object');
      });

      it('should generate an object', () => {
        expect(typeof data).to.equal('object');
      });
    });

    describe('and specifying objectMap type', () => {
      beforeEach(() => {
        data = testdata('objectMap');
      });

      it('should generate an object', () => {
        expect(typeof data).to.equal('object');
      });

      it('should should set the size property on the object to the magnitude of testdata inserted into the map', () => {
        expect(data.size).to.equal(DEFAULTS.testdataMagnitude);
      });

      it('should populate the object with integers', () => {
        Object.keys(data).forEach((key) => {
          expect(typeof data[key]).to.equal('number');
        });
      });
    });

    describe('and specifying map type', () => {
      beforeEach(() => {
        data = testdata('map');
      });

      it('should generate a Map', () => {
        expect(data instanceof Map).to.be.true;
      });

      it('should contain as many values as specified via magnitude', () => {
        expect(data.size).to.equal(DEFAULTS.testdataMagnitude);
      });

      it('should populate the Map with integers', () => {
        data.forEach((d) => {
          expect(typeof d).to.equal('number');
        });
      });
    });
  });
});
