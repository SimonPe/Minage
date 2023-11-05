function handleImageClick() {
    const randomImage = getRandomImage();
    document.getElementById("image").src = randomImage;

    clickCount++;

    if (clickCount >= 5) {
        document.getElementById("image").style.display = "none";
        setTimeout(() => {
            document.getElementById("image").style.display = "block";
        }, 500);
        clickCount = 0;
    } else {
        document.getElementById("image").classList.add("shake");
        
        setTimeout(() => {
            document.getElementById("image").classList.remove("shake");
        }, 500);
    }
}