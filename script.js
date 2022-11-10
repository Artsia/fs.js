/*This app uses fs.js to store randomly 
generated passwords to local machine
https://nodejs.org/api/fs.html#filehandlecreatereadstreamoptions*/

var fs = require('fs');

/**genearate a random password 
 * @length is the size of the password as an integer
 * @passwordFor is the file location name for which the password is being created
*/
function hashing(passwordFor, length){
    const alhpabelt = "abcdefghijklmnopqrstuvwxyz";
    const alhpabeltUppper = alhpabelt.toUpperCase();
    const symbols ="!@#$%^&*()_+-=";
    const numbers = "0123456789";
    const characters = alhpabeltUppper + alhpabelt + symbols + numbers;
    let p = "";
    const iterations = length * 5;

    for(var i = 0; i < iterations; i++){
        p = p + characters.charAt(Math.floor(Math.random()*iterations));
    }

    return {"fileName":passwordFor,"createdPassword":p};
}

/**Stores @password object onto local computer */

function createFile(obj)
{
    fs.writeFile(`${obj.fileName}.txt`, `${obj.createdPassword}`, function (err) {
        if (err) throw err;
        console.log('Saved to:' + `${obj.fileName}.txt`);
    });
}

/***Appends and stores a collection of passwords into a file 
 * if file exists then password will be appened to file
 * otherwise file is created and password is appened
 * @obj is the returned object from hashing method
*/

function appendPassWordToFile(obj)
{
    fs.appendFile(`${obj.fileName}.txt`, `${obj.createdPassword}\n\n`, function (err){
        if (err) throw err;
        console.log(`${obj.fileName}.txt file has been created and ${obj.createdPassword} has been appended to file`)
    })
}

/**read data from @file*/

function readData(file)
{
    //https://www.w3schools.com/nodejs/ref_buffer.asp
    //       file                 err, buffer object
    fs.readFile(`${file}`, (err, data)=>{
        if(err) throw err;
        console.log(data.toString())
    })
}

/***checks if @file can be accessed by current user */
function hassAccess(file)
{
    fs.access(`${file}`,fs.constants.F_OK, function(e,r){
        if(e) throw e;
        console.log('File ccan be accesed')
    })
}


/**TESTING
const p1 = hashing("google",50);
const c = createFile(p1)
const appendF = appendPassWordToFile(p1);

READ DATA

readData('mynewfile3.txt')

hassAccess('google.txt') */


