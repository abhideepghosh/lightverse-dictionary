import words from "./words";
const search = document.getElementById("searchBox");
const listHolder = document.querySelector("ul");
const container = document.querySelector(".container");
let timer;
search.addEventListener("keyup", () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    document.querySelector("dl")?.remove();
    listHolder.innerHTML = "";
    const val = search.value.toLowerCase();
    // console.log("debouncing")
    if (val.length > 0) {
      let result = words
        .filter((ele) => {
          return ele.startsWith(val);
        })
        .splice(0, 5);

      for (let i = 0; i < result.length; i++) {
        const list = document.createElement("li");
        list.className = "box";
        list.innerHTML = result[i];
        listHolder.appendChild(list);
      }

      if(result.length==0){
        const message = document.createElement("h1");
        message.className="box";
        message.innerText = "NO WORDS FOUND !!";
        listHolder.appendChild(message);
      }

    }
  }, 1000);
});

listHolder.addEventListener("click", async (e) => {
  const selected = e.target.innerHTML;

  const response = await getMeaning(selected);
  console.log(response);
  listHolder.innerHTML = "";

  const dl = document.createElement("dl");
  dl.classList.add("boxResult");
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  
  dt.innerHTML = `<b><em>${response[0].word}</em></b>`;
  // dd.innerHTML = `<br>${response[0].meanings[0].definitions[0].definition}`;
  dd.innerHTML = response[0].meanings[0].definitions[0].definition;

  dl.appendChild(dt);
  dl.appendChild(dd);
  container.appendChild(dl);

  if(response[0].phonetics[0].audio!==''){
  //   const audio = document.createElement("audio");
  // const source = document.createElement("source");
  // audio.setAttribute("controls",true);
  // source.setAttribute("src",`${response[0].phonetics[0].audio}`);
  // audio.appendChild(source);
  // dl.appendChild(audio);

  const img = document.createElement("img");
  dl.appendChild(img);
  img.setAttribute("src",`https://icon-library.com/images/play-icon-transparent-background/play-icon-transparent-background-22.jpg`);
  img.className="playBtn"
  img.addEventListener("click", () => {
   const audio = new Audio(response[0].phonetics[0].audio);
    audio.play();
  });

  }

  

  
  
});

const getMeaning = async (meanWord) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${meanWord}`
    );
    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
