const getVideoList = () => {
  return fetch("http://localhost:8081/VideoList")
    .then((r) => r.json())
    .catch(console.dir);
};

const updateBoxArt = async (id, blob) => {
  const formData = new FormData(),
    file = new File([blob], `${id}.jpg`, {
      type: "image/jpg",
    });

  formData.append("file", file);

  try {
    const response = await fetch(`http://localhost:8081/boxart?id=${id}`, {
      method: "POST",
      body: formData,
    });
    return response;
  } catch (error) {
    console.dir(error);
    return "../thumbnail/default.jpg";
  }
};

export { getVideoList as default, updateBoxArt };
