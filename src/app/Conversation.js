// Conversation.js
// Component for displaying a chatbot ui
// it gives the user the ability to talk to chatgpt through the open ai api
// the conversation history is saved to a mongo database for retrieval on log in

import React, { useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { logout } from "../user-slice";
import { IoIosSend } from "react-icons/io";
import ConversationEntry from "./ConversationEntry";
import {
    GradientBackground,
    LoadingSpinner,
    ChatbotHeading,
    HeadingH1,
    UserSection,
    LogoutButton,
    ConversationContainer,
    ConversationContent,
    ConversationEntryContainer,
    InputContainer,
    InputTextArea,
    InputButton,
    CenterThis,
    SpinningFavicon
} from './styles/StyledComps';
import Axios from 'axios';

// Function to handle the text in the textarea element for user input
const MessageController = ({ onSendMessage, loading }) => {
    const [text, setText] = React.useState('');

    // Updates text state variable with text
    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    // On send message update text state variable to empty and send text to api
    const handleSendMessage = () => {
        if (!loading && text.trim() !== "") {
            onSendMessage(text);
            setText('');
        }
    };

    // Press enter to send message
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    // On load move cursor to text area
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus(); // Focus on the text area on load     
    }, []);

    // Displays working textarea for user input
    return (
        <InputContainer>
            <InputTextArea
                value={text}
                onChange={handleInputChange}
                placeholder="Type your message to the A.I..."
                rows={4}
                cols={50}
                onKeyDown={handleKeyPress}
                ref={inputRef}
            />
            <InputButton onClick={handleSendMessage}>
                <IoIosSend />
            </InputButton>
        </InputContainer>
    );
};

// Function for all things related to backend conversation handling
const Conversation = ({ user, logout }) => {
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const getConversationHistory = async () => {
        try {
            const response = await Axios.get('http://noah.211.ics.compsci.cc:7116/api/getHistory');
            const history = response.data;

            const formatedHistory = history.map((chat) =>
            ({
                role: chat.who === 'user' ? 'user' : 'assistant',
                content: chat.dialog,
            }));

            setMessages(formatedHistory);
        } catch (error) {
            console.error('Error Fetching Conversation History', error);
        }
    };

    useEffect(() => {
        getConversationHistory(); // Loads previous chat messages
    }, []);

    const handleSendMessage = async (message) => {
        await sendMessageToServer(message);
    };

    // Sends all messages to the converse api (chatGPT)
    const sendMessageToServer = async (message) => {
        try {
            setLoading(true);

            const response = await Axios.post("http://noah.211.ics.compsci.cc:7116/api/converse", {
                query: message
            })

            const result = response.data.result; // Get full conversation including new message

            // Grabs most recent user message
            const userMessage = {
                role: result[result.length - 2].role,
                content: result[result.length - 2].content,
            };

            // Grabs most recent ai message
            const aiMessage = {
                role: result[result.length - 1].role,
                content: result[result.length - 1].content,
            };

            // Save user message to MongoDB
            await Axios.post("http://noah.211.ics.compsci.cc:7116/api/save", {
                who: userMessage.role,
                when: new Date(),
                dialog: userMessage.content,
            });

            // Save AI message to MongoDB
            await Axios.post("http://noah.211.ics.compsci.cc:7116/api/save", {
                who: aiMessage.role,
                when: new Date(),
                dialog: aiMessage.content,
            });

            // Adds new messages to state
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setMessages(prevMessages => [...prevMessages, aiMessage]);

            setLoading(false);
        } catch (error) {
            console.error('Error:', error.message);
            setLoading(false);
        }
    }

    // Component for creating a button with the ability to wipe the database of previous conversations
    const PurgeButton = () => {
        const buttonStyle = {
            backgroundColor: '#e74d3cd8',
            color: '#ecf0f1',
            padding: '1px 8px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '15px',
        };

        const handlePurge = async () => {
            try {
                // Make a request to the "purge" API endpoint
                const response = await Axios.post('http://noah.211.ics.compsci.cc:7116/api/purge');
                console.log('Purge Successful:', response.data);

                // Clear messages state after purging
                setMessages([]);
            } catch (error) {
                console.error('Error during purge:', error);
            }
        };

        return (
            <button style={buttonStyle} onClick={handlePurge}>
                Purge Data
            </button>
        );
    };

    // Logout handler
    const handleLogout = () => {
        logout();
    };

    // Displays full chatbot ui
    // including title, purge button, logout button, and message displaying with a textarea for user input
    return (
        <>
            <GradientBackground>
                <CenterThis>
                    <ChatbotHeading>
                        <HeadingH1>Chatbot</HeadingH1>
                        <PurgeButton />
                        <UserSection>
                            Hello, {user.name}
                            <LogoutButton onClick={handleLogout}> {/* Logout Button */}
                                Logout
                            </LogoutButton>
                        </UserSection>
                    </ChatbotHeading>
                </CenterThis>
                <ConversationContainer>
                    <ConversationContent>
                        {/* Maps messages state variable to display each message using the ConversationEntry component */}
                        {messages.map((message, index) => (
                            <ConversationEntry key={index} type={message.role} message={message.content} />
                        ))}
                        {loading && <SpinningFavicon src="./favicon.ico" alt="Favicon" ></SpinningFavicon>}
                    </ConversationContent>
                </ConversationContainer>
                <CenterThis>
                    <ConversationEntryContainer>
                        {/* Component for handling user input */}
                        <MessageController onSendMessage={handleSendMessage} loading={loading} />
                    </ConversationEntryContainer>
                </CenterThis>
            </GradientBackground>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    };
};

export default connect(mapStateToProps, { logout })(Conversation);
