let base_url = "http://localhost:8080/robot";
let photoInput = document.querySelector("#robot-img");
let nameInput = document.querySelector("#robot-name");
let textInput = document.querySelector("#robot-text");
let form = document.querySelector("form");

let id = new URLSearchParams(window.location.search).get("id");


  
if (id) {
    async function editItem(id) {
      let res = await axios(`${base_url}/${id}`);
      let data = await res.data;
      nameInput.value = data.name;
      textInput.value = data.text;
  
      
    }
    editItem(id)}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
      image: photoInput.value.split("\\")[2],
    name: nameInput.value,
    text: textInput.value,
  };

  if(id){
    axios.patch(`${base_url}/${id}`,obj)
    

  }
  else{
    axios.post(base_url,obj)
  }

 window.location="index.html"
});

 


