export async function apiUpdateRow(id, row) {
  await fetch(`https://limited-joleen-fiodarks-5b0af2c2.koyeb.app/api/weather/measurements/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
  });
}

