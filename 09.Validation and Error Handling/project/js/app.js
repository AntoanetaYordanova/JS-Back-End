document.querySelector('.cube-list').addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.classList.contains('more')) {
        const desc = target.parentNode.querySelector('.cube-description');
        if (desc.style.display == 'block') {
            desc.style.display = 'none';
            target.textContent = 'See more';
        } else {
            desc.style.display = 'block';
            target.textContent = 'Hide';
        }
    }
});