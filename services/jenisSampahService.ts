import { supabase } from "@/lib/supabase"
import { JenisSampah } from "@/types/jenisSampah"

export async function getJenisSampah(): Promise<JenisSampah[]> {

  const { data, error } = await supabase
    .from("jenis_sampah")
    .select("*")

  if (error) {
    console.error(error)
    return []
  }

  return data || []

}

export async function tambahJenisSampah(
  data: Omit<JenisSampah, "id">
) {

  const { error } = await supabase
    .from("jenis_sampah")
    .insert([data])

  if (error) {
    console.error(error)
  }

}

export async function updateJenisSampah(
  id: string,
  data: Omit<JenisSampah, "id">
) {

  const { error } = await supabase
    .from("jenis_sampah")
    .update(data)
    .eq("id", id)

  if (error) {
    console.error(error)
  }

}

export async function hapusJenisSampah(id: string) {

  const { error } = await supabase
    .from("jenis_sampah")
    .delete()
    .eq("id", id)

  if (error) {
    console.error(error)
  }

}