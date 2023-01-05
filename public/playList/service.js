const getVideoList = () => {
 return fetch("http://localhost:8081/VideoList")
   .then((r) => r.json())
   .catch(console.dir);
};

export { getVideoList as default };
