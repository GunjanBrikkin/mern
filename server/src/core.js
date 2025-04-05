// const nums = [2, 7, 11, 15];
// const target = 26;

// function twoSum(nums, target) {
//     const numMap = {}; // Step 0: numMap = {}

//     for (let i = 0; i < nums.length; i++) {
//         const complement = target - nums[i];
//         console.log(`i: ${i}, nums[i]: ${nums[i]}, complement: ${complement}, numMap:`, numMap);

//         if (complement in numMap) {
//             console.log('Found complement in numMap:', complement);
//             return [numMap[complement], i];
//         }

//         // Only store the current number *after* checking
//         numMap[nums[i]] = i;
//     }

//     return [];
// }

// console.log(twoSum(nums, target));
////////////////////////////////////////////////////////

// const a = '10 20 30';

// const b = a.split(" ").map(Number)

// console.log("b", b);

// const m = '1 2'
// const n = '3 4'

// const x = m.split("  ") + n.split("  ");

// console.log("x", x)

////////////////////////////////////////////////////
// process.stdin.setEncoding('utf8')
// let input = "";
// process.stdin.on('data', function (chunk) {
//     input += chunk;
//     console.log("input", input)
// });
// process.stdin.on('end', function () {
//     console.log(input[0]);
//     console.log(input[1]);
//     console.log(input[2]);
//     console.log(input[3]);
//     input = input.split('\n');
//     console.log(" new input", input)
//     console.log("input[0].split", input[0].split(" ").map(String))
//     let [A, B] = input[0].split(" ").map(String);
//     let [C, D, E] = input[1].split(" ").map(String);
//     let [F, G, H, I] = input[2].split(" ").map(String);
//     console.log(A + " " + B + " " + C + " " + D + " " + E + " " + F + " " + G + " " + H + " " + I);
// });

//////////////////////////////////////////////////

process.stdin.setEncoding('utf8');
let input = '';
process.stdin.on('data', function (chunk) {
    input += chunk;
});
process.stdin.on('end', function () {
    input = input.split('\n');

    //   accepts the count of test cases in t  
    let t = parseInt(input[0]);
    // itterating for each test case  
    let pos = 1;
    for (let i = 1; i <= t; i++) {
        //   taking input for each test case
        const [A, B] = input[pos].split(' ').map(Number);
        const [C, D, E] = input[pos + 1].split(' ').map(Number);
        console.log(A + " " + B + " " + C + " " + D + " " + E);
        pos += 2;
    }
});