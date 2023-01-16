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
  const val = search.value;
  const results = words.filter((word) => word.includes(val)).splice(0, 5);
  console.log(results);

  const result = await getMeaning("hello");
  console.log(result);
});
