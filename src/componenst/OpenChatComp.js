import React , {useState , useEffect} from "react";
import '../assets/css/open-chat.css'
export default function OpenChatComp(props) {
    return (
        <>
            <div class="floating-container">
                <div class="floating-button">
                    <div class="font-icon">
                    <i class="fas fa-comment"></i>
                    </div>
                </div>
                <div class="element-container">
                    <a href="https://line.me/R/ti/p/%40jqj5015a" class="float-element" target="_back">
                    <span>
                    <i class="fab fa-line font-icon2"></i>
                    </span>
                    </a>
                    <a href="https://m.me/101039558029008" class="float-element tooltip-left" target="_back">
                    <span>
                    <i class="fab fa-facebook-messenger font-icon2"></i>
                    </span>
                    </a>
                    <a href="https://web.facebook.com/pg/camping.phanechon" class="float-element" target="_back">
                    <span>
                    <i class="fab fa-facebook-square font-icon2"></i>
                    </span>
                    </a>
                </div>
                </div>
        </>
    )
}