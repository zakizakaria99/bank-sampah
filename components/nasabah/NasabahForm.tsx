"use client"

interface Props {
  nama: string
  alamat: string
  noHp: string
  setNama: (v: string) => void
  setAlamat: (v: string) => void
  setNoHp: (v: string) => void
  simpan: () => void
  editId: string | null
  onCancelEdit: () => void
}

export default function NasabahForm({
  nama,
  alamat,
  noHp,
  setNama,
  setAlamat,
  setNoHp,
  simpan,
  editId,
  onCancelEdit
}: Props) {

  return (

    <div className="grid grid-cols-3 gap-4 mb-6">

      <input
        className="border border-green-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <input
        className="border border-green-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Alamat"
        value={alamat}
        onChange={(e) => setAlamat(e.target.value)}
      />

      <input
        className="border border-green-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="No HP"
        value={noHp}
        onChange={(e) => setNoHp(e.target.value)}
      />

      <div className="col-span-3 flex gap-3">

        <button
          onClick={simpan}
          type="button"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition"
        >
          {editId ? "Update Nasabah" : "Tambah Nasabah"}
        </button>

        {editId && (
          <button
            onClick={onCancelEdit}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}

      </div>

    </div>

  )
}