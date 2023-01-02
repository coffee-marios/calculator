const elementNumbers = document.querySelectorAll("[data-number]");
const elementOperators = document.querySelectorAll("[data-operator]");



elementNumbers.forEach(el=>{
    el.addEventListener("click", clickNumber, false);
});

elementOperators.forEach(el=>{
    el.addEventListener("click", clickOperator, false);
});


let digitsNumber = "";
let hold = 0; 
let operation = "start";
let add = 0;
let subtract = 0;
let multiply = 1;
let divide = 1;
let appear = ""; 
let outcome = 0;
let registerOperator = false;
let prosimo = 1;
let decimal = 0;


function clickNumber(e) {
    
    let gotNumber = e.target.dataset.number;
    registerOperator = false;
    console.log(decimal)

    // We don't want to have many decimal points
    if (gotNumber === "."){
        decimal += 1; 
 
    } 
    if (decimal >= 2 && gotNumber === ".") {
            console.log(decimal)
            return;
        }

    // We don't want to begin with many zeros: 0000000000000000034
    if (digitsNumber === "0" && gotNumber !== "."){
        return;
    }

    

     if (appear !== "" && operation === "start"){
        digitsNumber += gotNumber;
        hold = digitsNumber;
        appear = digitsNumber
        outcome = Number(digitsNumber);
    }
    if (operation === "start" && digitsNumber === "") {
        digitsNumber = gotNumber;
        appear = digitsNumber;
        hold = Number(gotNumber);
        outcome = Number(digitsNumber); 

        //hold = Number(e.target.dataset.number);
    } 

    /*
    After we use an operator:
    hold is equal to the outcome or the first number we wrote  

    */
   
    if (operation === "add"){
            console.log(33, digitsNumber, `add: ${add}, hold: ${hold} `);

        if (digitsNumber === ""){
            
            add = Number(gotNumber) * prosimo;
            digitsNumber = gotNumber;
            appear = appear + digitsNumber;
            

        } else if (digitsNumber !== ""){
            digitsNumber += gotNumber;
            add = digitsNumber;
            appear += gotNumber;
            } 
            outcome = (Number(hold) * 10 + Number(add) * 10) /10;
            console.log(33, digitsNumber, `add: ${add}, hold: ${hold} `);
        } 

    if (operation === "subtract"){
        console.log(33, digitsNumber, `delete: ${subtract}, hold: ${hold} `);

        if (digitsNumber === ""){
            
            subtract = Number(gotNumber) * prosimo;
            
            digitsNumber = gotNumber;
            appear = appear + digitsNumber;
            
        } else if (digitsNumber !== ""){
            digitsNumber += gotNumber;
            subtract = digitsNumber * prosimo;
            appear += gotNumber;
            } 
            outcome = (Number(hold) * 10 - Number(subtract) * 10) /10;
            console.log(33, digitsNumber, `delete: ${subtract}, hold: ${hold} `);
        } 
    
        if (operation === "multiply"){
            console.log(33, digitsNumber, `multiply: ${multiply}, hold: ${hold} `);

            if (digitsNumber === ""){
        
                multiply = multiply * Number(gotNumber) * prosimo;
                //outcome = ((Number(hold)*10) * (Number(multiply)*10))/100;
                
                digitsNumber = gotNumber;
                appear = appear + digitsNumber;
                
            } else if (digitsNumber !== ""){
                digitsNumber += gotNumber;
                multiply = Number(digitsNumber) * prosimo;
                //outcome = Number(hold) * Number(multiply);
                appear += gotNumber;
            
                }
                outcome = ((Number(hold)*10) * (Number(multiply)*10))/100;
                console.log(33, digitsNumber, `multiply: ${multiply}, hold: ${hold} `);
            
            } 

            if (operation === "divide"){

                if (digitsNumber === ""){
            
                    divide = Number(gotNumber) * prosimo;
                    digitsNumber = gotNumber;
                    appear = appear + digitsNumber;
                    
                } else if (digitsNumber !== ""){
                    digitsNumber += gotNumber;
                    divide = Number(digitsNumber) * prosimo;
                    appear += gotNumber;
                    } 
                    outcome = ((Number(hold) * 10) / (Number(divide) *10)) / 100;

            }


    
    console.log(`${appear} = ${outcome} `);
    
}

function clickOperator(e) {

    // We are ready to pass to a new number
    decimal = 0;

    if (e.target.dataset.operator === "subtract" && registerOperator === true){
        digitsNumber = "";
        appear += " - ";
        prosimo *= -1;
        console.log(`${appear}`);
        return;

    }

    prosimo = 1;
    

    if(e.target.dataset.operator === "clear"){
        hold = 0;
        add = 0;
        divide = 0;
        subtract = 0;
        multiply = 0;
        outcome = 0;
        appear = "";
        operation = "start";
        digitsNumber = "";
        prosimo = 1;
        console.clear();
    }
    if(e.target.dataset.operator === "add" && registerOperator === false){
        digitsNumber = "";
        operation = "add";
        appear += " + ";
        hold = outcome;
        add = 0;
            
        console.log(`${appear}`);
    }

    if(e.target.dataset.operator === "subtract"){
        digitsNumber = "";
        operation = "subtract";
        appear += " - ";
        hold = outcome;
        subtract = 0;
            
        console.log(`${appear}`);
    } 

    if(e.target.dataset.operator === "multiply"){
        digitsNumber = "";
        operation = "multiply";
        appear += " * ";
        hold = outcome;
        multiply = 1;

        console.log(`${appear}`);
    }

    if(e.target.dataset.operator === "divide"){
        digitsNumber = "";
        operation = "divide";
        appear += " / ";
        hold = outcome;
        divide = 1;
            
        console.log(`${appear}`);
    }

    if(e.target.dataset.operator === "equal"){
        appear = outcome;
        console.log(appear);

        hold = 0;
        add = 0;
        divide = 0;
        subtract = 0;
        multiply = 0;
        operation = "start";
        digitsNumber = "";
        
    }
    

    




    registerOperator = true;
    console.log(e.target.dataset.operator);
    
}


