import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-green-50">

      {/* HERO */}
      <section className="relative w-full min-h-[50vh] md:min-h-[60vh] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">

  {/* MOBILE */}
  <div
    className="absolute inset-0 bg-cover bg-center md:hidden"
    style={{
      backgroundImage: "url('/hero-mobile.png')"
    }}
  />

  {/* DESKTOP */}
  <div
  className="absolute inset-0 bg-cover hidden md:block"
  style={{
    backgroundImage: "url('/hero-desktop.png')",
    backgroundPosition: "center 70%"
  }}
/>

</div>

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-6 md:pt-10 flex justify-center">

  {/* ================= MOBILE ================= */}
  <div className="flex flex-col items-center text-center md:hidden">

    <h1
      className="font-extrabold text-blue-900
      text-2xl
      drop-shadow-[4px_4px_4px_rgba(0,0,0,0.45)]"
    >
      Bank Sampah Orbit
    </h1>

    <p
      className="text-blue-900
      text-sm
      drop-shadow-[3px_3px_3px_rgba(0,0,0,0.4)]"
    >
      Perumahan Wisma Indah
    </p>

    <Image
      src="/logo-orbit.png"
      alt="Logo Bank Sampah Orbit"
      width={80}
      height={80}
      className="mt-1"
    />

  </div>


  {/* ================= DESKTOP ================= */}
  <div className="hidden md:flex items-center gap-6 text-left">

    <Image
      src="/logo-orbit.png"
      alt="Logo Bank Sampah Orbit"
      width={140}
      height={140}
      className="w-28 lg:w-36"
    />

    <div>

      <h1
        className="font-extrabold text-blue-900
        text-5xl
        lg:text-6xl
        drop-shadow-[4px_4px_4px_rgba(0,0,0,0.45)]"
      >
        Bank Sampah Orbit
      </h1>

      <p
        className="text-blue-900
        text-2xl
        drop-shadow-[3px_3px_3px_rgba(0,0,0,0.4)]"
      >
        Perumahan Wisma Indah
      </p>

    </div>

  </div>

</div>

        {/* WAVE */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            className="w-full h-[200px] md:h-[150px]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#f0fdf4"
              d="M0,224L80,213C160,203,320,181,480,181C640,181,800,203,960,208C1120,213,1280,203,1360,197L1440,192V320H0Z"
            />
          </svg>
        </div>

      </section>


      {/* MENU DASHBOARD */}
      <section className="relative z-20 mx-auto max-w-6xl px-4 -mt-8 pb-14">

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">

          {/* NASABAH */}
          <Link
  href="/nasabah"
  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden aspect-square flex items-center justify-center"
>

  {/* ICON */}
  <Image
    src="/Nasabah1.png"
    alt="Nasabah"
    width={200}
    height={200}
    className="transition-transform group-hover:scale-110"
  />

  {/* TEXT */}
  <div className="absolute bottom-1 left-0 right-0 text-center">
    <span className="text-lg font-semibold text-gray-700">
      Nasabah
    </span>
  </div>

</Link>


          {/* JENIS SAMPAH */}
          <Link
  href="/jenis-sampah"
  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden aspect-square flex items-center justify-center"
>

  {/* ICON */}
  <Image
    src="/Jenis-sampah1.png"
    alt="Jenis-sampah"
    width={200}
    height={200}
    className="transition-transform group-hover:scale-110"
  />

  {/* TEXT */}
  <div className="absolute bottom-1 left-0 right-0 text-center">
    <span className="text-lg font-semibold text-gray-700">
      Jenis Sampah
    </span>
  </div>

</Link>


          {/* TRANSAKSI */}
          <Link
  href="/transaksi"
  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden aspect-square flex items-center justify-center"
>

  {/* ICON */}
  <Image
    src="/Transaksi1.png"
    alt="Transaksi"
    width={200}
    height={200}
    className="transition-transform group-hover:scale-110"
  />

  {/* TEXT */}
  <div className="absolute bottom-1 left-0 right-0 text-center">
    <span className="text-lg font-semibold text-gray-700">
      Transaksi
    </span>
  </div>

</Link>


          {/* STOK */}
          <Link
  href="/stok-sampah"
  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden aspect-square flex items-center justify-center"
>

  {/* ICON */}
  <Image
    src="/Stok1.png"
    alt="Stok Sampah"
    width={200}
    height={200}
    className="transition-transform group-hover:scale-110"
  />

  {/* TEXT */}
  <div className="absolute bottom-1 left-0 right-0 text-center">
    <span className="text-lg font-semibold text-gray-700">
      Stok Sampah
    </span>
  </div>

</Link>


          {/* LAPORAN */}
          <Link
  href="/laporan"
  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden aspect-square flex items-center justify-center"
>

  {/* ICON */}
  <Image
    src="/Laporan1.png"
    alt="Laporan"
    width={200}
    height={200}
    className="transition-transform group-hover:scale-110"
  />

  {/* TEXT */}
  <div className="absolute bottom-1 left-0 right-0 text-center">
    <span className="text-lg font-semibold text-gray-700">
      Laporan
    </span>
  </div>

</Link>


          {/* GRAFIK */}
          <Link
  href="/grafik"
  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden aspect-square flex items-center justify-center"
>

  {/* ICON */}
  <Image
    src="/Grafik1.png"
    alt="Grafik"
    width={200}
    height={200}
    className="transition-transform group-hover:scale-110"
  />

  {/* TEXT */}
  <div className="absolute bottom-1 left-0 right-0 text-center">
    <span className="text-lg font-semibold text-gray-700">
      Grafik
    </span>
  </div>

</Link>

        </div>

      </section>

    </main>
  )
}