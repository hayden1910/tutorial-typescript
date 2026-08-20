// DOM =  Object{} that represents the page you see in the web browser
//        and provides you with an API to interact with it.
// Web browser contructs the DOM when it loads an HTML document, 
//  and structures all the elements in a tree-like representation. 
// JavaScript can access the DOM to dynamically
//  change the content, structure, and style of a web page. 
// console.log(document);
// console.dir(document);
// document.title = "My website";
// document.body.style.backgroundColor = "hsl(0,0%, 15%)";
const username = "Hayden";
const welcomeMsg = document.getElementById("welcome-msg");
welcomeMsg.textContent += username === "" ? " No one" : " " + username;
export { };
//# sourceMappingURL=59-DOM.js.map