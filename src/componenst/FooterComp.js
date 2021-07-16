import React , {useState , useEffect} from "react";
export default function FooterComp(props) {
    return (
        <>
            <img src="../image/footer.png" width="100%"  style={{marginBottom:"-4px"}}/>
            <div className="footer text-white-50">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" style={{paddingBottom : "4rem"}}>
                            <center>
                                <img src={`../image/logo_footer.png`} width="200px"/>
                                {/* <img src={`${process.env.REACT_APP_WEB}image/logo_footer.png`} width="200px"/> */}
                            </center>
                            
                        </div>
                        <div className="col-md-4" style={{paddingBottom : "4rem"}}>
                            <center>
                            <h5>แบรนด์ที่จำหน่าย</h5>
                            <div className="row" style={{marginTop : "1.5rem"}}>
                                <div className="col-3 col-md-3 footer-brand">
                                    <img src={`../image/patagonia.png`} className="footer-brand-image"/>
                                </div>
                                <div className="col-3 col-md-3 footer-brand">
                                    <img src={`../image/marmot.png`} className="footer-brand-image"/>
                                </div>
                                <div className="col-3 col-md-3 footer-brand">
                                    <img src={`../image/the-north-face.png`} className="footer-brand-image"/>
                                </div>
                                <div className="col-3 col-md-3 footer-brand">
                                    <img src={`../image/arc-teryx.png`} className="footer-brand-image"/>
                                </div>
                                
                                
                                
                            </div>
                            </center>
                        </div>
                        <div className="col-md-4" style={{paddingBottom : "4rem"}}>
                        <center>
                            <h5>SOCIAL MEDAI</h5>
                            <div className="row footer-icon">
                                <div className="col-1"></div>
                                <div className="col-2">
                                    <i className="fab fa-facebook"></i>
                                </div>
                                <div className="col-2">
                                    <i className="fab fa-instagram"></i>
                                </div>
                                <div className="col-2">
                                    <i className="fab fa-youtube"></i>
                                </div>
                                <div className="col-2">
                                    <i className="fab fa-twitter"></i>
                                </div>
                                <div className="col-2">
                                    <i className="fab fa-line"></i>
                                </div>
                                <div className="col-1"></div>
                            </div>
                            
                            <h5 style={{marginTop:"25px"}}>ติดต่อเรา</h5>
                            
                            <p style={{marginBottom : "0px"}}><i className="fas fa-mobile-alt"></i> : 087-4451121</p>
                            <p><i className="fas fa-envelope"></i> : rodxoffroad@gmail.com</p>
                            </center>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-end text-white-50">
                <div className="container">
                    09/01/2020
                </div>
            </div>
        </>
    )
}