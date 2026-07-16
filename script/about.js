const text = `I'm a Flutter Developer from Chennai.

I build beautiful and high-performance mobile applications using Flutter.

I have 2+ years of experience developing Android, iOS, Web, and Desktop applications.

Currently I'm focused on creating AI-powered accounting and GST solutions.

Welcome to my portfolio.`;

const typing = document.getElementById("typing");

let index = 0;

function typeWriter() {
    if (index < text.length) {
        typing.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 35);
    }
}

typeWriter();