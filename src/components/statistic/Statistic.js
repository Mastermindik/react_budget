import { Container } from "react-bootstrap";
import * as V from 'victory';
import { VictoryBar, VictoryLabel, VictoryPie, VictoryTooltip } from "victory";
import "./style.scss"

function Statistic() {
    const data = [
      { x: "A", y: 40 },
      { x: "B", y: 20 },
      { x: "C", y: 30 },
      { x: "D", y: 10 }
    ];
  return<Container className="py-3">
    Statistic
    <div className="statistic">
    <VictoryPie
        data={data}
        colorScale={["#4caf50", "#f44336", "#9c27b0", "#2196f3"]}
        innerRadius={50}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
      />
    
    </div>

  </Container>
}

export default Statistic