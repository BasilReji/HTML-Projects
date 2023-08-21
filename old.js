// window.addEventListener("load", () => {
//   let searchModal = document.getElementById("search-form-modal");
//   for (
//     var i = 0, atts = searchModal.attributes, n = atts.length, arr = [];
//     i < n;
//     i++
//   ) {
//     arr.push(atts[i].nodeName);
//   }

//   var nodes = [],
//     values = [];

//   for (
//     var att, i = 0, atts = searchModal.attributes, n = atts.length;
//     i < n;
//     i++
//   ) {
//     att = atts[i];
//     nodes.push(att.nodeName);
//     values.push(att.nodeValue);
//   }

//   let findIndex = nodes.findIndex((item) => item === "hidden");

//   if (findIndex >= 0) {
//     console.log("checking this thing works!!!");
//     document.getElementById("views-exposed-form-acquia-search-page").reset();
//   }
// });
