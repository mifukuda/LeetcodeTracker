import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement, ChartDataLabels);

export default function ProgressGraphs(props) {
    const problems = props.problems;
    
    // Get date in day/month/year format
    function getFormattedDate(date) {
        return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    }

    let dateLabels =[];
    let counts = [];
    // Ignored unsolved problems
    let unsolvedCounts = [];
    if(problems.length) {
        // Sort problems by date
        let sortedProblems = [...problems].sort((a,b) => {return new Date(a.createdAt) - new Date(b.createdAt)});
        let currentDate = getFormattedDate(new Date(sortedProblems[0].createdAt));
        // Store x-axis labels (dates)
        dateLabels = [currentDate];
        // Store y-axis values (# of problems added on date)
        counts = [1];
        // only increment if problem is solved
        if(sortedProblems[0].solutions.length) {
            unsolvedCounts = [1];
        }
        for(let i=1; i < sortedProblems.length; i++) {
            let problemDate = getFormattedDate(new Date(sortedProblems[i].createdAt));
            if(problemDate === currentDate) {
                // increment date's count by 1
                counts[counts.length - 1]++;
                // only increment if problem is solved
                if(sortedProblems[i].solutions.length) {
                    unsolvedCounts[unsolvedCounts.length - 1]++;
                }
            }
            else {
                currentDate = problemDate;
                // push new date and set its count to previous date's count + 1
                dateLabels.push(problemDate);
                // new date: previous date's count + 1 if solution exists, count if solution does not exist
                if(sortedProblems[i].solutions.length) {
                    unsolvedCounts.push(counts[counts.length - 1] + 1);
                }
                else {
                    unsolvedCounts.push(counts[counts.length - 1]);
                }
                counts.push(counts[counts.length - 1] + 1);
            }
        }
    }

    /*for(let i=0; i < sortedProblems.length; i++) {
        if(sortedProblems[i].solutions.length) {
            currentDate= 
            counter = i;
            break;
        }
    }*/

    console.log(unsolvedCounts);

    const lineChartData = {
        labels: dateLabels,
        datasets: [
          {
            label: 'All Problems',
            data: counts,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Excluding Unsolved Problems',
            data: unsolvedCounts,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    // Create data for pie chart
    let difficultyData = [0, 0, 0, 0]
    for(let i=0; i < problems.length; i++) {
        if(problems[i].solutions.length) {
            difficultyData[problems[i].difficulty]++;
        }
        else {
            difficultyData[0]++;
        }
    }

    const pieChartData  = {
        labels: ["Unsolved", "Easy", "Medium", "Hard"],
        datasets: [
            {
                label: "Count",
                data: difficultyData,
                backgroundColor: [
                    '#D3D3D3',
                    '#77DD77',
                    '#FFD59E',
                    '#F7BEC0'
                ],
                borderColor: [
                    '#a8adad',
                    '#03a56a',
                    '#FFA500',
                    '#ed6161'
                ],
                borderWidth: 3
            }
        ]
    }

    return(
        <div className="progress-graphs">
            <p className="explanation-text" style={{marginBottom: "4%"}}> Your progress is visualized here! 
                Click on the "Problems" tab to see the total number of problems you've solved and the trends in how many you solve each day.
                Click on the "Difficulty" tab to see the proportions of problem difficulty.</p>
            <Tabs
                defaultActiveKey="0"
                justify
            >
                {/* Description tab: display problem text */}
                <Tab eventKey="0" title="Problems">
                    <div className="graph-problems">
                        <h2 style={{fontSize: "2.0em"}}>Problem Progress</h2>
                        <Line
                            data={lineChartData}
                            options={{
                                plugins:{
                                    datalabels: {
                                        display: false
                                    }
                                }
                            }}
                        />
                    </div>
                </Tab>
                {/* Pie graph showing % of each difficulty/unsolved */}
                <Tab eventKey="1" title="Difficulty">
                    <div className="graph-difficulty">
                        <h2 style={{fontSize: "2.0em"}}>Problem Difficulty</h2>
                        <Pie
                            data={pieChartData}
                            options={{
                                plugins:{
                                    datalabels: {
                                        display: false
                                    }
                                }
                            }}
                        />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}