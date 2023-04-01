const getVideoList = async () => {
  try {
    const response = await fetch("http://localhost:8081/VideoList"),
      json = await response.json();

    return json ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const updateBoxArt = async (id, file) => {
  const formData = new FormData();

  formData.append("file", file);

  try {
    const response = await fetch(`http://localhost:8081/boxart?id=${id}`, {
      method: "POST",
      body: formData,
    });

    return await response.text();
  } catch (error) {
    console.dir(error);
    return "../thumbnail/default.jpg";
  }
};

export { getVideoList as default, updateBoxArt };
