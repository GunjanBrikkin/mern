const fs = require('fs');


const write = fs.writeFile("file.txt", 'hello world !!', (err) => {
    if (err) {
        console.log("error is ", err);
    }
    console.log("file")
})

const read = fs.readFile("file.txt", "utf8", (err, data) => {
    if (err) {
        console.log("hello this is err", err);
        return;
    }
    console.log("file :", data)
});


const pr = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
        resolve("resolved !!")
    } else {
        reject("Rejected !!")
    }
});

const start = async () => {
    try {

        const invoked = await pr;
        console.log("Success:", invoked);
    } catch (error) {
        console.log("error is", error)
    }
}

start();


const http = require("http");

http.createServer(function (req, res) {
    res.write("hello i am jun jun ");
    res.end();
}).listen(8080);