import words from "./words";
const search = document.getElementById("searchBox");
const listHolder = document.querySelector(".team");

const getMeaning = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

search.addEventListener("keyup", async () => {
  document.querySelector("ul")?.remove();
  const val = search.value;
  let results = words.filter((word) => word.startsWith(val)).splice(0, 2);
  if (val.length === 0) results = [];
  if (results.length > 0) {
    const list = document.createElement("ul");
    document
      .querySelector(".container")
      .insertAdjacentElement("beforeend", list);
    const markup = results
      .map((word) => {
        return `

        <a class="box">${word}</a>
      
      
      `;
      })
      .join("");
    list.innerHTML = markup;
  }
});
