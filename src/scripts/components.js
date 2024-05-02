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

d.querySelector(".create-item").addEventListener("click", (e) => {
  e.target.parentElement.querySelector(".kanban-item-container").innerHTML += kanbanItemTemplate;
});
