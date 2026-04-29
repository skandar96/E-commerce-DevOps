/* eslint-env jest */
/* global describe, test, expect */

const { generateRandomString, formatDate, getPaginationInfo } = require('./helpers');

describe('Helper Functions', () => {
  describe('generateRandomString', () => {
    test('should generate a string of specified length', () => {
      const result = generateRandomString(10);
      expect(result).toHaveLength(10);
    });

    test('should only contain alphanumeric characters', () => {
      const result = generateRandomString(50);
      expect(result).toMatch(/^[a-zA-Z0-9]+$/);
    });

    test('should generate different strings on multiple calls', () => {
      const str1 = generateRandomString(20);
      const str2 = generateRandomString(20);
      expect(str1).not.toBe(str2);
    });
  });

  describe('formatDate', () => {
    test('should format date correctly', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toContain('January');
      expect(result).toContain('15');
    });

    test('should handle date string input', () => {
      const result = formatDate('2024-12-25');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('getPaginationInfo', () => {
    test('should calculate correct pagination info', () => {
      const result = getPaginationInfo(1, 10, 100);
      expect(result.totalPages).toBe(10);
      expect(result.hasNextPage).toBe(true);
      expect(result.hasPrevPage).toBe(false);
    });

    test('should indicate no next page on last page', () => {
      const result = getPaginationInfo(5, 10, 50);
      expect(result.hasNextPage).toBe(false);
    });

    test('should indicate previous page exists', () => {
      const result = getPaginationInfo(3, 10, 100);
      expect(result.hasPrevPage).toBe(true);
    });
  });
});
