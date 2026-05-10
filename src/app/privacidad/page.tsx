import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Política de Privacidad - ReformasPro',
  description: 'Política de privacidad y protección de datos de ReformasPro.',
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Política de Privacidad</h1>
          
          <div className="glass rounded-3xl p-8 space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white">1. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de sus datos personales es ReformasPro, con domicilio en Madrid, España, y email de contacto: hola@reformaspro.es
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">2. Finalidad del tratamiento</h2>
            <p>Sus datos personales serán tratados para las siguientes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Atender su solicitud de presupuesto o información sobre nuestros servicios</li>
              <li>Gestionar la relación comercial y contractual</li>
              <li>Enviar comunicaciones comerciales sobre nuestros servicios, siempre que nos haya dado su consentimiento</li>
              <li>Cumplir con las obligaciones legales aplicables</li>
            </ul>

            <h2 className="text-2xl font-bold text-white pt-4">3. Base legal</h2>
            <p>El tratamiento de sus datos se basa en:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consentimiento:</strong> Para el envío de comunicaciones comerciales y la atención de consultas</li>
              <li><strong>Ejecución de contrato:</strong> Para la gestión de los servicios solicitados</li>
              <li><strong>Interés legítimo:</strong> Para el mantenimiento de la relación comercial</li>
            </ul>

            <h2 className="text-2xl font-bold text-white pt-4">4. Destinatarios</h2>
            <p>
              Sus datos no serán cedidos a terceros, salvo obligación legal. Podrán acceder a sus datos los proveedores de servicios que necesitemos contratar para la prestación del servicio.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">5. Transferencias internacionales</h2>
            <p>
              No se realizan transferencias internacionales de sus datos personales.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">6. Plazo de conservación</h2>
            <p>
              Sus datos se conservarán durante el tiempo necesario para cumplir con las finalidades para las que fueron recogidos, y posteriormente durante los plazos de conservación establecidos por la legislación aplicable.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">7. Derechos</h2>
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> Obtener confirmación sobre si estamos tratando sus datos</li>
              <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
              <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento</li>
              <li><strong>Oposición:</strong> Oponerse al tratamiento</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
            </ul>
            <p className="pt-2">
              Para ejercer estos derechos, puede contactar con nosotros en hola@reformaspro.es
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">8. Medidas de seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos personales contra el tratamiento no autorizado o ilegal y contra la pérdida, destrucción o daño accidental.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">9. Menores de edad</h2>
            <p>
              Los servicios de ReformasPro no están dirigidos a menores de edad. No recopilamos deliberadamente datos personales de menores de edad.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">10. Cambios en la política</h2>
            <p>
              Podemos modificar esta política de privacidad periodically. Cualquier cambio será publicado en esta página.
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