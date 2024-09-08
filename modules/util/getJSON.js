module.exports = function getData(fileName, endFunction, localData) {
  let data;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", fileName, true);
  xhr.responseType = "text";
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText);
      endFunction(data, localData);
    } else {
      console.error(
        "json data could not be loaded",
        "XMLHttp Request status: " + xhr.status
      );
      return null;
    }
  };
};
