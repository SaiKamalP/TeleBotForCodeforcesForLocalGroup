function elementToB64Img(element){
    const targetElement =element;
    return html2canvas(targetElement)
    .then(canvas => {
        const dataUrl = canvas.toDataURL('image/png');
        return dataUrl;

    })
    .catch(error => {
        console.error('Error:', error);
    });
}