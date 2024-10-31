document.addEventListener('DOMContentLoaded', function () {
    const chatHistory = document.getElementById('chatHistory');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    // Sample messages for demonstration
    const sampleMessages = [
        { text: "Hello! How can we help you today?", isAdmin: true, time: "10:00 AM" },
        { text: "Hi! I have a question about my order.", isAdmin: false, time: "10:01 AM" },
        { text: "Of course! Please provide your order number.", isAdmin: true, time: "10:02 AM" }
    ];

    // Function to format current time
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Function to add a message to the chat
    function addMessage(text, isAdmin = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isAdmin ? 'message-admin' : 'message-user'}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = getCurrentTime();

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        chatHistory.appendChild(messageDiv);

        // Scroll to bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Load sample messages
    function loadSampleMessages() {
        sampleMessages.forEach(msg => {
            addMessage(msg.text, msg.isAdmin);
        });
    }

    // Handle form submission
    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, false);

            // Clear input
            messageInput.value = '';

            // Simulate admin response after 1 second
            setTimeout(() => {
                addMessage("Thank you for your message. An admin will respond shortly.", true);
            }, 1000);
        }
    });

    // Initialize chat
    loadSampleMessages();
});
