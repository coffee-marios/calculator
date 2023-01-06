const elementNumbers = document.querySelectorAll("[data-number]");
const elementOperators = document.querySelectorAll("[data-operator]");
const visual_process = document.querySelector("#visual_process");
const visual_outcome = document.querySelector("#visual_outcome");

const reduceChar = document.querySelector("[data-reduce='delete']");

const myOperators = ["+", "-", "/", "*"];

elementNumbers.forEach(el=>{
    el.addEventListener("click", clickNumber, false);
});

elementOperators.forEach(el=>{
    el.addEventListener("click", clickOperator, false);
});

reduceChar.addEventListener("click", deleteChar, false);


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
let myFormula;

function clearEverything(){
    hold = 0;
    add = 0;
    divide = 1;
    subtract = 0;
    multiply = 1;
    outcome = 0;
    appear = "";
    operation = "start";
    digitsNumber = "";
    prosimo = 1;
    console.clear();
    visual_process.innerText = "";
    visual_outcome.innerText = "";
}

function clickNumber(e){
    let gotNumber = e.target.dataset.number;
    workNumber(gotNumber);

}


function workNumber(e) {
    
    let gotNumber = e;
    registerOperator = false;
    
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
        console.log(`more numbers, hold: ${hold} `)
    }
    if (operation === "start" && digitsNumber === "") {
        digitsNumber = gotNumber;
        appear = digitsNumber;
        hold = Number(gotNumber);
        outcome = Number(digitsNumber); 
        console.log('here')

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
            outcome = (Number(hold) * 100 + Number(add) * 100) /100;
        } 

    if (operation === "subtract"){

        if (digitsNumber === ""){
            
            subtract = Number(gotNumber) * prosimo;
            
            digitsNumber = gotNumber;
            appear = appear + digitsNumber;
            
        } else if (digitsNumber !== ""){
            digitsNumber += gotNumber;
            subtract = digitsNumber * prosimo;
            appear += gotNumber;
            } 
            outcome = (Number(hold) * 100 - Number(subtract) * 100) /100;
        } 
    
        if (operation === "multiply"){

            if (digitsNumber === ""){
        
                multiply = multiply * Number(gotNumber) * prosimo;
                digitsNumber = gotNumber;
                appear = appear + digitsNumber;
                
            } else if (digitsNumber !== ""){
                digitsNumber += gotNumber;
                multiply = Number(digitsNumber) * prosimo;
                appear += gotNumber;
            
                }
                outcome = ((Number(hold)*100) * (Number(multiply)*100))/10000;
            
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
                    outcome = ((Number(hold) * 100) / (Number(divide) *100));

            }


    visual_process.innerText = appear;
    

}

function clickOperator(e){
    gotOperator = e.target.dataset.operator;
    workOperator(gotOperator);
}

function workOperator(e) {

    let gotOperator = e;

    // We are ready to pass to a new number
    decimal = 0;

    if (gotOperator === "subtract" && registerOperator === true){
        digitsNumber = "";
        appear += " - ";
        prosimo *= -1;
        visual_process.innerText = appear;
        return;

    }

    prosimo = 1;
    

    if(gotOperator === "clear"){
        clearEverything();
    }
    if(gotOperator === "add" && registerOperator === false){
        digitsNumber = "";
        operation = "add";
        appear += " + ";
        hold = outcome;
        add = 0;
            
        
    }

    if(gotOperator === "subtract"){
        digitsNumber = "";
        operation = "subtract";
        appear += " - ";
        hold = outcome;
        subtract = 0;
        visual_process.innerText = appear; 
       
    } 

    if(gotOperator === "multiply" && registerOperator === false){
        digitsNumber = "";
        operation = "multiply";
        appear += " * ";
        hold = outcome;
        multiply = 1;

        
    }

    if(gotOperator === "divide" && registerOperator === false){
        digitsNumber = "";
        operation = "divide";
        appear += " / ";
        hold = outcome;
        divide = 1;
            
        
    }

    if(gotOperator === "equal"){
        visual_outcome.innerText = " = " + outcome;
        registerOperator = false;
        return;
    }


    registerOperator = true;
    //console.log(e.target.dataset.operator);
    visual_process.innerText = appear;
    
}


function deleteChar(){
    if(appear.length<=1){
        clearEverything();
    } else {
        myFormula = appear.split("");
        clearEverything()
        console.log(`myFormula: ${myFormula}, character: ${myFormula[myFormula.length-1]} `);
    
    
        if (myFormula[myFormula.length-1] === " "){
            console.log('ete')
            myFormula.pop();
        }

        myFormula.pop();
        let i=0;
        decimal = 0;
        for (i; i<myFormula.length; i++){
            if (myFormula[i] === " "){
                continue;
            }
            if (myOperators.includes(myFormula[i])){
                if (myFormula[i]==="+"){
                    workOperator("add");
                }
                if (myFormula[i]==="-"){
                    workOperator("subtract");
                }
                if (myFormula[i]==="/"){
                    workOperator("divide");
                }
                if (myFormula[i]==="*"){
                    workOperator("multiply");
                }
                console.log(myFormula[i]);
            
            } else{
                workNumber(myFormula[i]);
                console.log("outcome:", outcome)
                
            }

        }


        appear = myFormula.join("");
    }

    visual_process.innerText = appear;

return;
}


