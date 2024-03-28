document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight"){
        document.querySelector("a.next-page").click();
    } else if (e.key === "ArrowLeft") {
        document.querySelector("a.prev-page").click();
    } else if (e.key === "ArrowDown") {
        scrollTo(true);
    } else if (e.key === "ArrowUp") {
        scrollTo(false);
    }
})

const scrollTo = (next) => {
    let sections = document.querySelectorAll('section :is(h1, h2, h3, h4, h5, h6)');
    for (let i = 0; i < sections.length; ++i) {
        if (isInViewport(sections[i])){
            if (next === true) {
                sections[i + 1].scrollIntoView();
                sections[i + 1].querySelector('a').click();
                return
            } else {
                sections[i - 1].scrollIntoView();
                sections[i - 1].querySelector('a').click();
                return
            }
        }
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}