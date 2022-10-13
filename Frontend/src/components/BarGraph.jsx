import React from "react";
import {BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer} from "recharts";


export default function BarGraph({data, dataKey1, dataKey2}){

    return(
        <div>
            <ResponsiveContainer width="90%" aspect={4 / 1}>
                <BarChart data={data}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Legend/>
                    <Tooltip/>
                    <Bar dataKey={dataKey1} fill="steelblue"/>
                    <Bar dataKey={dataKey2} fill="rgb(63, 68, 71)"/>
                </BarChart>
            </ResponsiveContainer>
            
        </div>
    )
}