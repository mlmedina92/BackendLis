const socketClient = io();

const form = document.querySelector('form')
const chat = document.getElementById("chatField");
const email = document.querySelectorAll('input')[0]
const message = document.querySelectorAll('input')[1]

socketClient.emit('show')

socketClient.on('sendMsg', (e) => {
  console.log(e);
  alert('Envio exitoso')
})

socketClient.on("loadMsg", (e) => {
  chat.innerHTML = "";
  e.map((e) => {
    let div = document.createElement("div");
    div.className = "chatMsg"
    div.innerHTML = `
    <p>${e.user}:</p>
    <p>${e.message}</p>
    `;
    chat.appendChild(div);
  });
});

form.onsubmit = (e) => {
  e.preventDefault();
  const schema = {
    user: email.value,
    message: message.value,
  };
  email.value = "";
  message.value = "";
  socketClient.emit("sendInfo", schema);
};
