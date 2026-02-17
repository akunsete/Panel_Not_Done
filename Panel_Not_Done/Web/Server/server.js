const http = require("http");
const os = require("os");

function cpuAverage() {
  const cpus = os.cpus();
  let idle = 0, total = 0;

  cpus.forEach(core => {
    for (let type in core.times) {
      total += core.times[type];
    }
    idle += core.times.idle;
  });

  return { idle, total };
}

function getCPUUsage(callback) {
  const start = cpuAverage();

  setTimeout(() => {
    const end = cpuAverage();

    const idleDiff = end.idle - start.idle;
    const totalDiff = end.total - start.total;

    const usage = 100 - Math.round((idleDiff / totalDiff) * 100);
    callback(usage);
  }, 100);
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/system") {
    getCPUUsage(cpuPercent => {
      const totalRam = os.totalmem();
      const freeRam = os.freemem();
      const usedRam = totalRam - freeRam;

      const ramPercent = ((usedRam / totalRam) * 100).toFixed(1);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        cpuPercent,
        ramPercent
      }));
    });
    return;
  }

  res.end("OK");
});

server.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
