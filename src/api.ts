const API_URL = 'http://localhost:5000/api';

export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

export async function makePayment(user_id: number, amount: number, status: string) {
  const res = await fetch(`${API_URL}/payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, amount, status })
  });
  return res.json();
}

export async function registerEvent(user_id: number, event_name: string) {
  const res = await fetch(`${API_URL}/register-event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, event_name })
  });
  return res.json();
}
