const textArea = document.getElementById('text');

const totalEl = document.getElementById('total');

const remEl = document.getElementById('rem');


textArea.addEventListener("keyup", () => {
    updateCounter();
})

updateCounter();

function updateCounter() {
    totalEl.innerText = textArea.value.length;

    remEl.innerText = textArea.getAttribute('maxlength') - textArea.value.length;


}