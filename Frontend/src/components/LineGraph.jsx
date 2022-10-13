import React from "react";
import {LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer} from "recharts";

export default function LineGraph({data, dataKey1, dataKey2}){

    return(
        <div>
            <ResponsiveContainer width="90%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Legend/>
                    <Tooltip/>
                    <Line type="monotone" dataKey={dataKey1} strokeWidth="2" stroke="steelblue"/>
                    <Line type="monotone" dataKey={dataKey2} strokeWidth="2" stroke="rgb(63, 68, 71)"/>
                </LineChart>
            </ResponsiveContainer>
            
        </div>
    )
}