import './PiechartComponent.css'
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
const PiechartComponent = ({ filteredTransactions }) => {
    const COLORS = [
        "#8B5CF6",
        "#F97316",
        "#3B82F6",
        "#22C55E",
        "#EF4444",
        "#06B6D4",
        "#EAB308",
        "#EC4899",
        "#14B8A6"
    ];


    // Calculate total income from the filtered transactions.
    const income = filteredTransactions
        .filter(transaction => transaction.type === "Income")
        .reduce((total, transaction) => total + Number(transaction.amount), 0);

    // Calculate total expenses from the filtered transactions.
    const expense = filteredTransactions
        .filter(transaction => transaction.type === "Expense")
        .reduce((total, transaction) => total + Number(transaction.amount), 0);

    // Calculate the remaining balance by subtracting total expenses from total income.
    const balance = income - expense;


    // Group filtered transactions by category and calculate the total amount for each category.
    // Transform the array into an object using .reduce()
    const categoryData = filteredTransactions.reduce((acc, transaction) => {

        // Add the transaction amount to the existing category total.
        if (acc[transaction.category]) {
            acc[transaction.category] = {
                amount:
                    Number(acc[transaction.category].amount) +
                    Number(transaction.amount)
            };
        } else {
            // Create a new category with the transaction amount as its initial total.
            acc[transaction.category] = {
                amount: Number(transaction.amount)
            };
        }

        return acc;
    }, {});


    // Convert the category object into an array format required by the chart.
    const chartData = Object.entries(categoryData).map(([category, data]) => {

        return {
            category: category,
            amount: data.amount
        };

    });
    return (
        <div>
            <div className="more-detailed">

                <p className="summary-title">Transaction Summary</p>

                <div className="summary-body">

                    <div className="detailed">

                        <div className="details detail-income">
                            <p>Total Income</p>
                            <div className="amount">{income}</div>
                        </div>

                        <div className="details detail-expense">
                            <p>Total Expense</p>
                            <div className="amount">{expense}</div>
                        </div>

                        <div className="details detail-saving">
                            <p>Net Saving</p>
                            <div className="amount">{balance}</div>
                        </div>

                    </div>

                    <div className="chart-container">

                        {chartData.length > 0 ? (
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                                wrapperStyle={{
                                    position: "relative",
                                    cursor: "default"
                                }}
                            >
                                <PieChart>

                                    <Pie
                                        data={chartData}
                                        dataKey="amount"
                                        nameKey="category"
                                        cx="40%"
                                        cy="40%"
                                        innerRadius={42}
                                        outerRadius={62}
                                    >
                                        {chartData.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0F172A",
                                            border: "1px solid #334155",
                                            borderRadius: "8px",
                                            color: "#F8FAFC",
                                            fontSize: "12px",
                                            padding: "8px 10px",
                                            textAlign: "center"
                                        }}
                                        itemStyle={{
                                            color: "#F8FAFC"
                                        }}
                                    />

                                    <Legend
                                        layout="vertical"
                                        align="right"
                                        verticalAlign="middle"
                                        iconType="square"
                                        wrapperStyle={{
                                            position: "absolute",
                                            width: "120px",
                                            height: "auto",
                                            right: "5px",
                                            top: "50%",
                                            transform: "translateY(-64%)",
                                            fontSize: "10px",
                                            lineHeight: "16px"
                                        }}
                                    />

                                </PieChart>
                            </ResponsiveContainer>

                        ) : (

                            <div className="empty-chart">

                                <div className="empty-chart-icon">
                                    📊
                                </div>

                                <p className="empty-chart-title">
                                    No data available
                                </p>

                                <span className="empty-chart-text">
                                    Add a transaction to see your spending breakdown.
                                </span>

                            </div>

                        )}

                    </div>

                </div>

            </div>
        </div>
    )
}

export default PiechartComponent
