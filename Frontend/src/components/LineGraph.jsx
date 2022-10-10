import React from "react";
import {LineChart, XAxis, YAxis, Tooltip, Legend, Line} from "recharts";

export default function LineGraph({data, dataKey1, dataKey2}){

    return(
        <div>
            <LineChart width={730} height={250} data={data}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Legend/>
                <Tooltip/>
                <Line type="monotone" dataKey={dataKey1} strokeWidth="2" stroke="steelblue"/>
                <Line type="monotone" dataKey={dataKey2} strokeWidth="2" stroke="rgb(63, 68, 71)"/>
            </LineChart>
        </div>
    )
}