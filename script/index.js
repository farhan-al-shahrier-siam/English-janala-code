const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // gives promise of response
        .then((res) => res.json()) // Promise of json data
        .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
    console.log(words);
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    for (let word of words) {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-16 px-5 space-y-4">
                <h2 class="text-2xl font-bold">${word.word}</h2>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <div class="text-xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
                <div class="flex justify-between items-center">
                    <button class="btn rounded-full"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn rounded-full"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;
        wordContainer.appendChild(wordDiv)
    }
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-outline"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        levelContainer.appendChild(btnDiv);
    }
};
loadLessons();
