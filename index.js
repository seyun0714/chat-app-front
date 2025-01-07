$(document).ready(function(){
    document.getElementById('messageInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            console.log('enter');
            e.preventDefault();
            sendMessage();
        }
    });
});

function startChat() {
    const userId = document.getElementById('userId').value.trim();
    if (userId) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('chatSection').style.display = 'flex';
        document.getElementById('userDisplay').style.display = 'block';
        document.getElementById('username').textContent = userId;

        // 서버 연결

        addSystemMessage('채팅방에 입장하였습니다.');
    }
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (message) {
        const username = document.getElementById('username').textContent;
        const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
        addMessage(username, message, time);
        input.value = '';
    }
}

function addMessage(sender, text, time) {
    const messageList = document.getElementById('messageList');
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex justify-end`;
    messageDiv.innerHTML = `
                <div class="bg-custom text-white rounded-lg px-4 py-2 max-w-[70%]">
                    <div class="text-sm font-medium mb-1">${sender}</div>
                    <div>${text}</div>
                    <div class="text-xs text-white/80 text-right mt-1">${time}</div>
                </div>
            `;
    messageList.appendChild(messageDiv);
    messageList.scrollTop = messageList.scrollHeight;

    // 서버에 메시지 전송

    //messageDiv.className = `flex ${isSelf ? 'justify-end' : 'justify-start'}`;
    // <div className="${isSelf ? 'bg-custom text-white' : 'bg-gray-100 text-gray-800'} rounded-lg px-4 py-2 max-w-[70%]">
    //     <div className="text-sm font-medium mb-1">${sender}</div>
    //     <div>${text}</div>
    //     <div className="text-xs ${isSelf ? 'text-white/80' : 'text-gray-500'} text-right mt-1">${time}</div>
    // </div>
}


function addSystemMessage(text) {
    const messageList = document.getElementById('messageList');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex justify-center';

    messageDiv.innerHTML = `
                <div class="bg-gray-200 text-gray-600 rounded-full px-4 py-1 text-sm">
                    ${text}
                </div>
            `;

    messageList.appendChild(messageDiv);
    messageList.scrollTop = messageList.scrollHeight;
}

