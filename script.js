

const birthdayMusic =
    document.getElementById(
        "birthdayMusic"
    );


const particlesContainer =
    document.querySelector(".particles");


const particleSymbols = [
    "♡",
    "✦",
    "✧",
    "⋆",
    "♥"
];


function createParticle() {

    const particle =
        document.createElement("span");

    particle.classList.add("particle");

    particle.textContent =
        particleSymbols[
        Math.floor(
            Math.random() *
            particleSymbols.length
        )
        ];

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.fontSize =
        (12 + Math.random() * 22) + "px";

    particle.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    particle.style.color =
        "#c75b82";

    particlesContainer.appendChild(
        particle
    );


    setTimeout(() => {

        particle.remove();

    }, 13000);
}




setInterval(
    createParticle,
    450
);




const openButton =
    document.getElementById(
        "openSurprise"
    );




const envelopeScreen =
    document.getElementById(
        "envelopeSection"
    );


openButton.addEventListener(
    "click",
    function () {
      

        birthdayMusic.volume = 0;

        birthdayMusic.play().then(() => {

            musicToggle.textContent = "🎵";

            musicToggle.classList.add(
                "playing"
            );

            let volume = 0;

            const fadeIn = setInterval(() => {

                volume += 0.02;

                if (volume >= 0.45) {

                    volume = 0.45;

                    clearInterval(
                        fadeIn
                    );
                }

                birthdayMusic.volume =
                    volume;

            }, 100);

        });

        birthdayMusic.play().catch(() => {

            console.log(
                "Music could not start automatically."
            );

        });

     

        document
            .querySelector(".opening-screen")
            .style.display = "none";


     

        envelopeScreen.style.display =
            "flex";


      

        document.body.style.overflow =
            "hidden";

    }
);


const musicToggle =
    document.getElementById(
        "musicToggle"
    );



musicToggle.addEventListener(
    "click",
    function () {

        if (
            birthdayMusic.paused
        ) {

            birthdayMusic.play().then(() => {

                musicToggle.textContent =
                    "🎵";

                musicToggle.classList.add(
                    "playing"
                );

                musicToggle.setAttribute(
                    "aria-label",
                    "Mute music"
                );

                musicToggle.setAttribute(
                    "title",
                    "Mute music"
                );

            }).catch(() => {

                console.log(
                    "Music could not be played."
                );

            });

        } else {

            birthdayMusic.pause();

            musicToggle.textContent =
                "🔇";

            musicToggle.classList.remove(
                "playing"
            );

            musicToggle.setAttribute(
                "aria-label",
                "Play music"
            );

            musicToggle.setAttribute(
                "title",
                "Play music"
            );

        }

    }
);




const envelope =
    document.getElementById(
        "envelope"
    );


function openEnvelope() {

   
    if (
        envelope.classList.contains(
            "open"
        )
    ) {

        return;

    }


    envelope.classList.add("open");


   

    const hint =
        document.querySelector(
            ".envelope-hint"
        );

    hint.textContent =
        "Something beautiful is waiting inside... 💗";



    setTimeout(() => {

        showChildhoodSection();

    }, 1600);

}


envelope.addEventListener(
    "click",
    openEnvelope
);




envelope.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openEnvelope();

        }

    }
);


const childhoodSection =
    document.getElementById(
        "childhoodSection"
    );

const childhoodPhoto =
    document.getElementById(
        "childhoodPhoto"
    );

const childhoodCaption =
    document.getElementById(
        "childhoodCaption"
    );

const memoryNumber =
    document.getElementById(
        "memoryNumber"
    );

const nextChildhood =
    document.getElementById(
        "nextChildhood"
    );




const childhoodPhotos = [

    "photos/childhood/child1.jpeg",

    "photos/childhood/child2.jpeg",

    "photos/childhood/child3.jpeg",

    "photos/childhood/child4.jpeg",

    "photos/childhood/child5.jpeg",

    "photos/childhood/child6.jpeg",

    "photos/childhood/child7.jpeg",

    "photos/childhood/child8.jpeg"

];




const childhoodCaptions = [

    "Where the beautiful story began... 🌸",

    "Look at this little cutie! 🥹",

    "A tiny girl with a big personality... 💗",

    "Some memories are simply priceless. ✨",

    "And that smile was always special... 🌷",

    "Growing up, one beautiful moment at a time. 💕",

    "Look how far you've come... 🥹",

    "And this was only the beginning. ❤️"

];


let childhoodIndex = 0;




function showChildhoodSection() {

    console.log("Opening childhood section...");

    if (!childhoodSection) {

        console.error(
            "ERROR: childhoodSection was not found."
        );

        return;
    }


   

    childhoodSection.style.display = "flex";

    childhoodSection.style.width = "100vw";

    childhoodSection.style.height = "100vh";


    

    document.body.style.overflow = "hidden";


    

    childhoodIndex = 0;

    loadChildhoodPhoto(0);
    startChildhoodSlideshow();
}



function loadChildhoodPhoto(index) {

   

    childhoodPhoto.classList.remove(
        "photo-visible"
    );

    childhoodPhoto.classList.remove(
        "photo-changing"
    );

    childhoodCaption.classList.remove(
        "caption-visible"
    );


   

    setTimeout(() => {

        childhoodPhoto.src =
            childhoodPhotos[index];

        childhoodCaption.textContent =
            childhoodCaptions[index];

        memoryNumber.textContent =
            index + 1;



        childhoodPhoto.classList.add(
            "photo-visible"
        );

        childhoodPhoto.classList.add(
            "photo-changing"
        );

        childhoodCaption.classList.add(
            "caption-visible"
        );

    }, 250);
}




const CHILDHOOD_DURATION = 3000;

let childhoodTimer = null;


function startChildhoodSlideshow() {

    clearTimeout(childhoodTimer);

    childhoodTimer = setTimeout(
        showNextChildhoodPhoto,
        CHILDHOOD_DURATION
    );
}


function showNextChildhoodPhoto() {

    childhoodIndex++;

  

    if (
        childhoodIndex >=
        childhoodPhotos.length
    ) {

        clearTimeout(
            childhoodTimer
        );

        console.log(
            "Childhood memories completed."
        );


       

        setTimeout(() => {

            showJourneySection();

        }, 2500);


        return;
    }


    loadChildhoodPhoto(
        childhoodIndex
    );


    startChildhoodSlideshow();
}


const journeySection =
    document.getElementById(
        "journeySection"
    );

const photoBoard =
    document.getElementById(
        "photoBoard"
    );

const journeyBoardNumber =
    document.getElementById(
        "journeyBoardNumber"
    );




const soloPhotos = [];

for (let i = 1; i <= 36; i++) {

    soloPhotos.push(
        `photos/single/single${i}.jpeg`
    );

}




const PHOTOS_PER_BOARD = 6;

const BOARD_DURATION = 5000;

let currentBoard = 0;

let journeyTimer = null;




const boardNames = [

    "board-1",

    "board-2",

    "board-3",

    "board-4",

    "board-5",

    "board-6"

];



function showJourneySection() {

    console.log(
        "Starting Her Journey..."
    );


    if (!journeySection) {

        console.error(
            "journeySection not found."
        );

        return;
    }


    childhoodSection.style.display =
        "none";


    journeySection.style.display =
        "flex";


    document.body.style.overflow =
        "hidden";


    currentBoard = 0;


    showJourneyBoard(
        currentBoard
    );


    startJourneyTimer();
}




function showJourneyBoard(boardIndex) {

    photoBoard.innerHTML = "";


    

    const start =
        boardIndex *
        PHOTOS_PER_BOARD;


    const end =
        start +
        PHOTOS_PER_BOARD;


    const photosForBoard =
        soloPhotos.slice(
            start,
            end
        );


   

    photoBoard.className =
        "photo-board " +
        boardNames[boardIndex];


    photoBoard.classList.add(
        "board-enter"
    );


    

    journeyBoardNumber.textContent =
        boardIndex + 1;


    

    photosForBoard.forEach(
        (photoPath, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                `journey-photo photo-${index + 1}`;


            

            const image =
                document.createElement(
                    "img"
                );

            image.src =
                photoPath;

            image.alt =
                `Birthday memory ${start + index + 1}`;



            card.appendChild(
                image
            );


            

            if (
                boardIndex === 0 ||
                boardIndex === 1
            ) {

                const pin =
                    document.createElement(
                        "span"
                    );

                pin.className =
                    "photo-pin";

                card.appendChild(
                    pin
                );

            }


            

            if (
                boardIndex === 1
            ) {

                const string =
                    document.createElement(
                        "span"
                    );

                string.className =
                    "photo-string";

                card.appendChild(
                    string
                );

            }


            photoBoard.appendChild(
                card
            );

        }
    );


   

    setTimeout(() => {

        photoBoard.classList.remove(
            "board-enter"
        );

    }, 900);

}




function startJourneyTimer() {

    clearTimeout(
        journeyTimer
    );


    journeyTimer =
        setTimeout(
            showNextJourneyBoard,
            BOARD_DURATION
        );
}



function showNextJourneyBoard() {

    currentBoard++;


   
    if (
        currentBoard >=
        boardNames.length
    ) {

        clearTimeout(
            journeyTimer
        );

        console.log(
            "Her Journey completed."
        );


       

        setTimeout(() => {

            showTogetherSection();

        }, 2500);


        return;
    }


    showJourneyBoard(
        currentBoard
    );


    startJourneyTimer();

}


const togetherSection =
    document.getElementById(
        "togetherSection"
    );

const togetherBoard =
    document.getElementById(
        "togetherBoard"
    );

const togetherBoardNumber =
    document.getElementById(
        "togetherBoardNumber"
    );




const togetherPhotos = [];

for (let i = 1; i <= 16; i++) {

    togetherPhotos.push(
        `photos/together/pol${i}.jpeg`
    );

}




const TOGETHER_BOARD_DURATION = 5000;

let currentTogetherBoard = 0;

let togetherTimer = null;




function showTogetherSection() {

    clearTimeout(
        togetherTimer
    );

    journeySection.style.display =
        "none";

    togetherSection.style.display =
        "flex";

    document.body.style.overflow =
        "hidden";

    currentTogetherBoard = 0;

    showTogetherBoard(0);

    startTogetherTimer();
}



function showTogetherBoard(boardIndex) {

    togetherBoard.innerHTML = "";


    

    if (boardIndex < 3) {

        const start =
            boardIndex * 5;

        const photos =
            togetherPhotos.slice(
                start,
                start + 5
            );


        if (boardIndex === 0) {

            togetherBoard.className =
                "together-board board-film";

        }

        else if (boardIndex === 1) {

            togetherBoard.className =
                "together-board board-scrapbook";

        }

        else {

            togetherBoard.className =
                "together-board board-floating";

        }


        photos.forEach(
            (photoPath, index) => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "together-photo";


                const image =
                    document.createElement(
                        "img"
                    );

                image.src =
                    photoPath;

                image.alt =
                    `Together memory ${start + index + 1}`;


                card.appendChild(
                    image
                );


                togetherBoard.appendChild(
                    card
                );

            }
        );

    }

    else {

       

        togetherBoard.className =
            "together-board board-special";


        const special =
            document.createElement(
                "div"
            );

        special.className =
            "special-memory";


        const image =
            document.createElement(
                "img"
            );

        image.src =
            "photos/together/pol16.jpeg";

        image.alt =
            "Our special memory";


        special.appendChild(
            image
        );


        togetherBoard.appendChild(
            special
        );

    }


    togetherBoardNumber.textContent =
        boardIndex + 1;
}



function startTogetherTimer() {

    clearTimeout(
        togetherTimer
    );


    togetherTimer =
        setTimeout(
            showNextTogetherBoard,
            TOGETHER_BOARD_DURATION
        );
}



function showNextTogetherBoard() {

    currentTogetherBoard++;



    if (
        currentTogetherBoard >= 4
    ) {

        clearTimeout(
            togetherTimer
        );

        console.log(
            "Together memories completed."
        );


       

        setTimeout(() => {

            showFinalSection();

        }, 4000);


        return;
    }


    showTogetherBoard(
        currentTogetherBoard
    );


    startTogetherTimer();
}


const finalSection =
    document.getElementById(
        "finalSection"
    );

const sisterName =
    document.getElementById(
        "sisterName"
    );

const finalReplay =
    document.getElementById(
        "finalReplay"
    );




const SISTER_NAME =
    "KAMALI";


sisterName.textContent =
    SISTER_NAME;




function showFinalSection() {

    console.log(
        "Starting final birthday reveal..."
    );


    togetherSection.style.display =
        "none";


    finalSection.style.display =
        "flex";


    document.body.style.overflow =
        "auto";


    

    const finalContent =
        document.querySelector(
            ".final-content"
        );


    finalContent.style.animation =
        "none";



    void finalContent.offsetWidth;


    console.log(
        "Final birthday surprise ready!"
    );


}




document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "#lastSurpriseButton"
            );

        if (!button) {
            return;
        }

        console.log(
            "Starting final celebration..."
        );

        startCelebration();

    }
);


const celebration =
    document.getElementById(
        "celebration"
    );

const celebrationName =
    document.getElementById(
        "celebrationName"
    );

const confettiContainer =
    document.getElementById(
        "confettiContainer"
    );




celebrationName.textContent =
    `❤️ ${SISTER_NAME} ❤️`;




function startCelebration() {

    console.log(
        "Starting final celebration..."
    );


    celebration.style.display =
        "flex";


    confettiContainer.innerHTML =
        "";


    createConfetti();


   

    if (
        birthdayMusic.paused
    ) {

        birthdayMusic.play().catch(() => { });

    }

}




function createConfetti() {

    const pieces = 90;


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "confetti";


        

        piece.style.left =
            Math.random() * 100 + "%";


        

        piece.style.setProperty(
            "--fall-time",
            (3 + Math.random() * 4) + "s"
        );


        

        piece.style.setProperty(
            "--drift",
            (-120 + Math.random() * 240) + "px"
        );


        

        piece.style.animationDelay =
            Math.random() * 2 + "s";


        

        piece.style.width =
            (5 + Math.random() * 7) + "px";

        piece.style.height =
            (8 + Math.random() * 10) + "px";


        confettiContainer.appendChild(
            piece
        );

    }

}


const lastSurpriseButton =
    document.getElementById(
        "lastSurpriseButton"
    );


lastSurpriseButton.addEventListener(
    "click",
    function () {

        startCelebration();

    }
);


const revisitButton =
    document.getElementById(
        "revisitButton"
    );




function resetAllMemorySections() {

    console.log("Resetting all memory sections...");



    clearTimeout(childhoodTimer);
    clearTimeout(journeyTimer);
    clearTimeout(togetherTimer);


    

    const openingScreen =
        document.querySelector(
            ".opening-screen"
        );

    if (openingScreen) {
        openingScreen.style.display = "none";
    }


    envelopeScreen.style.display = "none";

    childhoodSection.style.display = "none";

    journeySection.style.display = "none";

    togetherSection.style.display = "none";

    finalSection.style.display = "none";

    celebration.style.display = "none";

    goodbyeSection.style.display = "none";


    

    childhoodIndex = 0;

    currentBoard = 0;

    currentTogetherBoard = 0;


    

    togetherBoard.innerHTML = "";


    

    document.body.style.overflow =
        "hidden";


    console.log(
        "All sections successfully reset."
    );
}


document.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }


    

    if (button.id === "revisitButton") {

        console.log("Revisit Memories clicked.");

        

        if (typeof childhoodTimer !== "undefined") {
            clearTimeout(childhoodTimer);
            clearInterval(childhoodTimer);
        }

        if (typeof journeyTimer !== "undefined") {
            clearTimeout(journeyTimer);
            clearInterval(journeyTimer);
        }

        if (typeof togetherTimer !== "undefined") {
            clearTimeout(togetherTimer);
            clearInterval(togetherTimer);
        }


        

        const celebration =
            document.getElementById("celebration");

        const finalSection =
            document.getElementById("finalSection");

        const goodbyeSection =
            document.getElementById("goodbyeSection");

        if (celebration) {
            celebration.style.display = "none";
        }

        if (finalSection) {
            finalSection.style.display = "none";
        }

        if (goodbyeSection) {
            goodbyeSection.style.display = "none";
        }


        

        const childhoodSection =
            document.getElementById("childhoodSection");

        if (childhoodSection) {

            childhoodSection.style.display = "flex";

            childhoodSection.style.opacity = "1";
            childhoodSection.style.visibility = "visible";
        }



        childhoodIndex = 0;


        

        if (typeof loadChildhoodPhoto === "function") {
            loadChildhoodPhoto(0);
        }


        

        if (
            typeof startChildhoodSlideshow ===
            "function"
        ) {
            startChildhoodSlideshow();
        }


        console.log(
            "Childhood memories restarted."
        );

        return;
    }



    if (button.id === "exitButton") {

        console.log("Exit Surprise clicked.");



        if (typeof childhoodTimer !== "undefined") {
            clearTimeout(childhoodTimer);
            clearInterval(childhoodTimer);
        }

        if (typeof journeyTimer !== "undefined") {
            clearTimeout(journeyTimer);
            clearInterval(journeyTimer);
        }

        if (typeof togetherTimer !== "undefined") {
            clearTimeout(togetherTimer);
            clearInterval(togetherTimer);
        }


      

        const celebration =
            document.getElementById("celebration");

        if (celebration) {
            celebration.style.display = "none";
        }


        

        const finalSection =
            document.getElementById("finalSection");

        if (finalSection) {
            finalSection.style.display = "none";
        }


       

        const goodbyeSection =
            document.getElementById("goodbyeSection");

        if (goodbyeSection) {

            goodbyeSection.style.display = "flex";

            goodbyeSection.style.opacity = "1";
            goodbyeSection.style.visibility =
                "visible";
        }


        console.log(
            "Goodbye screen displayed."
        );

        return;
    }



    if (button.id === "goodbyeReplay") {

        console.log("See It Again clicked.");


      

        if (typeof childhoodTimer !== "undefined") {
            clearTimeout(childhoodTimer);
            clearInterval(childhoodTimer);
        }

        if (typeof journeyTimer !== "undefined") {
            clearTimeout(journeyTimer);
            clearInterval(journeyTimer);
        }

        if (typeof togetherTimer !== "undefined") {
            clearTimeout(togetherTimer);
            clearInterval(togetherTimer);
        }


        

        const goodbyeSection =
            document.getElementById("goodbyeSection");

        if (goodbyeSection) {
            goodbyeSection.style.display = "none";
        }


        

        const finalSection =
            document.getElementById("finalSection");

        if (finalSection) {
            finalSection.style.display = "none";
        }


        

        const celebration =
            document.getElementById("celebration");

        if (celebration) {
            celebration.style.display = "none";
        }


       

        const childhoodSection =
            document.getElementById("childhoodSection");

        if (childhoodSection) {

            childhoodSection.style.display = "flex";

            childhoodSection.style.opacity = "1";
            childhoodSection.style.visibility = "visible";
        }


        

        childhoodIndex = 0;



        if (typeof loadChildhoodPhoto === "function") {
            loadChildhoodPhoto(0);
        }


        

        if (
            typeof startChildhoodSlideshow ===
            "function"
        ) {
            startChildhoodSlideshow();
        }


        console.log(
            "Replay started from childhood."
        );

    }

});