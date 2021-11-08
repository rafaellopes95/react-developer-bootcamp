import data from "../services/investments.json";
import Investment from "./Investment";

export default function Investments() {
  const investments = data.investments;
  const reports = data.reports;

  function getReportsByInvestmentId(investmentId) {
    return reports
      .filter((report) => report.investmentId === investmentId)
      .sort((a, b) => a.month - b.month);
  }

  // console.log(getReportsByInvestmentId("3176856a-82cf-4ce9-8803-c65107c7ad5e"));

  return (
    <div>
      {investments.map((investment) => {
        return (
          <div key={investment.id} className="border border-gray-800 p-1 m-1">
            <Investment
              investment={investment}
              reports={getReportsByInvestmentId(investment.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
