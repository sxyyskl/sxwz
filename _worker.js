var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/worker.js
var defaultUrl = `https://raw.githubusercontent.com/${atob("Rm9vbFZQTi1JRC9OYXV0aWNh")}/refs/heads/main/${atob("cHJveHlMaXN0LnR4dA")}`;
var worker_default = {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const paramUrl = url.searchParams.get("url");
      const envUrl = env.CSV_URL;
      const dataUrl = paramUrl || envUrl || defaultUrl;
      const res = await fetch(dataUrl);
      if (!res.ok) throw new Error("Fetch failed");
      const txt = await res.text();
      const rows = txt.trim().split("\n").map((line) => {
        const parts = line.trim().split(",");
        const ip = parts[0]?.trim() || "";
        const port = parts[1]?.trim() || "";
        const cc = parts[2]?.trim() || "";
        const org = parts.slice(3).join(",").trim();
        return [ip, port, cc, org];
      }).filter((row) => row.every((cell) => cell.length > 0));
      return new Response(renderHTML(rows, dataUrl), {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    } catch (err) {
      return new Response(renderHTML([], null), {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }
  }
};
function renderHTML(rows, dataUrl) {
  const tableRows = rows.length ? rows.map(
    ([ip, port, cc, org]) => `
        <tr>
          <td>${escapeHTML(ip)}</td>
          <td>${escapeHTML(port)}</td>
          <td>${escapeHTML(cc)}</td>
          <td>${escapeHTML(org)}</td>
        </tr>`
  ).join("") : `<tr><td colspan="4" style="text-align: center; font-style: italic; color: #666;">No data available</td></tr>`;
  return `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>ProxyIP Table</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="data-url" content="${escapeHTML(dataUrl || "")}">
	<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
	<link rel="stylesheet" href="https://cdn.datatables.net/scroller/2.2.0/css/scroller.dataTables.min.css">
	<style>
		body {
			min-height: 100vh;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #eef1f5;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		}

		.container {
			background: #fff;
			border-radius: 12px;
			padding: 2em;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
			width: 100%;
			max-width: 1100px;
		}

		thead input {
			width: 100%;
			padding: 4px;
			box-sizing: border-box;
			font-size: 0.9em;
		}

		.filters th {
			background-color: #f5f5f5;
		}

		#ip-table th:nth-child(1),
		#ip-table td:nth-child(1) {
			min-width: 140px;
		}

		#ip-table th:nth-child(2),
		#ip-table td:nth-child(2) {
			min-width: 80px;
			text-align: center;
		}

		#ip-table th:nth-child(3),
		#ip-table td:nth-child(3) {
			min-width: 100px;
		}

		#ip-table th:nth-child(4),
		#ip-table td:nth-child(4) {
			min-width: 240px;
			word-break: break-word;
		}

		.dataTables_scrollBody {
			max-height: 540px !important;
			overflow-y: auto !important;
		}
	</style>
</head>

<body>
	<div class="container">
		<table id="ip-table" class="display nowrap" style="width:100%">
			<thead>
				<tr>
					<th>IP</th>
					<th>Port</th>
					<th>Country</th>
					<th>Organization</th>
				</tr>
				<tr class="filters">
					<th><input type="text" placeholder="Filter IP" id="filter-ip"></th>
					<th><input type="text" placeholder="Filter Port" id="filter-port"></th>
					<th><input type="text" placeholder="Filter Country" id="filter-country"></th>
					<th><input type="text" placeholder="Filter Org" id="filter-org"></th>
				</tr>
			</thead>
			<tbody>
				${tableRows}
			</tbody>
		</table>
	</div>

	<script src="https://code.jquery.com/jquery-3.7.1.min.js"><\/script>
	<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"><\/script>
	<script src="https://cdn.datatables.net/scroller/2.2.0/js/dataTables.scroller.min.js"><\/script>
	<script>
		const dataUrl = document.querySelector('meta[name="data-url"]')?.content;
		console.log("\u5F53\u524D\u6570\u636E\u6E90URL:", dataUrl);
		$(document).ready(function () {
			const table = $('#ip-table').DataTable({
				scrollY: '500px',
				scrollCollapse: true,
				scroller: true,
				deferRender: true,
				paging: true,
				pageLength: 100,
				autoWidth: false,
				order: [],
				orderCellsTop: true,
				dom: 'lrtip',
			});
			$('#filter-ip').on('input', function () {
				table.column(0).search(this.value).draw();
			});
			$('#filter-port').on('input', function () {
				table.column(1).search(this.value).draw();
			});
			$('#filter-country').on('input', function () {
				table.column(2).search(this.value).draw();
			});
			$('#filter-org').on('input', function () {
				table.column(3).search(this.value).draw();
			});
		});
	<\/script>
</body>

</html>
`;
}
__name(renderHTML, "renderHTML");
function escapeHTML(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(escapeHTML, "escapeHTML");
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
