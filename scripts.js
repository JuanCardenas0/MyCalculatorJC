      // Get elements from html
      const display = document.querySelector(".display");
      const buttons = document.querySelector(".buttons");
      // Set initial variables for input and operators 
      let currentInput = "";
      let operator = null;

      //Updates the screen with new string. Otherwise sets 0
      function updateDisplay() {
        display.textContent = currentInput || "0";
      }

      //Clear the input stored and operator. Refresh screen
      function clearCalculator() {
        currentInput = "";
        operator = null;
        updateDisplay();
      }

      //Sets the number clicked on the input and updates screen
      function handleNumber(number) {
        if (currentInput.length < 20) {
          currentInput += number;
          updateDisplay();
        }
      }

      //Deletes last input. Refreshes screen
      function DeleteLast() {
        if (currentInput.length <= 30 && currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          updateDisplay();
        }
      }

      //Adds operator to screen. Makes sure you cannot add operator after operator.
      function handleOperator(op) {
        lastCharacter = currentInput.slice(currentInput.length - 1);

        console.log(lastCharacter);

        //Confirms input is valid and a number
        if (
          currentInput === "" ||
          (isNaN(lastCharacter) == true && lastCharacter == op)
        )
          return;

        //If last input is operator, delete it and set the new operator last.
        else if (isNaN(lastCharacter) == true && lastCharacter !== op) {
          operator = op;
          currentInput = currentInput.slice(0, -1) + op;
          updateDisplay();
          return;
        } else operator = op;
        currentInput = currentInput + op;
        updateDisplay();
      }

      //Enters decimal. Makes sure the last set of numbers doesn't already have decimal.
      function handleDecimal() {
        i = 1;
        lastCharacter = currentInput.slice(-1);
        console.log(lastCharacter);

        //Iterates through the last set of numbers until it finds a non-number
        while (
          !isNaN(lastCharacter) == true &&
          lastCharacter != null &&
          lastCharacter != ""
        ) {
          lastCharacter = currentInput.slice(
            currentInput.length - i,
            currentInput.length - i + 1
          );
          i++;
          console.log("i = " + i);
          console.log("last = " + lastCharacter);
        }

        //Confirms last non-number is an operator. If it is, you can add decimal
        if (lastCharacter !== ".") {
          currentInput += ".";
          updateDisplay();
        } else return;
      }

        //Replaces X for *. Deletes all other inputs except numbers and operators
      function calculate() {
        const multiop = currentInput.replace("x", "*");
        const inputSafe = multiop.replace(/[^0-9\+\-\.\*\/]/g, "");

        //Computes string and returns math result. Confirms invalid and error.
        var result = eval(inputSafe);
        if (result === undefined) {
          result = "Error";
        } else if (result === Infinity) {
          result = "Invalid";
        } else if (isNaN(result)) {
          result = "Error";
        } else {
          result = String(result);
        }
        currentInput = String(result);
        updateDisplay();
      }

      //Events for clicking buttons.
      buttons.addEventListener("click", (clicked) => {
        const target = clicked.target;

        if (target.matches("button")) {
          console.log(currentInput, operator);

          const value = target.textContent;
         
          // Sets multiple routes for inputs. Numbers and 0, then operators, then backspace, then clear and equal.

          if (!isNaN(parseInt(value)) || value === "0") {
            handleNumber(value);
          }
            else if (["+", "-", "x", "/"].includes(value)) {
            handleOperator(value);
          } else if (value === ".") {
            handleDecimal();
          } else if (value === "←") {
            DeleteLast();
          } else if (value === "C") {
            clearCalculator();
          } else if (value === "=") {
            calculate();
          }
        }
      });

      updateDisplay();
