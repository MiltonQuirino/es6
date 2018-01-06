const Message = require('./message.model');
const ImageMessage = require('./image-message.model');
const fs = require('fs');
const path = require('path');

const emptyMessage = new Message();
const emptyPhotoMessage = new ImageMessage();

console.log(emptyMessage);
console.log(emptyPhotoMessage);

let a = 10;

var add = n => {
  const a = n + 1;
  return a;
}

function sum(x, y) {
  {
    const a = x + y;
  }
  return a;
}

// console.log(a);
// console.log(add(30));
// console.log(sum(4, 3));

class MessageService {
  constructor() {

    let resolvePromise;
    let rejectPromise;
    const filePath = path.join(__dirname, 'messages.json');

    this.messagePromise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });

    fs.readFile(filePath, {encoding: "utf-8"}, (err, data)=>{
      
      if(err){
        rejectPromise(err);
      }else{
        const dataArray = JSON.parse(data);
        const dataObj = dataArray.map((item) => {
          return new Message(item.text, item.created);
        })
        resolvePromise(dataObj);
        // console.log(JSON.parse(data));
      }
    });
  }

  get messages() {
    return this.messagePromise;
  }
}

const messageService = new MessageService();
messageService.messages.then((messages) => {
  console.log(messages)
}).catch((err) => {
  console.log(err);
});