import words from "./words";
const search = document.getElementById("searchBox");
const listHolder = document.querySelector("ul");
const container = document.querySelector(".container")
search.addEventListener("keyup",()=>{
  listHolder.innerHTML="";
  // document.getElementsByTagName("dl").innerHTML=" "
  const val = search.value;
  let result = words.filter((ele)=>{
    return val.startsWith(ele);
   
  }).splice(0,5);
  
  for(let i=0;i<result.length;i++){
    const list = document.createElement("li");
    list.className ="box"
    list.innerHTML = result[i];
    listHolder.appendChild(list);
  }
})

listHolder.addEventListener("click", async (e)=>{
    const selected = e.target.innerHTML;
    const response = await getMeaning(selected);
    listHolder.innerHTML="";
    
    const dl = document.createElement("dl");
    const dt = document.createElement("dt");
    const dd  = document.createElement("dd");
    dt.innerText = response[0].word;
    dd.innerText = response[0].meanings[1].definitions[0].definition;
   
    dl.appendChild(dt);
    dl.appendChild(dd);
    container.appendChild(dl);

})

const getMeaning =async (meanWord)=>{
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${meanWord}`);
    const data = response.json();
    return data;

}








































// const getMeaning = async (word) => {
//   try {
//     const response = await fetch(
//       `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
//     );
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// search.addEventListener("keyup",  () => {
//   document.querySelector("ul")?.remove();
//   const val = search.value;
//   let results = words.filter((word) => word.startsWith(val)).splice(0, 2);
//   if (val.length === 0) results = [];
//   if (results.length > 0) {
//     const list = document.createElement("ul");
//     document
//       .querySelector(".container")
//       .insertAdjacentElement("beforeend", list);
//     const markup = results
//       .map((word) => {
//         return `<a class="box">${word}</a>`;
//       })
//       .join("");
//     list.innerHTML = markup;
//   }
// });


// const unordered = document.querySelector("ul");

// unordered.addEventListener("click",async(e)=>{
//   const selected = e.target.innerHTML;
// const response = await getMeaning(selected);
// console.log(selected);
// })

// const fun = async ()=>{
//     const res = await getMeaning("hello");
//     console.log(res);
// }
// fun();



