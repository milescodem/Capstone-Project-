




function task1(callback) {
  setTimeout(() => {
    console.log("Connecting to the Database");
    callback();
  }, 2000);
}

function task2() {
  setTimeout(() => {
    console.log("Fetching Data from the Database");
  }, 6000);
}

task1(task2);