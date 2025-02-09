import { PageLayout } from '../components/Layout/PageLayout';

export const About = () => (
  <PageLayout title="O nás">
    <div className="about-content">
      <p>Built with modern web technologies for optimal performance and developer experience.</p>
      <div className="tech-stack">
        <span className="tech-badge">React</span>
        <span className="tech-badge">TypeScript</span>
        <span className="tech-badge">Vite</span>
        <span className="tech-badge">Firebase</span>
      </div>
    </div>
  </PageLayout>
); 