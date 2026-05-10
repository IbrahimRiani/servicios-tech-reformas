import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Aviso Legal - ReformasPro',
  description: 'Aviso legal y condiciones de uso del sitio web ReformasPro.',
}

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Aviso Legal</h1>
          
          <div className="glass rounded-3xl p-8 space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white">1. Identificación del titular</h2>
            <p>
              En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico, le informamos de que el titular de este sitio web es:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Denominación social:</strong> ReformasPro</li>
              <li><strong>NIF:</strong> XXXXXXXXXX</li>
              <li><strong>Domicilio:</strong> Madrid, España</li>
              <li><strong>Email:</strong> info@reformaspro.live</li>
            </ul>

            <h2 className="text-2xl font-bold text-white pt-4">2. Objeto</h2>
            <p>
              El presente aviso legal regula el acceso y uso del sitio web reformaspro.es (en adelante, el "Sitio Web"), cuya finalidad es proporcionar información sobre los servicios de reformas, pintura y limpieza ofrecidos por ReformasPro.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">3. Acceso y uso</h2>
            <p>
              El acceso al Sitio Web es gratuito y no requiere registro. El usuario se compromete a utilizar el Sitio Web de forma lawful y de acuerdo con las presentes condiciones. Queda prohibido cualquier uso del Sitio Web con fines ilícitos o que puedan dañar los derechos e intereses de ReformasPro o de terceros.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">4. Propiedad intelectual</h2>
            <p>
              Todos los contenidos del Sitio Web (textos, imágenes, gráficos, logotipos, iconos, software, etc.) son propiedad de ReformasPro o de sus respectivos titulares, y están protegidos por la legislación sobre propiedad intelectual e industrial.
            </p>
            <p>
              Queda prohibida la reproducción, distribución, modificación o comunicación pública de los contenidos del Sitio Web sin la autorización expresa de ReformasPro.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">5. Responsabilidad</h2>
            <p>
              ReformasPro no se hace responsable de los daños y perjuicios que puedan derivarse del uso del Sitio Web, incluyendo, entre otros, errores u omisiones en los contenidos, falta de disponibilidad del Sitio Web o la transmisión de virus o programas maliciosos.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">6. Enlaces externos</h2>
            <p>
              El Sitio Web puede contener enlaces a sitios web de terceros. ReformasPro no exercised control sobre estos sitios y no assume responsibility for their contents.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">7. Legislación aplicable</h2>
            <p>
              Las presentes condiciones se regirán por la legislación española. Para la resolución de cualquier controversia que pudiera derivarse de la utilización del Sitio Web, las partes acuerdan someterse a los Juzgados y Tribunales de Madrid capital.
            </p>

            <p className="pt-4 text-sm text-gray-500">
              Última actualización: Mayo 2024
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              ← Volver a la página principal
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2024 ReformasPro. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}