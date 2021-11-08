export default function Investment({ investment = null, reports = [] }) {
  function calculateResult(report) {
    return {
      date: `${report.month} / ${report.year}`,
      value: report.value,
      percent: getDifferenceToPreviousMonth(report),
    };
  }

  function getDifferenceToPreviousMonth(report) {
    if (report.month === 1) {
      return 0.0;
    } else {
      const currentMonthValue = report.value;
      const previousMonthValue = reports[report.month - 2].value;
      return (
        ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100
      );
    }
  }

  return (
    <div>
      <p>{investment.id}</p>
      <table className="table border border-blue-500">
        <tr className="border border-blue-500">
          <th className="border border-blue-500 px-1">Mês / Ano</th>
          <th className="border border-blue-500 px-1">Resultado</th>
          <th className="border border-blue-500 px-1">Resultado em %</th>
        </tr>
        {reports.map((report) => {
          const data = calculateResult(report);
          return (
            <tr>
              <td className="border border-blue-500 px-1">{data.date}</td>
              <td className="border border-blue-500 px-1">{data.value}</td>
              <td className="border border-blue-500 px-1">{data.percent}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
