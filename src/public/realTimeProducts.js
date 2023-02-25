const socketClient = io()//instancio el socket del lado del cliente



// parte del servidor que escucha eventos 
socketClient.on('product-added', message => {
    let msgHtml = document.getElementById('messages')
    msgHtml.innerHTML += `<p>${message}</p>`
})

socketClient.on('product-removed', message => {
    let msgHtml = document.getElementById('messages')
    msgHtml.innerHTML += `<p>${message}</p>`
})

