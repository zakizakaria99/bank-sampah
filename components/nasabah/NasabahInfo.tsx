import { Nasabah } from "@/types/nasabah"

type Props = {
  nasabah: Nasabah
}

export default function NasabahInfo({ nasabah }: Props) {

  return (
    <div className="bg-green-50 p-4 md:p-6 rounded-lg mb-6 text-sm md:text-base">

      <p><b>Nama :</b> {nasabah.nama}</p>
      <p><b>Alamat :</b> {nasabah.alamat}</p>
      <p><b>No HP :</b> {nasabah.no_hp}</p>

    </div>
  )
}