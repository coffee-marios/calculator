const elementNumbers = document.querySelectorAll("[data-number]");
const elementOperators = document.querySelectorAll("[data-operator]");



elementNumbers.forEach(el=>{
    el.addEventListener("click", clickNumber, false);
});

elementOperators.forEach(el=>{
    el.addEventListener("click", clickOperator, false);
});


let digitsNumber = "";
let hold = "0"; 
let operation = "start";
let add = 0;
let subtract = 0;
let multiply = 1;
let divide = 1;
let appear = ""; 
let outcome = 0;
let registerOperator = false;


function clickNumber(e) {
    
    let gotNumber = e.target.dataset.number;
    registerOperator = false;

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
   
    if (operation === "add"){
            console.log(33, digitsNumber, `add: ${add}, hold: ${hold} `);

        if (digitsNumber === ""){
            
            add += Number(gotNumber);
            outcome = Number(hold) + Number(add);
            
            digitsNumber = gotNumber;
            appear = appear + digitsNumber;
            console.log(33, digitsNumber, `add: ${add}, hold: ${hold} `);
            

        } else if (digitsNumber !== ""){
            digitsNumber += gotNumber;
            add = digitsNumber;
            outcome = Number(hold) + Number(add);


            appear += gotNumber;
            

            console.log(33, digitsNumber, `add: ${add}, hold: ${hold} `);
            } 
    } 
    if (operation === "subtract"){
        console.log(33, digitsNumber, `delete: ${subtract}, hold: ${hold} `);

        if (digitsNumber === ""){
            
            subtract += Number(gotNumber);
            outcome = Number(hold) - Number(subtract);
            
            digitsNumber = gotNumber;
            appear = appear + digitsNumber;
            console.log(33, digitsNumber, `delete: ${subtract}, hold: ${hold} `);
        } else if (digitsNumber !== ""){
            digitsNumber += gotNumber;
            subtract = digitsNumber;
            outcome = Number(hold) - Number(subtract);


            appear += gotNumber;
            

            console.log(33, digitsNumber, `delete: ${subtract}, hold: ${hold} `);
            } 
} 
if (operation === "multiply"){
    console.log(33, digitsNumber, `multiply: ${multiply}, hold: ${hold} `);

    if (digitsNumber === ""){
        
        multiply *= Number(gotNumber);
        outcome = Number(hold) * Number(multiply);
        
        digitsNumber = gotNumber;
        appear = appear + digitsNumber;
        console.log(33, digitsNumber, `multiply: ${multiply}, hold: ${hold} `);
    } else if (digitsNumber !== ""){
        digitsNumber += gotNumber;
        multiply = digitsNumber;
        outcome = Number(hold) * Number(multiply);


        appear += gotNumber;
        

        console.log(33, digitsNumber, `multiply: ${multiply}, hold: ${hold} `);
        } 
} 

if (operation === "divide"){
    console.log(33, digitsNumber, `divide: ${divide}, hold: ${hold} `);

    if (digitsNumber === ""){
        
        divide *= Number(gotNumber);
        outcome = Number(hold) / Number(divide);
        
        digitsNumber = gotNumber;
        appear = appear + digitsNumber;
        console.log(33, digitsNumber, `divide: ${divide}, hold: ${hold} `);
    } else if (digitsNumber !== ""){
        digitsNumber += gotNumber;
        multiply = digitsNumber;
        outcome = Number(hold) / Number(divide);


        appear += gotNumber;
        

        console.log(33, digitsNumber, `divide: ${divide}, hold: ${hold} `);
        } 
}


    
    console.log(`${appear} = ${outcome} `);
    
}

function clickOperator(e) {
    

    if(e.target.dataset.operator === "clear"){
        hold = "0";
        add = "0";
        appear = "";
        operation = "start";
        digitsNumber = "";
        console.clear();
    }
    if(e.target.dataset.operator === "add" && registerOperator === false){
        digitsNumber = "";
        operation = "add";
        appear += " + ";
        hold = outcome;
        add = 0;
        //outcome += Number(hold); 

            
        console.log(`${appear}`);
    }

    if(e.target.dataset.operator === "subtract"){
        digitsNumber = "";
        operation = "subtract";
        appear += " - ";
        hold = outcome;
        subtract = 0;
        //outcome += Number(hold); 

            
        console.log(`${appear}`);
    } 

    if(e.target.dataset.operator === "multiply"){
        digitsNumber = "";
        operation = "multiply";
        appear += " * ";
        hold = outcome;
        multiply = 1;
        //outcome += Number(hold); 

            
        console.log(`${appear}`);
    }

    if(e.target.dataset.operator === "divide"){
        digitsNumber = "";
        operation = "divide";
        appear += " / ";
        hold = outcome;
        divide = 1;
        //outcome += Number(hold); 

            
        console.log(`${appear}`);
    }




    if(e.target.dataset.operator === "equal"){
        //outcome = Number(hold) + Number(outcome);
        console.log(outcome, hold);
        hold = "0";
        appear = "";
        operation = "start";
        digitsNumber = "";
    }
    

    




    registerOperator = true;
    console.log(e.target.dataset.operator);
    
}


