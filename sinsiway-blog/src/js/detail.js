const checkBoxContainer = document.querySelector('.comment-form > .check-box')
const checkBox = checkBoxContainer.querySelector('label');


checkBox.addEventListener('click', function (ev) {
    checkBoxContainer.classList.toggle('checked');
})