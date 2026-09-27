import { AlertTriangle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Cotizador } from "@/components/cotizador"
import { createClient } from "@/lib/supabase/server"
import type { Servicio } from "@/lib/servicios"

export const dynamic = "force-dynamic"

async function getServicios(): Promise<{ servicios: Servicio[]; error: boolean }> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("Servicios")
    .select("id, nombre, categoria, precio_base")
    .order("categoria", { ascending: true })
    .order("nombre", { ascending: true })

  if (error) {
    console.log("[v0] Error al obtener servicios:", error.message)
    return { servicios: [], error: true }
  }

  return { servicios: (data ?? []) as Servicio[], error: false }
}

export default async function Page() {
  const { servicios, error } = await getServicios()

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        <section className="mb-8 text-center sm:mb-10">
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            Cotización online
          </span>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Cotiza tu servicio
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-base text-muted-foreground sm:text-lg">
            Obtén un valor referencial y envíanos tu solicitud.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          {error ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <AlertTriangle className="size-8 text-destructive" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                No pudimos cargar los servicios en este momento. Vuelve a intentarlo más tarde.
              </p>
            </div>
          ) : servicios.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <AlertTriangle className="size-8 text-muted-foreground" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                Aún no hay servicios disponibles para cotizar.
              </p>
            </div>
          ) : (
            <Cotizador servicios={servicios} />
          )}
        </section>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          El valor mostrado es referencial y puede variar según la evaluación final del servicio.
        </p>
      </main>
    </div>
  )
}
