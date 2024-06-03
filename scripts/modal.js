document.getElementById("open-modal-btn").addEventListener("click",function(){
    document.getElementById("my-modal").classList.add("open")
})

document.getElementById("close-my-modal-btn").addEventListener("click",function(){
    document.getElementById("my-modal").classList.remove("open")
})

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("my-modal").classList.remove("open")
    }
});

document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("my-modal").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});



// БАНКОВСКАЯ КАРТА
let input = document.querySelector("#bank-card-number"),
            numbers = /[0-9]/,
            regExp = /[0-9]{4}/

    // добавляем слушатель события на инпут
input.addEventListener("input",(ev)=>{
    // не позволяем ввести ничего, кроме цифр 0-9, ограничиваем размер поля 19-ю символами
    if( ev.inputType === "insertText" && !numbers.test(ev.data) || input.value.length > 19){
        input.value = input.value.slice(0, input.value.length - 1)
        return
    }

    // обеспечиваем работу клавиш "backspace","delete"
    let value = input.value
    if( ev.inputType === "deleteContentBackward" && regExp.test(value.slice(-4)) ){
        input.value = input.value.slice(0, input.value.length - 1)
        return
    }

    // добавяем пробел после 4 цифр подряд
    if( regExp.test(value.slice(-4)) && value.length < 19){
        input.value += " "
    }
})


const date = document.getElementById('date');

date.addEventListener('input', function(e) {
    this.value = dateAutoFormat();
});


function dateAutoFormat() {
    let dateValue = date.value;
    // if white space -> change to ''. If is not a number between 0-9 -> change to ''
    let v = dateValue.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    // min of 2 digits and max of 4
    let matches = v.match(/\d{2,4}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (i = 0; i < match.length; i += 2) {
        // after 4 digits add a new element to the Array
        // e.g. "4510023" -> [4510, 023]
        parts.push(match.substring(i, i + 2));
    }

    if (parts.length) {
        // add a white space after 4 digits
        return parts.join('/');
    } else {
        return dateValue;
    }
};


const counter = document.querySelector(".counter");

let count = parseInt(localStorage.getItem("count") || 0);

counter.textContent = count;

document.querySelector(".clicker").addEventListener("click", event => {

if (event.target.closest(".next")) {  
    localStorage.setItem("count", ++count);
    
    counter.textContent = localStorage.getItem("count");
}
}, false);