import React from "react";
import Clap from "./Clap.jsx";

const One = props => {
    // steps to reformat the date:
        var monthes = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var formatted = new Date(props.art.createdAt);
        var theDate = monthes[formatted.getMonth()] + " " + formatted.getDate() + "," + formatted.getFullYear() + " . ";
        
    var writer = props.user;
return <div className="REConeComp RECitem">
    <div className="RECimgAndTit">
        <div>
            <h4 className="RECfont1">
                More from {writer.name}
            </h4>
        </div>
        <div className="RECimgBig">
            <a className="RECimgLink" rel="noopener" href={props.art.pic}>
                <div className="RECimg1">
                    <div className="RECimg2">
                        <div className="RECrealImg">
                            <img src={props.art.pic}></img>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
    
    <div>
        <div>
            <h3 className="RECtitle">
                {props.art.title}
            </h3>
        </div>


        <div className="RECflex RECsecondPart">
            <div className="RECflex RECauthor">
                <a href={writer.pic} rel="noopener">
                    <img src={writer.pic} alt={writer.name} width="40" height="40" />
                </a>
                <div className="RECautorInfo">
                    <div className="RECflex RECname">
                        <span>
                            <a className="RECa" href="/user" rel="noopener">
                                {writer.name}
                            </a>
                        </span>
                    </div>
                    <div className="RECflex RECdateAndMin">
                        <a className="RECa" href="/user" rel="noopener">
                            {theDate}
                        </a>
                        {props.art.readingTime} min read
                    </div>
                </div>
            </div>
            <div>
                <Clap num={props.art.clapsNumber}/>
            </div>
        </div>
    </div>

</div>
}



export default One;