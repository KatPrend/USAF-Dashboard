import React from "react";



export function SummaryIcon({data}){

    return(
        <>
        {(() => {

            if (data === "ONTRACK" || data === "ON-BUDGET") {
                return (
                    <div style={{color: 'green', fontSize: '30px'}} >{'⬤'}</div>
                )
            } 
            else if (data === "BEHIND" || data === "UNDER") {
                return (
                    <div style={{color: 'yellow', fontSize: '30px'}} >{'\u25A0'}</div>
                )
            } 
            else if (data === "REALLY-BEHIND" || data === "OVER") {
                return (
                    <div style={{color: 'red', fontSize: '30px'}} >{'\u25B2'}</div>
                )
            } 
            else {
                return (
                    <div>Error</div>
                )
            }

        })()}
        </>
    )
}