window.addEventListener("DOMContentLoaded", calculator);

// global variables
// All keys
const keys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "*",
  "+",
  "-",
  "/",
  "%",
];

// special function keys
const special = ["*", "+", "-", "/", "%"];

function calculator() {
  document.title = "JS Calculator";
  console.log("ready");

  let decimal = false;
  let evaluation = false;

  // create container for the calculator and add style
  const container = document.createElement("div");
  // Add class to the div
  container.classList.add("container");
  container.style.maxWidth = "950px";
  container.style.backgroundColor = "#f5f5f5";
  container.style.border = "1px solid #e0dede";
  container.style.borderRadius = "5px";
  container.style.padding = "15px";
  container.style.margin = "auto";
  document.body.appendChild(container);
  document.body.style.backgroundColor = "#f4f6ff";

  // Output screen area
  const output = document.createElement("input");
  output.setAttribute("type", "text");
  output.classList.add("output");
  output.style.width = "90%";
  //output.style.margin = "4% 4%";
  output.style.lineHeight = "50px";
  output.style.fontSize = "3rem";
  output.style.textAlign = "right";

  container.appendChild(output);

  //Another container for keys
  const keyContainer = document.createElement("div");
  // add class to the div
  keyContainer.classList.add("keyContainer");
  keyContainer.style.width = "100%";
  container.appendChild(keyContainer);

  // Loop through the keys array to add buttons
  keys.forEach(function (val) {
    // console.log(val);
    //Button
    btnMaker(val, addOutput);
  });

  btnMaker("=", evalOutput);
  btnMaker("C", clearOutput);

  // function for "=" operator
  function evalOutput() {
    output.style.border = "1px solid black";
    console.log("=");
    if (output.value === "") {
      output.style.border = "1px solid red";
    } else if (evaluation) {
      output.style.border = "1px solid red";
    } else {
      output.value = eval(output.value);
    }
    decimal = output.value.includes("."); //Will check if there is a decimal in the string or not
  }

  // Function for "C" - clear button
  function clearOutput() {
    output.style.border = "1px solid black";
    output.value = "";
  }

  //funtion to create buttons dynamically
  function btnMaker(text, myFunction) {
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.style.width = "23%";
    btn.style.lineHeight = "50px";
    btn.style.margin = "1%";
    btn.style.fontSize = "2em";
    btn.val = text;
    btn.textContent = text;
    btn.addEventListener("click", myFunction);
    keyContainer.appendChild(btn);
  }

  // function for the output
  function addOutput(e) {
    output.style.border = "1px solid black";
    // console.log(e.target.val);

    // any key is pressed that values is stored in "char" variable
    let char = e.target.val;

    if (char == ".") {
      if (decimal) {
        char = "";
        output.style.border = "1px solid red";
      } else {
        decimal = true;
      }
    }

    // Check if the pressed key is from the special keys then let the user add another decimal
    evaluation = special.includes(char);
    if (evaluation) {
      decimal = false;
    }

    output.value += char; //this will show the pressed key value in the output area
    // this won't let the user add more than one decimal in the number as well.
  }
}
