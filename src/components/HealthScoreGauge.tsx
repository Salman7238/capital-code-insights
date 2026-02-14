import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface HealthScoreGaugeProps {
  score: number;
}

export const HealthScoreGauge = ({ score }: HealthScoreGaugeProps) => {
  const color = score < 40 ? "hsl(0, 72%, 51%)" : score < 65 ? "hsl(45, 93%, 47%)" : "hsl(142, 72%, 45%)";
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  return (
    <div className="relative flex flex-col items-center">
      <p className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Technical Health
      </p>
      <div className="relative h-28 w-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="75%"
              outerRadius="100%"
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="hsl(220, 14%, 12%)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-bold text-foreground">{score}</span>
          <span className="font-mono text-[10px] text-muted-foreground">/100</span>
        </div>
      </div>
    </div>
  );
};
