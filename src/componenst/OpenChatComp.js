import React , {useState , useEffect} from "react";
import '../assets/css/open-chat.css'
export default function OpenChatComp(props) {
    return (
        <>
            <div className="floating-container">
                <div className="floating-button">
                    <div className="font-icon">
                    <i className="fas fa-comment"></i>
                    </div>
                </div>
                <div className="element-container">
                    <a href="https://line.me/R/ti/p/%40jqj5015a" className="float-element" target="_back">
                    <span>
                    <i className="fab fa-line font-icon2"></i>
                    </span>
                    </a>
                    <a href="https://m.me/101039558029008" className="float-element tooltip-left" target="_back">
                    <span>
                    <i className="fab fa-facebook-messenger font-icon2"></i>
                    </span>
                    </a>
                    <a href="https://web.facebook.com/pg/camping.phanechon" className="float-element" target="_back">
                    <span>
                    <i className="fab fa-facebook-square font-icon2"></i>
                    </span>
                    </a>
                </div>
                </div>
        </>
    )
}