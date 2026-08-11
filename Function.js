function assistMe (Name, Age, Condition)  {
  console.log(`Hello ${Name}, you are ${Age} years old and your condition is ${Condition}.`);
  
}

let assistMe1 = function(Name) {
  console.log(`Hello ${Name}, how can I assist you today?`);
  
};

let assistMe2 = (Age) => {
  console.log(`You are ${Age} years old.`);
};
let assistMe3 = function(Condition) {
  console.log(`Your condition is ${Condition}.`);
};

assistMe("Kelly Duncan", 30, "Back Pain");

assistMe1("Kelly Duncan");

assistMe2(30);

assistMe3("Back Pain");