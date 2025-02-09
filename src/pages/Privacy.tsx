import { PageLayout } from '../components/Layout/PageLayout';

export const Privacy = () => (
  <PageLayout title="Zásady ochrany súkromia">
    <section className="legal-section">
      <h2>1. Zber údajov</h2>
      <p>Zbierame nasledujúce údaje:</p>
      <ul>
        <li>Email (pre účely autentifikácie)</li>
        <li>Meno a priezvisko (voliteľné)</li>
        <li>Údaje o prihlásení (čas, IP adresa)</li>
      </ul>
    </section>

    <section className="legal-section">
      <h2>2. Použitie údajov</h2>
      <p>Vaše údaje používame na:</p>
      <ul>
        <li>Poskytovanie našich služieb</li>
        <li>Zlepšovanie používateľského zážitku</li>
        <li>Komunikáciu s vami</li>
      </ul>
    </section>

    <section className="legal-section">
      <h2>3. Ochrana údajov</h2>
      <p>Vaše údaje chránime pomocou:</p>
      <ul>
        <li>Šifrovania (SSL/TLS)</li>
        <li>Bezpečného uloženia (Firebase)</li>
        <li>Pravidelných bezpečnostných auditov</li>
      </ul>
    </section>

    <section className="legal-section">
      <h2>4. Cookies</h2>
      <p>Používame cookies na:</p>
      <ul>
        <li>Autentifikáciu</li>
        <li>Zapamätanie preferencií</li>
        <li>Analytické účely</li>
      </ul>
    </section>

    <section className="legal-section">
      <h2>5. Vaše práva</h2>
      <p>Máte právo na:</p>
      <ul>
        <li>Prístup k vašim údajom</li>
        <li>Opravu údajov</li>
        <li>Vymazanie údajov</li>
        <li>Obmedzenie spracovania</li>
      </ul>
    </section>

    <section className="legal-section">
      <h2>6. Kontakt</h2>
      <p>Pre otázky ohľadom ochrany súkromia nás kontaktujte:</p>
      <ul>
        <li>Email: tomulec.peter@gmail.com</li>
        <li>Adresa: Cursor AI, s.r.o.</li>
        <li>Telefón: +421 XXX XXX XXX</li>
      </ul>
    </section>
  </PageLayout>
); 