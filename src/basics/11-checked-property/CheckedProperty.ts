// .checked     =   property that determines the checked state of an 
//                  HTML checkbox or radio button element

const myCheckbox = document.getElementById("myCheckbox") as HTMLInputElement;
const myRadioBtn1 = document.getElementById("visaBtn") as HTMLInputElement;
const myRadioBtn2 = document.getElementById("masterCardBtn") as HTMLInputElement;
const myRadioBtn3 = document.getElementById("payPalBtn") as HTMLInputElement;
const mySubmit = document.getElementById("mySubmit") as HTMLButtonElement;
const result = document.getElementById("resultElement") as HTMLElement;
const paymentResult = document.getElementById("paymentResult") as HTMLElement;

mySubmit.onclick = function () {
    if (myCheckbox.checked) {
        result.textContent = "You are subscribed"
    } else {
        result.textContent = "You are NOT subscribed"
    }

    if (myRadioBtn1.checked) {
        paymentResult.textContent = "You are paying by Visa";
    } else if (myRadioBtn2.checked) {
        paymentResult.textContent = "You are paying by Master Card";
    } else if (myRadioBtn3.checked) {
        paymentResult.textContent = "You are paying by PayPal";
    } else {
        paymentResult.textContent = "You must select a payment type";
    }
}

export { };
