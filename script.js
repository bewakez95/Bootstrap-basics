let taskList = [];

const taskElementList = document.getElementById("taskList");
const badElementList = document.getElementById("badlist");
const hours = document.querySelector(".container > p");
// console.log(hours);
const entrylist = [];
const badlist = [];
let total = 0;

const handleOnSubmit = (e) => {
  const form = new FormData(e);
  const task = form.get("task");
  const hr = +form.get("hr");
  //   console.log(typeof hr, typeof task);
  const object = {
    task,
    hr,
    type: "entry",
    id: ranStr(),
  };
  total = total + hr;
  //   console.log(total);
  if (total <= 168) {
    taskList.push(object);
    display();
  } else {
    hours.style.color = "red";
    hours.innerHTML = `Too many hours allocated per week !!`;
  }

  //   console.log(object);
};
const display = () => {
  let str = "";
  //   let total = 0;

  const entrylist = taskList.filter((item) => item.type === "entry");
  entrylist.map((item, i) => {
    // total += item.hr;

    str += `  <tr class="rounded-start-pill">
        <th scope="col">${i + 1}</th>
        <td scope="col">${item.task}</td>
        <td scope="col">${item.hr}</td>
        <td scope="col" class="text-end">
          <button class="btn btn-danger" onclick = "handleOnDelete('${
            item.id
          }')">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="btn btn-success" onclick = "handleOnSwitch('${
            item.id
          }','bad')">
            <i class="fa-solid fa-right-long"></i>
          </button>
        </td>
      </tr>`;
  });
  taskElementList.innerHTML = str;
  hours.innerHTML = `Total hours  allocated per week = ${total}`;
};
const displayBad = () => {
  let str = "";
  //   let total = 0;

  const badlist = taskList.filter((item) => item.type === "bad");
  badlist.map((item, i) => {
    // total += item.hr;

    str += `  <tr class="rounded-start-pill">
          <th scope="col">${i + 1}</th>
          <td scope="col">${item.task}</td>
          <td scope="col">${item.hr}</td>
          <td scope="col" class="text-end">
          <button class="btn btn-warning" onclick = "handleOnSwitch('${
            item.id
          }','entry')">
          <i class="fa-solid fa-left-long"></i>
            </button>
            <button class="btn btn-danger" onclick = "handleOnDelete('${
              item.id
            }')">
              <i class="fa-solid fa-trash"></i>
            </button>
            
          </td>
        </tr>`;
  });
  badElementList.innerHTML = str;
  hours.innerHTML = `Total hours  allocated per week = ${total}`;
};

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure ")) {
    let demo = taskList.filter((item) => item.id === id);
    taskList = taskList.filter((item) => item.id !== id);
    // console.log(taskList);
    console.log(demo[0].hr);
    total = total - +demo[0].hr;
    // console.log(total);
    display();
    displayBad();
  }
};
const handleOnSwitch = (id, type) => {
  //   console.log("switch");
  if (window.confirm("Are you sure ")) {
    taskList.forEach((item) => {
      if (item.id == id) {
        item.type = type;
      }
    });
    display();
    displayBad();
  }
};
const charStr = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const ranStr = () => {
  let str = "";
  for (let i = 0; i < 6; i++) {
    str += charStr[Math.floor(Math.random() * charStr.length)];
  }
  return str;
};
