'use strict';

const join = require('path').join;
const expect = require('chai').expect;
const testdata = require(join(__appRoot, 'support/testdata/testdata'));
const DEFAULTS = require(join(__appRoot, 'support/defaults'));

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
        data = testdata(100);
      });

      it('should generate an array with the given magnitude', () => {
        expect(data.length).to.eql(100);
      });
    });
  });
});
