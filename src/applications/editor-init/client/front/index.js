import './style.scss';
var currentUrl = window.location.href;
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href && href === currentUrl) {
        links[i].classList.add('current');
    }
}
let DragBlockCurrent = 0;
window.addEventListener('scroll', () => {
    const DragBlockAvai = window.scrollY || document.documentElement.scrollTop;
    if (DragBlockAvai === 0) {
        document.body.classList.remove('scroll-up', 'scroll-down', 'scroll');
    } else if (DragBlockAvai > DragBlockCurrent) {
        document.body.classList.remove('scroll-up');
        document.body.classList.add('scroll-down');        
        document.body.classList.add('scroll');
    } else {
        document.body.classList.remove('scroll-down');
        document.body.classList.add('scroll-up');        
        document.body.classList.add('scroll');
    }
    DragBlockCurrent = DragBlockAvai;
});