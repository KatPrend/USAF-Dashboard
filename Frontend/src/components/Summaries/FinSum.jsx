import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const dataPie = (spent, planned) => {
    var unspent = planned - spent
    return (
        [
            ["funding", "amount"],
            ["Actual", spent],
            ["difference", (unspent < 0) ? 0 : unspent],
            ["Buffer", (spent > planned) ? planned - (spent - planned) : planned]
        ]
    )
}
  
const getPieColor = (actual, planned) => {
    // TODO: set up backend modifiability for these coefficents
    var red_coefficent = .2;
    var yellow_coefficent = .1;
    if (actual >= planned * (1 + red_coefficent) || actual <= planned * (1 - red_coefficent))
    {
        return 'red';
    }
    if (actual >= planned * (1 + yellow_coefficent) || actual <= planned * (1 - yellow_coefficent))
    {
        return 'yellow';
    }
    return 'green';
}

const expendOptionsPie = (actual, planned) => {
    var color = getPieColor(actual, planned)
    return(
        {
            tooltip: {text: 'value'},
            chartArea:{left:'5%', top:'5%   ',width:'90%',height:'90%'},
            backgroundColor: "whitesmoke",
            pieSliceBorderColor: 'transparent',
            pieSliceText: 'label',
            pieSliceTextStyle: {fontSize: 15},
            legend: "none",
            pieHole: 0.3,
            pieStartAngle: -90,
            is3D: false,
            slices: {
                0: { color: {color} },
                1: { color: "grey" },
                2: { color: "transparent", textStyle: {color: 'transparent'} },
            },
        }
    )
};

export const FinSum = (props) => {
    const [expenditurePlanned, setExpenditurePlanned] = useState(100);
    const [expenditureActual, setExpenditureActual] = useState(80);
    const [obligationPlanned, setObligationPlanned] = useState(200);
    const [obligationActual, setObligationActual] = useState(210);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (props.userRole === "Admin") {
            axios.get(`/api/obligation/getAdminTotalObligation`).then(response => {
                setObligationActual(response.data[0].obli_actual);
                setObligationPlanned(response.data[0].obli_projected);
                setLoading(false);
            });
            axios.get(`/api/expenditure/getAdminTotalExpenditure`).then(response => {
                setExpenditurePlanned(response.data[0].expen_projected);
                setExpenditureActual(response.data[0].expen_actual);
                setLoading(false);
            });
        } else {
            axios.get(`/api/project/userId/${props.userid}`).then(response => {
                // setData(response.data);
                console.log("NOOOOOOo");
                console.log(JSON.stringify(response.data));
                setLoading(false);
            });
        }
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    return (
        <Card className='card'>
            <Card.Header className="text-center cardHead">Financial Summary</Card.Header>
            <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <div className="obligation">
                                    <p className="finTitle">Obligation Status to Date</p>
                                        <Chart
                                        style={{margin: 'auto'}}
                                        chartType="PieChart"
                                        width="168px"
                                        height="168px"
                                        data={dataPie(obligationActual, obligationPlanned)}
                                        options={expendOptionsPie(obligationActual, obligationPlanned)}
                                        />
                                    <div>Obligation %:</div>
                                    <div>{((obligationActual / obligationPlanned) * 100).toFixed(2)}%</div>
                                    <p className="finInfo">Actual Obligation: {obligationActual}</p>
                                    <p className="finInfo">Planned Obligation: {obligationPlanned}</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="expenditure">
                                    <p className="finTitle">Expenditure Status to Date</p>
                                    <Chart
                                    style={{margin: 'auto'}}
                                    chartType="PieChart"    
                                    width="168px"
                                    height="168px"
                                    data={dataPie(expenditureActual, expenditurePlanned)}
                                    options={expendOptionsPie(expenditureActual, expenditurePlanned)}
                                    />
                                    <div>Expenditure %:</div>
                                    <div>{((expenditureActual / expenditurePlanned) * 100).toFixed(2)}%</div>
                                    <p className="finInfo">Actual Expenditure: {expenditureActual}</p>
                                    <p className="finInfo">Planned Expenditure: {expenditurePlanned}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
            </Card.Body>
        </Card>
    );
}