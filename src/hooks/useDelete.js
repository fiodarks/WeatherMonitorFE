export async function apiDeleteRow(id) {
  await fetch(`https://limited-joleen-fiodarks-5b0af2c2.koyeb.app/api/weather/measurements/${id}`, { method: "DELETE" });
}