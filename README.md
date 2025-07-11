# poxyip-table-worker

部署到 cloudflare workers/pages 后，可更改csv数据源的链接，dataUrl 来源：地址栏参数 > 环境变量 > 默认值。

### 1、网页效果

<img src="images\1.png" />

<img src="images\2.png" />

### 2、临时更换数据源

```
https://<worker>.<username>.workers.dev/?url=https://raw.githubusercontent.com/FoolVPN-ID/Nautica/refs/heads/main/rawProxyList.txt
```

