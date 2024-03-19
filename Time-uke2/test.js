let count = 0;
const plus = () => {
  document.querySelector(".num").innerHTML = count+= 1;
}
const minus = () => {
  document.querySelector(".num").innerHTML = count -= 1;
}

let showing = true
const showHideText = () => {
  if (showing) {
    document.getElementById("showHideText").style.visibility = "hidden";
  }
  else {
    document.getElementById("showHideText").style.visibility = "visible";
  }
  showing = !showing
}

const showArray = () => {
  let array = ["cat", "dog", "fish"]
  let rootElement = document.getElementById("arrayUl");

  for (i in array) {
    const arrayLi = document.createElement('li');
    arrayLi.textContent = array[i];
    rootElement.append(arrayLi);
    console.log(array[i]);
  }
}