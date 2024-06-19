document.addEventListener("DOMContentLoaded", function() {
  let result = [];

  function trapezoidalRule(a, b, n) {
    function f(x) {
      return x / (1 + x);
    }
  
    const h = (b - a) / n;
    let sum = f(a) + f(b);
  
    for (let i = 1; i < n; i++) {
      sum += 2 * f(a + i * h);
    }
  
    return (h / 2) * sum;
  }
  
  function simpsonsOneThreeRule(a, b, n) {
    function f(x) {
      return x / (1 + x);
    }
  
    // if (n % 2 !== 0) {
    //   throw new Error("n must be even for Simpson's rule");
    // }
  
    const h = (b - a) / n;
    let sum = f(a) + f(b);
  
    for (let i = 1; i < n; i += 2) {
      sum += 4 * f(a + i * h);
    }
  
    for (let i = 2; i < n; i += 2) {
      sum += 2 * f(a + i * h);
    }
  
    return (h / 3) * sum;
  }
  
  function simpsonsThreeEighthsRule(a, b, n) {
    function f(x) {
      return x / (1 + x);
    }
  
    // if (n % 3 !== 0) {
    //   throw new Error("n must be a multiple of 3 for Simpson's 3/8 rule");
    // }
  
    const h = (b - a) / n;
    let sum = f(a) + f(b);
  
    for (let i = 1; i < n; i++) {
      if (i % 3 === 0) {
        sum += 2 * f(a + i * h);
      } else {
        sum += 3 * f(a + i * h);
      }
    }
  
    return (3 * h / 8) * sum;
  }
  
  //error calculation
  function calculateRelativeError(approximateValue, exactValue) {
    return Math.abs((approximateValue - exactValue) / exactValue);
}


  let a, b, n;
  function submitForm(event) {
    event.preventDefault();

    a = parseFloat(document.getElementById("input1").value);
    b = parseFloat(document.getElementById("input2").value);
    n = parseInt(document.getElementById("input3").value);

    const results = [
      trapezoidalRule(a, b, n).toFixed(6),
      simpsonsOneThreeRule(a, b, n).toFixed(6),
      simpsonsThreeEighthsRule(a, b, n).toFixed(6)
    ];
    
    // Display integration results
    showLogMsg("Integration Results", results);
  }

  // Reset form function
  function resetForm() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    resetLog();
  }

  function showLogMsg(title, results) {
    const logMsg = document.getElementById("logMsg");

    // Create table if it doesn't exist
    let table = logMsg.querySelector("table");
    if (!table) {
        const p1 = document.createElement("p");
        p1.style.fontWeight = "bold";
        p1.textContent = title;
        logMsg.appendChild(p1);

        table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        // Create table header
        const headerRow = document.createElement("tr");
        headerRow.style.position = "sticky";
        headerRow.style.top = "0";
        headerRow.style.backgroundColor = "#f1f1f1";
        const headers = ["Trapezoidal Rule", "Simpsons 1/3 Rule", "Simpson 3/8 Rule"];
        headers.forEach((header) => {
            const th = document.createElement("th");
            th.textContent = header;
            th.style.border = "1px solid black";
            th.style.backgroundColor = "#f1f1f1";
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
        logMsg.appendChild(table);
    }

    // Create table body row
    const bodyRow = document.createElement("tr");
    results.forEach((result) => {
        const td = document.createElement("td");
        td.textContent = result;
        td.style.border = "1px solid black";
        td.style.padding="5px";
        bodyRow.appendChild(td);
    });
    table.appendChild(bodyRow);
    logMsg.scrollTop = logMsg.scrollHeight;

    // Prepare data for charts
    const chartData = {
        series: results.map(Number),
        labels: ["Trapezoidal Rule", "Simpsons 1/3 Rule", "Simpson 3/8 Rule"]
    };

    // Render pie chart
    const pieOptions = {
        chart: {
            type: "pie",
            height: 350
        },
        labels: chartData.labels,
        series: chartData.series
    };
    const pieChart = new ApexCharts(document.querySelector("#pieChart"), pieOptions);
    pieChart.render();

    // Render bar chart
    const barOptions = {
        chart: {
            type: "bar",
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: chartData.labels
        },
        series: [{
            data: chartData.series
        }]
    };
    const barChart = new ApexCharts(document.querySelector("#barChart"), barOptions);
    barChart.render();
}


  function resetLog() {
    const logMsg = document.getElementById("logMsg");
    logMsg.innerHTML = "";
  }

  document.querySelector("form").addEventListener("submit", submitForm);
  document.querySelector(".reset").addEventListener("click", resetForm);
});
