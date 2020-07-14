const textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', autosize);

function autosize(){
    const el = this;
    setTimeout( () => {
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    } ,0);
};