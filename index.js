const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const imageArr = document.querySelectorAll('#imageCarousel img');
console.log(imageArr);
let timeoutID;
const circlesArr = [];

const Carousel = {
    currentIndex: 0,
    move(num) {
        if (this.currentIndex + num < 0) {
            this.currentIndex = imageArr.length - 1;
        } else if (this.currentIndex + num > imageArr.length - 1){
            this.currentIndex = 0;
        } else {
            this.currentIndex = this.currentIndex + num;
        }
        this.renderImage();
    },
    renderImage(index = this.currentIndex) {
        for (let image of imageArr) {
            if (index === Array.from(imageArr).indexOf(image)){
                image.style.display = 'inline';
            }else {
                image.style.display = 'none';
            }
        }
        this.currentIndex = index;
        renderCircles();
    },    
}


function autoSlide() {
    timeoutID = setInterval(function(){Carousel.move(1);}, 3000);
}

function restartTimer() {
    clearTimeout(timeoutID);
    autoSlide();
}

rightBtn.addEventListener('click', function() {
    Carousel.move(1);
    restartTimer();
});
leftBtn.addEventListener('click', function() {
    Carousel.move(-1);
    restartTimer();
})


function renderCircles() {
    for (let circle of circlesArr) {
        if (Carousel.currentIndex === circlesArr.indexOf(circle)){
            circle.style.backgroundColor = '#808080';
        }else {
            circle.style.backgroundColor = 'transparent';
        }
    }
}

function generateCircles() {
    const circleDiv = document.querySelector('#circleDiv');
    for (let i = 0; i<8; i++){
        const circle = document.createElement('div');
        circle.id = 'circle';
        circleDiv.appendChild(circle);
        circlesArr.push(circle);
        circle.addEventListener('click', () => {
            Carousel.renderImage(circlesArr.indexOf(circle));
        })

    }
}
generateCircles();
Carousel.renderImage();
autoSlide();

