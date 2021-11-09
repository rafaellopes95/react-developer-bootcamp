export default function Investment({ investment = null, reports = [] }) {
  const numberFormatter = new Intl.NumberFormat("pt-br", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  function calculateResult(report) {
    return {
      date: `${report.month} / ${report.year}`,
      value: numberFormatter.format(report.value),
      percent: numberFormatter.format(getDifferenceToPreviousMonth(report)),
    };
  }

  function getDifferenceToPreviousMonth(report) {
    if (report.month === 1) {
      return 0.0;
    } else {
      const currentMonthValue = Number.parseFloat(report.value);
      const previousMonthValue = Number.parseFloat(
        reports[report.month - 2].value
      );
      return calculatePercentage(previousMonthValue, currentMonthValue);
    }
  }

  function calculatePercentage(a, b) {
    return ((b - a) / a) * 100.0;
  }

  return (
    <div>
      <h3>{investment.description}</h3>
      <h4>
        Rendimento total:{" "}
        {numberFormatter.format(
          Number.parseFloat(reports[reports.length - 1].value) -
            Number.parseFloat(reports[0].value)
        )}
        {" ("}
        {numberFormatter.format(
          calculatePercentage(
            Number.parseFloat(reports[0].value),
            Number.parseFloat(reports[reports.length - 1].value)
          )
        )}
        {"%)"}
      </h4>
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
              <td className="border border-blue-500 px-1 text-right">
                {data.value}
              </td>
              <td className="border border-blue-500 px-1 text-right">{`${data.percent}%`}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
