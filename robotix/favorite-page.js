let row = document.querySelector(".favorite-row");

let allFAvDAta = JSON.parse(localStorage.getItem("favData"));

async function getAllFavData() {
  row.innerHTML = "";
  allFAvDAta.forEach((element) => {
    row.innerHTML += `
     
    <div class="col col-4">
    <h1>${element.name}</h1>

    <p>${element.text}</p>

    <p>this robot maded in ...</p>
    <p>this price  is ${element.id} $</p>
    <p>this type is kitchen robot ..</p>
    <a class="btn btn-danger" onclick=deleteFavItem(${element.id})>DELETE</a>

  </div>
        `
        ;
  });
}
getAllFavData();

async function deleteFavItem(id) {
  allFAvDAta = allFAvDAta.filter((item) => item.id != id);
  localStorage.setItem("favData", JSON.stringify(allFAvDAta));
  getAllFavData();
}

let favBtn=document.querySelector(".fav")

favBtn.addEventListener("click",function(){
  window.location="index.html"
})