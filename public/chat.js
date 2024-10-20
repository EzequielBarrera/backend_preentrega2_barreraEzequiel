const socket = io()

const chatBox = document.getElementById('chatBox')
let user

function askUser() {
    let username = prompt('Ingrese su nombre de usuario')
    if (!username) {
        return 'Por favor, ingrese un nombre de usuario'
    } else {
        // 2da parte
        user = username
        socket.emit("userConnected", { username: username })
        const myName = document.getElementById('myName')
        myName.innerText = username
        console.log(username)
    }
}

askUser()

chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit('newMessage', { username: user, message: chatBox.value })
            chatBox.value = ''
        } else {
            alert('Escribe un mensaje por favor')
        }
    }
})

socket.on('all-messages', data => {
    const messageLogs = document.getElementById('messageLogs');
    let logs = ''
    data.forEach(log => {
        logs += `<div><span>${log.username}: </span>${log.message}</div>`
    })
    messageLogs.innerHTML = logs;
})