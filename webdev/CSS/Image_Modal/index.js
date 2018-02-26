var modal = document.getElementById("myModal");
var img = document.getElementById("myImg");
var modalImg = document.getElementById("modalImg");
var caption = document.getElementById("caption");
var closeModal = document.getElementsByClassName("close")[0];

img.onclick = function() {
	modal.style.display = "block";
//	modal.style.left = "0";
	modalImg.src = this.src;
	caption.innerHTML = this.alt;
}

closeModal.onclick = function() {
	modal.style.display = "none";
//	modal.style.left = "-100%";
}