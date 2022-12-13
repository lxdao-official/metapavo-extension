function getFloorPrice() {
  try {
    const parentNode = Array.from(document.querySelectorAll("form span")).filter(
      (e) => e.innerHTML == "Floor price",
    )[0].parentNode.parentNode;
    console.log(parentNode);
    const weth = parentNode.childNodes[1].lastChild.innerHTML.replace(" ETH", "") * 1;

    console.log("Floor price", weth);
    return weth;
  } catch (e) {
    console.log("Floor price not found");
    return 0;
  }
}

setInterval(() => {
  const input = document.querySelector('input[name="pricePerUnit"]');
  if (input && !input.getAttribute("binded")) {
    const warningEle = document.createElement("div");
    warningEle.style.color = "red";
    warningEle.style.fontSize = "14px";
    warningEle.style.marginTop = "5px";
    warningEle.innerHTML = "Warning: 价格高于底价";
    input.addEventListener("input", (e) => {
      const price = e.target.value * 1;
      const floorPrice = getFloorPrice();
      if (floorPrice && price > floorPrice) {
        console.log("error", price, floorPrice);
        input.parentNode.parentNode.style.border = "3px solid rgb(235, 87, 87)";
        input.parentNode.parentNode.style.borderRadius = "15px";
        document
          .querySelector('[aria-describedby="pricePerUnit"]')
          .parentNode.parentNode.appendChild(warningEle);
      } else {
        console.log("success", price, floorPrice);
        input.parentNode.parentNode.style.border = "none";
        input.parentNode.parentNode.style.borderRadius = "0px";
        document
          .querySelector('[aria-describedby="pricePerUnit"]')
          .parentNode.parentNode.removeChild(warningEle);
        // document.querySelector('[aria-describedby="pricePerUnit"]').innerHTML =
        //   "warning: 价格高于底价";
      }
    });
    input.setAttribute("binded", true);
  }
}, 1000);
