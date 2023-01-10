const addForm = document.getElementById("fAdd"),
  bulkForm = document.getElementById("fBulk"),
  list = document.getElementById("fList");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { target } = e,
    values = Array.from(target).map(({ name, value }) => ({ name, value })),
    params = {};

  values
    .filter((v) => v.name)
    .forEach((v) => {
      params[v.name] = v.value;
    });

  const endpoint = params.id ? "UpdateItem" : "AddItem";

  fetch(`http://localhost:8081/Admin/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .catch(console.error)
    .then((response) => response.json())
    .then((json) => console.log(json));
});

bulkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { target } = e,
    [textArea] = target;

  try {
    const params = JSON.parse(textArea?.value.replace("\n", ""));
    if (!Array.isArray(params)) {
      console.error("Value is not an array");
      return;
    }

    fetch("http://localhost:8081/Admin/AddList", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .catch(console.error)
      .then((response) => response.json())
      .then((json) => console.log(json));
  } catch (error) {
    console.error(error);
  }
});

fetch("http://localhost:8081/Admin/GetPlaylist")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => {
      const div = document.createElement("div");
      div.innerHTML = r.path;
      list.appendChild(div);
      div.addEventListener("click", () => {
        const inputs = Array.from(addForm);

        inputs
          .filter((f) => f.name)
          .forEach((input) => {
            input.value = r[input.name];
          });
      });
    });
  });
