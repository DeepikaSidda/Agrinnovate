document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Append user message
    appendMessage(userInput, 'user');

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Send the message to the OpenAI API via Postman
    const botResponse = await getBotResponse(userInput);

    // Append bot message
    appendMessage(botResponse, 'bot');
});

function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');

    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    messageElement.appendChild(messageContent);
    chatBox.appendChild(messageElement);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userInput) {
    try {
        const response = await fetch('YOUR_POSTMAN_API_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other necessary headers here
            },
            body: JSON.stringify({
                model: "text-davinci-003", // Replace with your model
                prompt: userInput,
                max_tokens: 150
            })
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching bot response:', error);
        return "Sorry, I couldn't process your request.";
    }
}
