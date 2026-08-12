import dns from "node:dns/promises";

try {
  const records = await dns.resolveSrv(
    "_mongodb._tcp.cluster0.q7u6hgn.mongodb.net"
  );
  console.log(records);
} catch (err) {
  console.error(err);
}