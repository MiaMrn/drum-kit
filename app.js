const container = document.querySelector(".container");

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
            container.appendChild(divElt);
        }
    });

window.addEventListener("keydown", function (e) {
    const key = e.key.toUpperCase();
    const divs = document.querySelectorAll(".key");
    divs.forEach(div => {
        if (div.dataset.lettre === key) {
            div.classList.add("pressed");
            const audio = div.querySelector("audio");
            audio.currentTime = 0;
            audio.play();
        }
    })
    setTimeout(function () {
        document.querySelector(".pressed").classList.remove("pressed");
    }, 70);
})