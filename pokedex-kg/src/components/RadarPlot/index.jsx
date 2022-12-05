import React from 'react'
import { Radar } from '@ant-design/plots';

export default function RadarPlot(props) {
    const {attr} = props
    const data = [
        {
            name: "Attack",
            val: parseInt(attr.attack)
        },
        {
            name: "Defense",
            val: parseInt(attr.defense)
        },
        {
            name: "HP",
            val: parseInt(attr.hp)
        },
        {
            name: "Speed",
            val: parseInt(attr.speed)
        },
        {
            name: "Special\n Attack",
            val: parseInt(attr.sp_attack)
        },
        {
            name: "Special\n Defense",
            val: parseInt(attr.sp_defense)
        },
    ]
    const config = {
    data: data,
    xField: 'name',
    yField: 'val',
    meta: {
        val: {
        alias: 'Pokemon Stats',
        min: 0,
        nice: true,
        formatter: (v) => Number(v),
        },
    },
    xAxis: {
        tickLine: null,
    },
    yAxis: {
        label: false,
        grid: {
        alternateColor: "#eeeeee",
        },
        max: 255,
    },
    color: "#000000",
    point: {
        size: 2,
    },
    area: {},
    };
    console.log("@")
    return (
        <Radar {...config} />
    )
}
