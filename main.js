const calculateButton = document.getElementById("calculate");
const closeButton = document.getElementById("closeButton");
const modal = document.getElementById("modal");

calculateButton.disabled = true;
window.onload = function(){
    document.getElementById("x").addEventListener("change",validateInputs);
    document.getElementById("y").addEventListener("change",validateInputs);
    document.getElementById("x-error").style.display = "none";
    document.getElementById("y-error").style.display = "none";
}
calculateButton.addEventListener('click', () => {
    modal.dispatchEvent(new CustomEvent('calculate', {
        detail: {
            x: document.getElementById('x').value,
            y: document.getElementById('y').value
        }
    })
    );
})
modal.addEventListener('calculate',(e)=>{
    modal.classList.add("scale");
    const table = document.createElement("table");
    table.id = "table-id";
    for(let i = 0; i <= e.detail.x; i++){
        const row = table.insertRow();
        for( let j = 0; j <= e.detail.y; j++){
            const cell = row.insertCell();
            if (i == 0 && j == 0) cell.innerText = " ";
                else if (i == 0) cell.innerText = "X = " + j;
                else if (j == 0) cell.innerText = "Y = " + i;
                else cell.innerText = j * i;
        }
    }
    document.getElementById("content").appendChild(table);
})
closeButton.addEventListener('click',()=>{
    document.getElementById('table-id').remove();
    modal.classList.remove("scale");
})
function validateInputs() {
    let inputId = this.getAttribute('id')
    let min = parseInt(this.getAttribute('min'))
    let max = parseInt(this.getAttribute('max'))
    let acctualValue = this.value
    let inputErrorLabelId = inputId + "-error"
    if (acctualValue > max || acctualValue < min ) {
        document.getElementById(inputErrorLabelId).style.display = "block";
        calculateButton.disabled = true;
        return;
    }else{
        document.getElementById(inputErrorLabelId).style.display = "none";
        checkInputs();
    }
} 
function checkInputs(){
    let x = document.getElementById("x-error").style.display;
    let y = document.getElementById("y-error").style.display;
    let inputX = document.getElementById("x").value;
    let inputY = document.getElementById("y").value;
    if((x == "none" ) && (y == "none")){
        calculateButton.disabled = false;
    }
    if((inputX == "") || (inputY == "")){
        calculateButton.disabled = true;   
    }
}