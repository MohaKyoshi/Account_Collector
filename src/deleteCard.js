function DeleteFunc() {
    const deleteBtns = document.querySelectorAll('.deleteBtn');

    deleteBtns.forEach(el => {
        el.addEventListener('click', event => {
            const target = event.target.parentElement.parentElement;
            target.remove();
        });
    });
}


export default DeleteFunc;