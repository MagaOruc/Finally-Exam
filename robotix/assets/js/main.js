let base_url = "http://localhost:8080/robot";
let row = document.querySelector(".robots-card");

let filtered = [];
let allData = [];
let num = 4;

async function getAllData() {
  let res = await axios(base_url);
  let data = await res.data;

  allData = data;
  filtered = filtered.length  || search.value != "" ? filtered.slice(0, num) : data.slice(0, num);

  row.innerHTML = "";
  filtered.forEach((element) => {
    row.innerHTML += `
    <div class="col col-3 my-3">
            <div class="content">
              <img src="./assets/image/${element.image}" alt="" />
              <h3>${element.name}e</h3>
              <p>${element.text}</p>
              <p>${element.id}</p>
              <div class="buttons">
              <button class="btn btn-danger" onclick=deleteItem(${element.id})>Delete</button>
              <button class="btn btn-info">Details</button>
              <a href="add-edit.html?id=${element.id}" class="btn btn-success m">EDIT</a>
                <a class="btn btn-primary" onclick=favoriteItem(${element.id})>Add fav</a>
              </div>
            </div>
          </div>
    `;
  });
}
getAllData();

async function deleteItem(id) {
    await axios.delete(`${base_url}/${id}`);
    // filtered.filter((item) => item.id != id);
    getAllData();
  }

  let favData = JSON.parse(localStorage.getItem("favData")) || [];

  async function favoriteItem(id) {
    let res = await axios(`${base_url}/${id}`);
    let data = await res.data;
  
    let available = favData.find((item) => item.id == id);
    if (!available) {
      favData.push(data);
      localStorage.setItem("favData", JSON.stringify(favData));
    } else {
      alert("already added favorite page");
    }
  }
 let search=document.querySelector("#search")
  search.addEventListener("input", function (e) {
    filtered = allData.filter((item) => {
      return item.name
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });
    getAllData();
  });

  let sort= document.querySelector(".sort-btn")
  sort.addEventListener("click", function () {
    if (sort.innerHTML == "sort") {
      filtered.sort((a, b) => a.id - b.id);
      sort.innerHTML = "asc";
      getAllData();
    } else if (sort.innerHTML == "asc") {
      filtered.sort((a, b) => b.id - a.id);
      sort.innerHTML = "dsc";
      getAllData();
    } else {
      getAllData();
  
      sort.innerHTML = "sort";
    }
  });
  
  let loadButton=document.querySelector(".load-more")

  loadButton.addEventListener("click", function () {
    num = num + 3;
    // console.log(num);
  
    filtered = allData;
    getAllData();
  });