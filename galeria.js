const image = document.querySelectorAll(".image");


for (let[i, imageselected] of image.entries()){
    imageselected.addEventListener("click", function focus(){
        resetfocus();
        imageselected.classList.toggle("active")
    })

    function resetfocus(){
        image.forEach ( i=> i.classList.remove ("active"))
    }

    
}