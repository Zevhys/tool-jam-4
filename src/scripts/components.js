let kanbanItemTemplate = `
    <div class="kanban-item">
      <span class="textbox" role="textbox" placeholder="Type here..." contenteditable>
      </span>
      <div class="controls">
        <details>
          <summary>
            <i class="fa-solid fa-ellipsis"></i>
          </summary>
          <div>
            <button class="button-control button-delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </details>
      </div>
    </div>
`;

const d = document;

d.querySelector(".create-item-note").addEventListener("click", (e) => {
  e.target.parentElement.querySelector(".kanban-item-container").innerHTML += kanbanItemTemplate;
});

// TODO
//   <form id="form">
//   </form>
//   <button id="btn">tambah</button>
//   <input type="text" name="" id="inp"></input>

// let form = document.querySelector("#form");

// document.querySelector("#btn").addEventListener("click", () => {
//   let input = document.querySelector("#inp").value;
//   const template = `
//         <input type="checkbox" name="cb" id="${input.replace(" ", "-")}">
//         <label for="${input.replace(" ", "-")}">${input}</label>
//       `;
//   // console.log(input)
//   form.innerHTML += template;
// });
