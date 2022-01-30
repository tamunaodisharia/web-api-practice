import { displaySecondComponent } from "./secondComponent.js";
import { displayFirstComponent } from "./firstComponent.js";

export function renderHTML() {
  //renders initial html
  const container = document.getElementById("container");
  const html = ` <div id="firstComponent">
      <input type="text" id="input1" class="input" />
      <button id="button1" type="submit">Submit</button>
    </div>
  
    <div id="information"></div>
    <div id="secondComponent">
      <input type="text" id="input2" class="input" />
      <input type="text" id="input3" class="input" />
      <input type="text" id="input4" class="input" />
      <button id="button2" type="submit">Submit</button>
    </div>`;
  container.insertAdjacentHTML("afterbegin", html);
  addEvents();
}
function addEvents() {
  document
    .getElementById("button1")
    .addEventListener("click", async function () {
      displayFirstComponent();
    });
  document
    .getElementById("button2")
    .addEventListener("click", async function () {
      displaySecondComponent();
    });
}
