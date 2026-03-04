const createElements = (arr) => {
    const htmlElement = arr.map((el) => `<span class="bg-[#D7E4EF] px-3 py-2 rounded">${el}</span>`);
    return htmlElement.join(" ");
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // gives promise of response
        .then((res) => res.json()) // Promise of json data
        .then((json) => displayLessons(json.data));
};

const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(data.data);
        });
};

const displayLevelWord = (words) => {
    // console.log(words);
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full text-center space-y-6 font-bangla p-10">
                <img class="mx-auto" src="./assets/alert-error.png"
                <p class="text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="font-bold text-4xl">নেক্সট Lesson এ যান</p>
            </div>
        `;
        return;
    }
    for (let word of words) {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-16 px-5 space-y-4">
                <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <div class="text-xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetails(${word.id})" class="btn rounded-full"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn rounded-full"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;
        wordContainer.appendChild(wordDiv);
    }
};

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
                
                    <div>
                        <h1 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h1>
                    </div>
                    <div>
                        <h1 class="text-xl font-bold">Meaning</h1>
                        <p class="pt-2">${word.meaning}</p>
                    </div>
                    <div>
                        <h1 class="text-xl font-bold">Example</h1>
                        <p class="pt-2">${word.sentence}</p>
                    </div>
                    <div>
                        <h1 class="text-xl font-bold">সমর্থক শব্দ গুলো</h1>
                        <div class="pt-3">
                            ${createElements(word.synonyms)}
                        </div>
                    </div>
    `;
    document.getElementById("word_modal").showModal();
};

const displayLessons = (lessons) => {
    // 1.get the container and empty it
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2. get into every lessons
    for (let lesson of lessons) {
        // 3. create elements
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-outline lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        levelContainer.appendChild(btnDiv);
    }
};
loadLessons();
