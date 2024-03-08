function loadFunc() {
    const loadingSection = document.createElement('div');
    loadingSection.classList.add('loadingScreen');
    document.body.appendChild(loadingSection);

    const text = document.createElement('p');
    loadingSection.appendChild(text);

    text.style.color = '#ffffff';

    text.innerText = 'Loading, Please wait...';
}

export default loadFunc