import React from "react";



export function SummaryIcon({data}){

    return(
        <>
        {(() => {

            if (data === "ONTRACK" || data === "ON-BUDGET" || data === 'green') {
                return (
                    <div style={{color: 'green', fontSize: '30px'}} >{'⬤'}</div>
                )
            } 
            else if (data === "BEHIND" || data === "UNDER" || data === 'yellow') {
                return (
                    <div style={{color: 'orange', fontSize: '30px'}} >{'\u25A0'}</div>
                )
            } 
            else if (data === "REALLY-BEHIND" || data === "OVER" || data === 'red') {
                return (
                    <div style={{color: 'red', fontSize: '30px'}} >{'\u25B2'}</div>
                )
            } 
            else {
                return (
                    <div> </div>
                )
            }

        })()}
        </>
    )
}