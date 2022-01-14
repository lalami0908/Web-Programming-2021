var imageUrl = ["https://live.staticflickr.com/65535/50411829811_d711ed9984_b.jpg",
				"https://live.staticflickr.com/65535/50411130918_1b4a8d598f_b.jpg",
				"https://live.staticflickr.com/65535/50411983602_99af180573_b.jpg",
				"https://live.staticflickr.com/65535/50411983532_f7b9e77966_b.jpg",
				"https://live.staticflickr.com/65535/50411130813_27e8d0feab_b.jpg",
				"https://live.staticflickr.com/65535/50411829681_26569141b8_b.jpg",
				"https://live.staticflickr.com/65535/50411130773_5f568dd89c_b.jpg",
				"https://live.staticflickr.com/65535/50411983427_8fa7db89ed_b.jpg",
				"https://live.staticflickr.com/65535/50411983377_029dabdd79_o.jpg",
				"https://live.staticflickr.com/65535/50411983327_cdcd949e8f_b.jpg"]
var imageCnt = 0;

function init(){
	let previousButton = document.getElementsByClassName("image-viewer__button")[0];

	// showLoading();
	previousButton.classList.add("disabled");
	changeImage(0);
}

function previousImage() {
	let previousButton = document.getElementsByClassName("image-viewer__button")[0];
	let nextButton = document.getElementsByClassName("image-viewer__button")[1];

	if(imageCnt != 0){
		imageCnt -= 1;
		// showLoading();
		nextButton.classList.remove("disabled");
		if(imageCnt == 0){
			previousButton.classList.add("disabled");
		} else {
			previousButton.classList.remove("disabled");
		}
		document.getElementById("display").src = "";
		changeImage(imageCnt);
	}
}

function nextImages() {
	let previousButton = document.getElementsByClassName("image-viewer__button")[0];
	let nextButton = document.getElementsByClassName("image-viewer__button")[1];
	
	if(imageCnt != imageUrl.length - 1){
		imageCnt += 1;
		// showLoading();
		previousButton.classList.remove("disabled");
		if(imageCnt == imageUrl.length - 1){
			nextButton.classList.add("disabled");
		} else {
			nextButton.classList.remove("disabled");
		}
		document.getElementById("display").src = "";
		setTimeout(changeImage(imageCnt), 3000);
		//changeImage(imageCnt);
	}
}

function changeImage(imageCnt) {
	document.getElementById("display").src = imageUrl[imageCnt]; 
	document.getElementById("source").href = imageUrl[imageCnt];
	document.getElementById("source").innerHTML = imageUrl[imageCnt];
}

function showLoading() {
	document.getElementById("loading").style.display = "block";
	document.getElementById("display").style.display = "none";
	setTimeout("hideLoading()", 300); 
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("display").style.display = "block";
}