fetch("keys.json")
    .then(reponse => {
        return reponse.json();
    })
    .then(data => {
        for (let item in data) {
            item = data[item];

            const titleElt = document.createElement("h2");
            titleElt.textContent = item.title;
            titleElt.classList.add("title");

            const nameElt = document.createElement("p");
            nameElt.textContent = item.name;
            nameElt.classList.add("name");

            const audioElt = document.createElement('audio');
            audioElt.id = item.name;
            audioElt.src = item.sound;
            audioElt.type = 'audio/mpeg';

            const divElt = document.createElement("div");
            divElt.classList.add("key");
            divElt.dataset.lettre = item.title;
            divElt.appendChild(titleElt);
            divElt.appendChild(nameElt);
            divElt.appendChild(audioElt);
            document.querySelector(".container").appendChild(divElt);
        }
    });

window.addEventListener("keydown", playSound);

function playSound(e) {
    const keyCode = e.key.toUpperCase();
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        if (key.dataset.lettre === keyCode) {
            key.classList.add("pressed");
            const audio = key.querySelector("audio");
            audio.currentTime = 0;
            audio.play();
        }
        key.addEventListener("transitionend", function () {
            this.classList.remove("pressed");
        });
    })
}