var missingNumber = function(nums) {
    let sum = (0+nums.length)*(nums.length+1)/2, sum1 = nums.reduce((pre, now)=>pre+now,0);
    console.log(sum, sum1);
    return sum - sum1 ;
};

let result = missingNumber([0,1,2,3,4,5,6,7,9]);
console.log(result);