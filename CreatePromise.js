let isConragtsclient 

let Promisecongrats = new Promise((resolve, reject) => {
    isConragtsclient = false;
    if (isConragtsclient) {
        resolve("Congratulations! You are a valued client.");
    } else {
        reject("Sorry, there was an error.");
    }
});
