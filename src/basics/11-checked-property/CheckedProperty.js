// .checked     =   property that determines the checked state of an 
//                  HTML checkbox or radio button element
const myCheckbox = document.getElementById("myCheckbox");
const myRadioBtn1 = document.getElementById("visaBtn");
const myRadioBtn2 = document.getElementById("masterCardBtn");
const myRadioBtn3 = document.getElementById("payPalBtn");
const mySubmit = document.getElementById("mySubmit");
const result = document.getElementById("resultElement");
const paymentResult = document.getElementById("paymentResult");
mySubmit.onclick = function () {
    if (myCheckbox.checked) {
        result.textContent = "You are subscribed";
    }
    else {
        result.textContent = "You are NOT subscribed";
    }
    if (myRadioBtn1.checked) {
        paymentResult.textContent = "You are paying by Visa";
    }
    else if (myRadioBtn2.checked) {
        paymentResult.textContent = "You are paying by Master Card";
    }
    else if (myRadioBtn3.checked) {
        paymentResult.textContent = "You are paying by PayPal";
    }
    else {
        paymentResult.textContent = "You must select a payment type";
    }
};
export {};
//# sourceMappingURL=CheckedProperty.js.map