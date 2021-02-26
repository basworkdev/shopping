import React ,{useState} from "react";
import $ from "jquery"

// CSS
import '../assets/css/top-up.css'

export default function TopUpComp(props) {
    const [myBtnState , setMyBtnState] = useState("none");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            // setMyBtnState("block");
            document.getElementById("myBtn").style.display = "block";
        } else {
            // setMyBtnState("none");
            document.getElementById("myBtn").style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    const topFunction = () => {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    }


    return (
        <>
        <button onClick={()=>topFunction()} id="myBtn" title="Go to top" style={{fontSize: "30px", display: "block" }}>
            <i className="fas fa-angle-up"></i>
        </button>
        </>
    )
}