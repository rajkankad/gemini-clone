import React, { useContext } from "react";
import './Main.css'
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <div className="nav-logo">
                    <img src={assets.gemini_icon} alt="Gemini Logo" className="nav-icon" />
                    <h1>Gemini AI Assistant</h1>
                </div>
                <div className="nav-user">
                    <img src={assets.user_icon} alt="User" className="user-avatar" />
                </div>
            </div>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="welcome-section">
                            <h2>Welcome to Gemini AI</h2>
                            <p className="welcome-text">Your intelligent assistant for creative solutions</p>
                        </div>

                        <div className="suggestion-grid">
                            <div className="suggestion-card" onClick={() => setInput("Suggest beautiful places to see on an upcoming road trip")}>
                                <img src={assets.compass_icon} alt="" className="card-icon" />
                                <h3>Travel Planning</h3>
                                <p>Discover amazing destinations for your next adventure</p>
                            </div>

                            <div className="suggestion-card" onClick={() => setInput("Explain urban planning concepts")}>
                                <img src={assets.bulb_icon} alt="" className="card-icon" />
                                <h3>Learn Concepts</h3>
                                <p>Get clear explanations on complex topics</p>
                            </div>

                            <div className="suggestion-card" onClick={() => setInput("Suggest team building activities")}>
                                <img src={assets.message_icon} alt="" className="card-icon" />
                                <h3>Team Building</h3>
                                <p>Ideas for engaging group activities</p>
                            </div>

                            <div className="suggestion-card" onClick={() => setInput("Help improve code readability")}>
                                <img src={assets.code_icon} alt="" className="card-icon" />
                                <h3>Code Review</h3>
                                <p>Enhance your code quality</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="chat-container">
                        <div className="chat-message user-message">
                            <img src={assets.user_icon} alt="" className="message-avatar" />
                            <div className="message-content">
                                <p className="message-text">{recentPrompt}</p>
                            </div>
                        </div>

                        <div className="chat-message ai-message">
                            <img src={assets.gemini_icon} alt="" className="message-avatar" />
                            <div className="message-content">
                                {loading ? (
                                    <div className="loader">
                                        <hr /><hr /><hr />
                                    </div>
                                ) : (
                                    <p className="message-text" dangerouslySetInnerHTML={{__html: resultData}}></p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="input-section">
                    <div className="input-container">
                        <input 
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="main-input"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && input) {
                                    onSent();
                                }
                            }}
                        />
                        <div className="input-actions">
                            <button 
                                className="action-btn" 
                                title="Upload image"
                                onClick={() => {
                                    // TODO: Implement image upload
                                }}
                            >
                                <img src={assets.gallery_icon} alt="Upload" />
                            </button>
                            <button 
                                className="action-btn" 
                                title="Voice input"
                                onClick={() => {
                                    // TODO: Implement voice input
                                }}
                            >
                                <img src={assets.mic_icon} alt="Voice" />
                            </button>
                            {input && (
                                <button 
                                    className="send-btn" 
                                    onClick={onSent} 
                                    title="Send message"
                                    aria-label="Send message"
                                >
                                    <img src={assets.send_icon} alt="Send" />
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="disclaimer">
                        Gemini may display inaccurate info, including about people, so double-check its responses.{' '}
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            // TODO: Add privacy policy link/modal
                        }}>
                            Your privacy and Gemini Apps
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;