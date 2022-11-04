import React, {useState} from "react";
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const dataPie = (spent, planned) => {
    var unspent = planned - spent
    return (
        [
            ["funding", "amount"],
            ["Actual", spent],
            ["Unspent", (unspent < 0) ? 0 : unspent],
            ["Buffer", (spent > planned) ? planned - (spent - planned) : planned]
        ]
    )
}
  
const getPieColor = (percentDiff) => {
    percentDiff = (percentDiff > 0 ? percentDiff : -1 * percentDiff);
    if (percentDiff >= 0.2)
    {
        return 'red';
    }
    if (percentDiff >= 0.1)
    {
        return 'yellow';
    }
    return 'green';
}

const expendOptionsPie = (percentDiff) => {
    var color = getPieColor(percentDiff)
    return(
        {
            tooltip: {trigger: 'none'},
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

export const FinSum = () => {
    const [expenditurePlanned, setExpenditurePlanned] = useState(100);
    const [expenditureActual, setExpenditureActual] = useState(60);
    const [obligationPlanned, setObligationPlanned] = useState(200);
    const [obligationActual, setObligationActual] = useState(210);

    return (
        <Card className='card'>
            <Card.Header className="text-center cardHead">Financial Summary</Card.Header>
            <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <div className="obligation">
                                    <p className="finTitle">Obligation Status to Date</p>
                                    <div>
                                        <Chart
                                        chartType="PieChart"
                                        width="168px"
                                        height="168px"
                                        data={dataPie(obligationActual, obligationPlanned)}
                                        options={expendOptionsPie((obligationActual - obligationPlanned) / ((obligationActual + obligationPlanned) / 2))}
                                        />
                                    </div>
                                    <p className="finInfo">Planned Obligation: {obligationActual}</p>
                                    <p className="finInfo">Actual Obligation: {obligationPlanned}</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="expenditure">
                                    <p className="finTitle">Expenditure Status to Date</p>
                                    <div>
                                        <Chart
                                        chartType="PieChart"    
                                        width="168px"
                                        height="168px"
                                        data={dataPie(expenditureActual, expenditurePlanned)}
                                        options={expendOptionsPie(expenditureActual / expenditurePlanned)}
                                        />
                                    </div>
                                    <p className="finInfo">Planned Expenditure: {expenditurePlanned}</p>
                                    <p className="finInfo">Actual Expenditure: {expenditureActual}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
            </Card.Body>
        </Card>
    );
}