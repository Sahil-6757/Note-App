let exit = document.getElementById("exit");
let card = document.getElementById("card");
let note = document.getElementById("note");
let btn = document.getElementById("btn");
let allcard = document.getElementById("allcard");
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let trashbtn = document.querySelector("trashbtn");

getnotes();

exit.addEventListener("click", () => {
  note.innerHTML = "";
});

card.addEventListener("click", () => {
  location.reload();
  note.innerHTML = `<img src="./Image/x-circle.svg" alt="exit" class="exit" id="exit" />
  <div class="mb-3 input">
    <label for="exampleFormControlInput1" class="form-label"
      >Note Title</label
    >
    <input type="text" required class="form-control" id="exampleFormControlInput1" />
  </div>
  <div class="mb-3 input">
    <label for="exampleFormControlTextarea1" class="form-label"
      >Note Description</label
    >
    <textarea
      class="form-control"
      id="exampleFormControlTextarea1"
      rows="3" required
    ></textarea>
  </div>
  <button type="button" class="btn btn-primary">Save</button>`;
});

btn.addEventListener("click", () => {
  let title = document.getElementById("title");
  let desc = document.getElementById("desc");

  let notetitle = title.value;
  let notedesc = desc.value;

  if (notetitle == "" || notedesc == "") {
    alert("Please fill something");
    title.focus();
  } else {
    let noteinfo = {
      title: notetitle,
      description: notedesc,
    };

    notes.push(noteinfo);
    localStorage.setItem("notes", JSON.stringify(notes));
    note.innerHTML = "";
    title.value = "";
    desc.value = "";

    console.log(noteinfo);
    getnotes();

    Notification.requestPermission().then((param) => {
      if (param == "granted") {
        new Notification("Note Added Successfully.", {
          tag: "Thank you",
          icon: "./Image/book.svg",
        });
      }
    });
  }
});

function getnotes() {
  let html = "";
  notes.forEach((element, index) => {
    let dom = `<div class="card col-6 col-sm-3 container-fluid" style="width: 18rem;" >
    <div class="card-body" > 
    <i class="fa-solid fa-trash trashbtn" id="trash_btn"></i>
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.description}</p>
      
    </div>
  </div>`;
    html += dom;
    allcard.innerHTML = html;
  });
}

trashbtn.addEventListener("click", () => {
  alert("Delete button activated");
});
