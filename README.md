# Studi Kasus – Sistem Pemerintahan (E-KTP API)
<img width="1919" height="936" alt="Screenshot 2026-04-02 130908" src="https://github.com/user-attachments/assets/83391990-f5d6-452c-b75f-bd47cb5bed7a" />
<img width="1918" height="929" alt="Screenshot 2026-04-02 130902" src="https://github.com/user-attachments/assets/69733ac3-e413-47b8-9cf3-57d0a4b59990" />
<img width="1908" height="943" alt="Screenshot 2026-04-02 130853" src="https://github.com/user-attachments/assets/f6fd8554-84a7-46f0-8afc-6ee556172bbe" />


Project ini terdiri dari dua bagian:
* **Backend** (`backend/`) — Node.js + Express JS
* **Frontend** (`frontend/`) — React + Vite + Tailwind CSS

---

## 1. Clone Repository

```bash
git clone https://github.com/MuhammadFauzanL/sistemPemerintahan_Makerindo
cd sistemPemerintahanMakerindo
```

---

## 2. Jalankan Backend

```bash
cd backend
npm install
node src/server.js
```

Backend akan berjalan pada: `http://localhost:5000`

---

## 3. Jalankan Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan pada: `http://localhost:5173`

---

## 4. Keamanan API (API KEY)

Gunakan key berikut pada header request:
* **Header:** `x-api-key`
* **Value:** `your-secret-key`

---

## 5. Test Endpoint menggunakan CURL

```bash
curl -X GET http://localhost:5000/api/citizens/3201234567890001 \
  -H "x-api-key: your-secret-key"
```

Jika berhasil, backend akan memvalidasi data dan mengirimkan data warga dalam format JSON.
