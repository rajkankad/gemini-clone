import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets"
import { Context } from "../../context/Context";
import { BiMenu, BiPlus, BiMessage, BiQuestionMark, BiHistory, BiCog } from "react-icons/bi";

const Sidebar = () => {
    const [extended, setExtended] = useState(false)
    const [animation, setAnimation] = useState(false)
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    useEffect(() => {
        setAnimation(true)
        return () => setAnimation(false)
    }, [extended])

    return (
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className="top">
                <div className="menu-container">
                    <BiMenu
                        onClick={() => setExtended(prev => !prev)}
                        className={`menu ${animation ? 'rotate' : ''}`}
                        size={24}
                    />
                </div>
                <div 
                    onClick={newChat} 
                    className={`new-chat-btn ${extended ? 'extended' : ''}`}
                >
                    <div className="icon-wrapper">
                        <BiPlus size={24} />
                    </div>
                    <span className={`btn-text ${extended ? 'fade-in' : ''}`}>
                        New Chat
                    </span>
                </div>

                {extended && (
                    <div className="recent-container">
                        <h3 className="recent-title">Recent Conversations</h3>
                        <div className="recent-list">
                            {prevPrompts.map((item, index) => (
                                <div 
                                    key={index}
                                    onClick={() => loadPrompt(item)} 
                                    className="recent-item"
                                    style={{animationDelay: `${index * 0.1}s`}}
                                >
                                    <div className="item-icon">
                                        <BiMessage size={24} />
                                    </div>
                                    <p className="item-text">
                                        {item.length > 25 ? `${item.slice(0, 25)}...` : item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-actions">
                    <div className="action-item">
                        <div className="action-icon">
                            <BiQuestionMark size={24} />
                        </div>
                        {extended && <span className="action-text">Help</span>}
                    </div>

                    <div className="action-item">
                        <div className="action-icon">
                            <BiHistory size={24} />
                        </div>
                        {extended && <span className="action-text">Activity</span>}
                    </div>

                    <div className="action-item">
                        <div className="action-icon">
                            <BiCog size={24} />
                        </div>
                        {extended && <span className="action-text">Settings</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
