import { Link } from 'react-router-dom';

export const Terms = () => (
  <div className="legal-page">
    <nav className="legal-nav">
      <Link to="/" className="back-link">← Späť na hlavnú stránku</Link>
    </nav>
    
    <h1>Podmienky používania</h1>

    <section className="legal-section">
      <h2>1. Všeobecné ustanovenia</h2>
      <p>Používaním našich služieb súhlasíte s týmito podmienkami. Prosím, prečítajte si ich pozorne.</p>
    </section>

    <section className="legal-section">
      <h2>2. Registrácia a účet</h2>
      <ul>
        <li>Musíte mať aspoň 16 rokov</li>
        <li>Poskytnuté údaje musia byť pravdivé</li>
        <li>Zodpovedáte za bezpečnosť svojho hesla</li>
        <li>Jeden email = jeden účet</li>
      </ul>
    </section>

    <section className="legal-section">
      <h2>3. Pravidlá používania</h2>
      <p>Je zakázané:</p>
      <ul>
        <li>Porušovať zákony</li>
        <li>Šíriť škodlivý obsah</li>
        <li>Zneužívať službu</li>
        <li>Zasahovať do bezpečnosti</li>
      </ul>
    </section>

    <section className="legal-section">
      <h2>4. Duševné vlastníctvo</h2>
      <p>Všetok obsah je chránený autorskými právami. Nie je dovolené:</p>
      <ul>
        <li>Kopírovať a distribuovať bez súhlasu</li>
        <li>Modifikovať obsah</li>
        <li>Odstraňovať označenia autorských práv</li>
      </ul>
    </section>

    <section className="legal-section">
      <h2>5. Obmedzenie zodpovednosti</h2>
      <p>Nenesieme zodpovednosť za:</p>
      <ul>
        <li>Výpadky služby</li>
        <li>Stratu dát</li>
        <li>Škody spôsobené tretími stranami</li>
      </ul>
    </section>

    <section className="legal-section">
      <h2>6. Ukončenie služieb</h2>
      <p>Vyhradzujeme si právo:</p>
      <ul>
        <li>Pozastaviť účet</li>
        <li>Ukončiť služby</li>
        <li>Zmeniť podmienky</li>
      </ul>
    </section>

    <footer className="legal-footer">
      <p>Posledná aktualizácia: {new Date().toLocaleDateString()}</p>
      <p>Kontakt: tomulec.peter@gmail.com</p>
    </footer>
  </div>
);