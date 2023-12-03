var cuttingRope = function(n) {
    let dp = new Array(n+1).fill(0);
    dp[1] = 1;
    for(let i=2;i<=n;i++){
        for(let j=1;j<i;j++){
            dp[i] = Math.max(dp[i],dp[i-j]*j,(i-j)*j);
        }
    }
    return dp[n];
};
let result = cuttingRope(10);
console.log(result);