import React from "react";
import {BarChart, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";


export default function BarGraph({data, dataKey1, dataKey2}){

    return(
        <div>
            <BarChart width={730} height={250} data={data}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Legend/>
                <Tooltip/>
                <Bar dataKey={dataKey1} fill="steelblue"/>
                <Bar dataKey={dataKey2} fill="rgb(63, 68, 71)"/>
            </BarChart>
        </div>
    )
}