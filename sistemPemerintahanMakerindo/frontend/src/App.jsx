import { useState } from 'react'
import './App.css'

function App(){

// state  inputan NIK -->
const [nik, setNik] = useState('')
// state data warga -->
const [dataWarga, setDataWarga] = useState(null)
// state pesan error -->
const [error, setError] = useState('')
// state status loading -->
const [loading, setLoading] = useState(false)


const handleInput = (e) => {
  const value = e.target.value
  setNik(value.replace(/\D/g, ''))
  if(error) setError('')
  if(dataWarga) setDataWarga(null)
}
  
const handleFindData = async () => {
  if(nik.length !== 16){
    setError('NIK harus 16 digit')
    setDataWarga(null)
    return
  }
  
  setLoading(true)
  try{
    const response = await fetch('http://localhost:5000/api/citizens/' + nik, {
      method: 'GET',
      headers: {
        'x-api-key': 'your-secret-key'
      }
    })
    const responseData = await response.json()
    if(response.ok){
      setDataWarga(responseData.data)
    }else{
      setError(responseData.message)
    }
  }catch(err){
    setError('Gagal terhubung ke server')
  }finally{
    setLoading(false)
  }
}

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md transition-all">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600 shadow-sm">
          </div>
        </div>
        <h1 className="text-2xl font-extrabold mb-6 text-center text-gray-800">Validasi E-KTP</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Masukkan 16 Digit NIK</label>
          <input 
             type="text" 
             value={nik} 
             onChange={handleInput} 
             maxLength={16}
             placeholder="Contoh: 3201234567890001"
             className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${error === 'NIK harus 16 digit' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`} 
          />
          <button 
              onClick={handleFindData}
              className="mt-5 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
          >
              Cari Data
          </button>
        </div>

        {}
        {loading && <p className="text-blue-500 font-semibold text-center mb-4 animate-pulse">Memeriksa database...</p>}
        {error   && <p className="text-red-500 font-medium text-center mb-4 bg-red-50 py-2 rounded-lg border border-red-100">{error}</p>}

        {}
        {dataWarga && (
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Hasil Ditemukan</h2>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-semibold">NIK:</span> {dataWarga.nik}</p>
              <p className="text-sm"><span className="font-semibold">Nama:</span> {dataWarga.name}</p>
              <p className="text-sm"><span className="font-semibold">Jenis Kelamin:</span> {dataWarga.gender}</p>
              <p className="text-sm"><span className="font-semibold">Tanggal Lahir:</span> {dataWarga.birth_date}</p>
              <p className="text-sm"><span className="font-semibold">Alamat:</span> {dataWarga.address}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default App;