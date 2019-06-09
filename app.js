class TextWriter {
    constructor(textElement, words, wait = 2000) {
        this.textElement = textElement;
        this.words = words;
        this.currentText = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    // type methode
    type() {
        // get full text of the current word
        let fullText = this.words[this.wordIndex];
        // initial Type Speed
        let typeSpeed = 300;
        // Check if deleting
        if (this.isDeleting) {
            // Remove word
            this.currentText = fullText.substr(0, this.currentText.length - 1);
            typeSpeed = typeSpeed / 2;
        }
        else {
            // Add word
            this.currentText = fullText.substr(0, this.currentText.length + 1);
        }
        // Insert textElement into the HTML
        this.textElement.innerHTML = `<span class="txt">${this.currentText}</span>`;
        // Word Completed
        if (!this.isDeleting && this.currentText === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.currentText.length === 0) {
            this.isDeleting = false;
            if (this.wordIndex === this.words.length - 1) {
                this.wordIndex = 0;
            }
            else {
                this.wordIndex++;
            }
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}

// EventListener
document.addEventListener('DOMContentLoaded', init);

// init function
function init(){
    const textElement = document.querySelector('.txt-type');
    const words = JSON.parse(textElement.getAttribute('data-words'));
    const wait = textElement.getAttribute('data-wait');

    new TextWriter(textElement, words, wait);


    

}