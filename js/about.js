const sendButton = document.getElementById('contact-button');
const backButton = document.querySelector('.fa-chevron-left');

sendButton.addEventListener('click', () => {

    alert('Your message has been sent successfully!');

});

backButton.addEventListener('click', () => {
    
    window.history.back();
});