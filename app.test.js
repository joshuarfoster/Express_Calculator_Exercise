const {findMean,findMedian,findMode} = require('./app')

describe("Mean function", function() {
    test('should find mean of integers', function(){
        const res = findMean([1,2,3,3,2,1])
        expect(res).toEqual(2)
    })
    test("should find the mean of decimals", function(){
        const res = findMean([1.5,2.5])
        expect(res).toEqual(2)
    })
    test("should find the mean of negative numbers", function(){
        const res = findMean([-1,-2,-3,-3,-2,-1])
        expect(res).toEqual(-2)
    })
    test("should find the mean of negative numbers mixed with positive numbers", function(){
        const res = findMean([-1,-2,3,3,2,1])
        expect(res).toEqual(1)
    })
})

describe("Median function", function() {
    test('should find median of an even amount of numbers', function(){
        const res = findMedian([1,2,3,4,7,1])
        expect(res).toEqual(2.5)
    })
    test("should find median of an odd amount of numbers", function(){
        const res = findMedian([1,4,8,6,9])
        expect(res).toEqual(6)
    })
})

describe("Mode function", function() {
    test('should return full set for the mode of a set of unique numbers', function(){
        const res = findMode([1,2,3,4,7])
        expect(res).toEqual(['1','2','3','4','7'])
    })
    test("should find mode of a set of numbers with one mode", function(){
        const res = findMode([1,4,8,6,9,4,4,8])
        expect(res).toEqual(['4'])
    })
    test("should find mode of a set of numbers with multiple modes", function(){
        const res = findMode([1,4,8,6,9,4,4,8,8,1,1])
        expect(res).toEqual(['1','4','8'])
    })
})