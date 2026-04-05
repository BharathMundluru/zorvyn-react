const API_URL = "http://localhost:8080/api/transactions";

export const fetchTransactions = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

export const addTransactionApi = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Add failed");
  return res.json();
};

export const deleteTransactionApi = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete failed");
};