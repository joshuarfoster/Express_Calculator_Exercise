const express = require('express');
const ExpressError = require('./expressError');

const app = express();

function findMean(nums){
    const sum = nums.reduce((total,num) => total + num, 0);
    return sum/nums.length;
};

app.get('/mean', function(req,res,next) {
    try{
        query = req.query;
        if (!query.hasOwnProperty('nums')) {
            e = new ExpressError('Nums are required', 400)
            throw(e)
        };
        const numsString = query.nums;
        const numStrings = numsString.split(',');
        const nums = numStrings.map(Number);
        if (nums.includes(NaN)){
            e = new ExpressError('Not a list of numbers',400)
            throw(e)
        };
        const mean = findMean(nums);
        return res.json({response:{operation: 'mean', value: mean}})
    }catch(e){
        next(e)
    }
});

function findMode(nums){
    const counts = {};
    for (num of nums) {
        if (counts.hasOwnProperty(num)){
            counts[num]++;
        } else {
            counts[num] = 1
        }
    }
    let maxCount = 0
    for (num in counts) {
        if (counts[num] > maxCount){
            maxCount = counts[num]
        }
    }
    const modes = []
    for (num in counts) {
        if(counts[num] === maxCount){
            modes.push(num)
        }
    }
    return modes
}

app.get('/mode', function(req,res,next) {
    try{
        query = req.query
        if (!query.hasOwnProperty('nums')) {
            e = new ExpressError('Nums are required', 400)
            throw(e)
        }
        const numsString = query.nums;
        const numStrings = numsString.split(',');
        const nums = numStrings.map(Number);
        if (nums.includes(NaN)){
            e = new ExpressError('Not a list of numbers',400)
            throw(e)
        }
        modes = findMode(nums)
        return res.json({response:{operation: 'mode', value: modes}})
    }catch(e){
        next(e)
    }
})

function findMedian(nums){
    nums.sort((a,b) => a - b)
    if(nums.length % 2 !== 0) {
        const midIndex = Math.floor(nums.length / 2)
        return nums[midIndex]
    }
    const midIndex1 = nums.length / 2 - 1
    const midIndex2 = nums.length / 2
    return (nums[midIndex1] + nums[midIndex2]) / 2
}

app.get('/median', function(req,res,next) {
    try{
        query = req.query
        if (!query.hasOwnProperty('nums')) {
            e = new ExpressError('Nums are required', 400)
            throw(e)
        }
        const numsString = query.nums;
        const numStrings = numsString.split(',');
        const nums = numStrings.map(Number);
        median = findMedian(nums)
        return res.json({response:{operation: 'median', value: median}})
    }catch(e){
        next(e)
    }
})

app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.msg;
    console.log(err)
    return res.status(status).json({
        error: {message,status}
    });
})

app.listen(3000, function(){
    console.log("Server starting on port 3000")
  })

module.exports = {findMean,findMedian,findMode}