import { useState, useEffect } from 'react';
import { 
  Server, 
  Cpu, 
  ArrowRight, 
  Users, 
  Mail, 
  Linkedin, 
  Github, 
  Terminal, 
  Sliders, 
  Menu, 
  X 
} from 'lucide-react';

// Interfaces for structured data
interface Milestone {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  teamSize: string;
  bullets: string[];
  tech: string[];
}

interface ArchNode {
  id: string;
  title: string;
  sub: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  description: string;
  techDetails: string;
  metric: string;
}

interface SkillCategory {
  category: string;
  icon: string;
  tags: { name: string; highlight: boolean }[];
}

export default function App() {
  // Mobile Nav Drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive AWS Architecture Explorer state
  const [activeNode, setActiveNode] = useState<string>('gateway');
  
  // Career Milestones Timeline state
  const [activeMilestone, setActiveMilestone] = useState<string>('lead');
  
  // Skills Filter state
  const [skillsFilter, setSkillsFilter] = useState<string>('All');

  // Simulator state
  const [simAmount, setSimAmount] = useState<string>('1500');
  const [simCycle, setSimCycle] = useState<string>('Monthly');
  const [simPromo, setSimPromo] = useState<boolean>(true);
  const [simCountry, setSimCountry] = useState<string>('US');
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<{ amount: number; interest: number; text: string } | null>(null);

  // Auto-scroll logic for active navigation section
  const [activeSection, setActiveSection] = useState<string>('hero');
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'architecture', 'timeline', 'skills', 'simulator', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AWS Architecture Node configurations
  const archNodes: ArchNode[] = [
    {
      id: 'gateway',
      title: 'API Gateway',
      sub: 'Traffic Routing',
      icon: '🌐',
      color: 'var(--accent-indigo)',
      x: 10,
      y: 50,
      description: 'The front door of our application, exposing RESTful endpoints. Standardized routes route HTTP requests directly to downstream AWS Lambda functions, with throttling controls to safeguard backend APIs.',
      techDetails: 'Enforces security policies, rate-limiting, and CORS configurations. Configured fully using CloudFormation Infrastructure-as-Code.',
      metric: 'Surge handling: 250K+ peak daily calls'
    },
    {
      id: 'lambda-payment',
      title: 'Payment Lambda',
      sub: 'Transaction Logic',
      icon: '⚡',
      color: 'var(--accent-cyan)',
      x: 35,
      y: 25,
      description: 'A serverless execution environment handling real-time payment submissions, audit writes, and integration authorizations. Refactored from synchronous legacy blocks to clean event-driven handlers.',
      techDetails: 'Optimized package sizes, stripped cold start bottlenecks, and implemented caching structures to boost efficiency.',
      metric: 'Latency reduced: 3,000ms → 700ms (77% Drop)'
    },
    {
      id: 'rds-proxy',
      title: 'RDS Proxy',
      sub: 'Pool Manager',
      icon: '🛡️',
      color: 'var(--accent-amber)',
      x: 60,
      y: 25,
      description: 'Acts as a buffer between AWS Lambda and PostgreSQL RDS. Lambda generates highly concurrent database connections during spikes. RDS Proxy aggregates, pools, and reuses these connections.',
      techDetails: 'Maintains low CPU load on RDS database, preventing performance spikes and avoiding Lambda cold-start connection exhaustion.',
      metric: 'RDS CPU Utilization: Stabilized at <45%'
    },
    {
      id: 'db',
      title: 'RDS PostgreSQL',
      sub: 'Data Core',
      icon: '🗄️',
      color: 'var(--accent-emerald)',
      x: 85,
      y: 50,
      description: 'The relational backend database storing transactional histories, user records, and tax ledger records. Optimized with index tuning, transaction tracking, and connection pooling.',
      techDetails: 'Maintains high-performance queries under concurrency. Utilizes custom read/write connection strategies.',
      metric: 'Database size: Multi-million financial records'
    },
    {
      id: 'sns-sqs',
      title: 'SNS / SQS',
      sub: 'Async Decoupler',
      icon: '🔄',
      color: 'var(--accent-rose)',
      x: 35,
      y: 75,
      description: 'Message routing and queuing services. SQS offloads long-running, non-critical transactional tasks (sending receipts, updating log audits) from the API request-response pathway.',
      techDetails: 'Utilizes a pub/sub pattern with SNS broadcasting payment confirmations to SQS queues for parallel event processing.',
      metric: 'Message Delivery rate: <50ms'
    },
    {
      id: 'lambda-worker',
      title: 'Worker Lambda',
      sub: 'Audits & Receipts',
      icon: '⚙️',
      color: 'var(--accent-indigo)',
      x: 60,
      y: 75,
      description: 'Consumes messages asynchronously from SQS queues. Handles auxiliary workflows like dynamic PDF receipt generation (with templates in S3) and third-party compliance reporting.',
      techDetails: 'Failsafe retry triggers with Dead Letter Queues (DLQ) configured for automatic system alerting.',
      metric: 'Dynamic receipt rendering: <150ms'
    }
  ];

  // Career Milestone configurations
  const milestones: Milestone[] = [
    {
      id: 'lead',
      year: '2025 – Present',
      role: 'Software Solution Architect / Technical Lead',
      company: 'Avasoft · Chennai, India',
      description: 'Directing the core architecture, technical standards, and cross-border rollouts for high-performance serverless systems.',
      teamSize: '15 engineers (backend, infra, QA, integrations)',
      bullets: [
        'Architected and delivered the Mexico market rollout with a full legacy system sunset in just 7 months.',
        'Enforced strict code review standards, security compliance, and architecture consistency company-wide.',
        'Designed private NPM SDK packages (@internal/calculation-engine, @internal/promotion-engine) utilized by all product divisions.',
        'Extended calculation platforms to dynamically calculate localized Mexico-specific tax depreciation rules.'
      ],
      tech: ['Node.js', 'TypeScript', 'AWS Lambda', 'CloudFormation', 'PostgreSQL', 'SQS', 'SNS', 'Git']
    },
    {
      id: 'senior',
      year: '2023 – 2025',
      role: 'Senior Software Engineer',
      company: 'Avasoft · Chennai, India',
      description: 'Oversaw solution design and delivery for the nationwide U.S. financial platform modernization.',
      teamSize: 'Led 4-6 senior developers directly',
      bullets: [
        'Engineered the sunset of a 16-year-old legacy platform, migration workflows with zero data loss.',
        'Architected an AWS Batch MACRS depreciation engine processing 3.7M–4.2M records per execution under strict database resources.',
        'Built a third-party vendor payment wrapper service facilitating vendor-specific integration logic with strict system isolation.',
        'Automated payment tax compliance integrations for Puerto Rico’s IVU Loto program.'
      ],
      tech: ['AWS Batch', 'RDS Proxy', 'API Gateway', 'PostgreSQL', 'TypeScript', 'Docker', 'GitHub Actions']
    },
    {
      id: 'engineer',
      year: '2021 – 2023',
      role: 'Software Engineer → Backend Specialist',
      company: 'Avasoft · Chennai, India',
      description: 'Core backend contributor, evolving into a backend-focused lead on payments modernization.',
      teamSize: 'Collaborated in multi-functional teams',
      bullets: [
        'Re-engineered legacy backend APIs, achieving 77% latency reduction (3s → 700ms) with Lambda and caching configurations.',
        'Introduced SNS/SQS event streams to offload audit entries, supporting surge capacities up to 250K+ daily payments.',
        'Built a template-driven dynamic PDF receipt generator with templates stored in AWS S3.',
        'Implemented bi-directional sync patterns to bridge transactional states during transition migrations.'
      ],
      tech: ['Node.js', 'Express.js', 'AWS Lambda', 'SQS', 'S3', 'RESTful APIs', 'Jest']
    },
    {
      id: 'intern',
      year: 'Mar 2021 – July 2021',
      role: 'Software Engineering Intern',
      company: 'Avasoft · Chennai, India',
      description: 'Intense technical validation and development training.',
      teamSize: 'Trainee group',
      bullets: [
        'Mastered web fundamentals and full PERN stack development (PostgreSQL, Express.js, React, Node.js).',
        'Built administrative mock interfaces and transactional sample backends.',
        'Earned a full-time engineering conversion offer one month prior to internship completion.'
      ],
      tech: ['React.js', 'PostgreSQL', 'Express.js', 'Node.js', 'CSS3', 'JavaScript']
    }
  ];

  // Skills configurations
  const skillCategories: SkillCategory[] = [
    {
      category: 'Languages',
      icon: '🟨',
      tags: [
        { name: 'Node.js', highlight: true },
        { name: 'TypeScript', highlight: true },
        { name: 'JavaScript (ES6+)', highlight: false },
        { name: 'SQL', highlight: false },
        { name: 'HTML5 / CSS3', highlight: false }
      ]
    },
    {
      category: 'AWS Cloud Ecosystem',
      icon: '☁️',
      tags: [
        { name: 'AWS Lambda', highlight: true },
        { name: 'API Gateway', highlight: true },
        { name: 'SQS / SNS', highlight: true },
        { name: 'AWS Batch', highlight: true },
        { name: 'RDS Proxy', highlight: true },
        { name: 'CloudFormation (IaC)', highlight: false },
        { name: 'S3 / CloudWatch', highlight: false },
        { name: 'ECR / ECS', highlight: false }
      ]
    },
    {
      category: 'Databases & Performance',
      icon: '🗄️',
      tags: [
        { name: 'PostgreSQL', highlight: true },
        { name: 'RDS Management', highlight: false },
        { name: 'Connection Pooling', highlight: true },
        { name: 'Query Optimization', highlight: false },
        { name: 'Redis Caching', highlight: false }
      ]
    },
    {
      category: 'Architecture & DevOps',
      icon: '🏗️',
      tags: [
        { name: 'Event-Driven Design', highlight: true },
        { name: 'Microservices', highlight: false },
        { name: 'Docker Containers', highlight: false },
        { name: 'GitHub Actions (CI/CD)', highlight: true },
        { name: 'Jest / Unit Testing', highlight: false }
      ]
    },
    {
      category: 'NPM SDK Design',
      icon: '📦',
      tags: [
        { name: 'Private registries', highlight: true },
        { name: 'SDK Wrapper APIs', highlight: true },
        { name: 'Versioned Engines', highlight: false },
        { name: 'Calculations Core', highlight: false }
      ]
    },
    {
      category: 'Engineering Leadership',
      icon: '👔',
      tags: [
        { name: '15-Engineer Team Lead', highlight: true },
        { name: 'Legacy Sunset Migrations', highlight: true },
        { name: 'Technical Spec Writing', highlight: false },
        { name: 'Agile Solution Design', highlight: false }
      ]
    }
  ];

  // Filtering skills list
  const filteredSkills = skillCategories.filter(category => {
    if (skillsFilter === 'All') return true;
    if (skillsFilter === 'AWS') return category.category.includes('AWS');
    if (skillsFilter === 'Backend') return ['Languages', 'Databases & Performance', 'Architecture & DevOps', 'NPM SDK Design'].includes(category.category);
    if (skillsFilter === 'Management') return category.category.includes('Leadership');
    return true;
  });

  // Simulator core execution script simulation
  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimResult(null);
    setSimLogs([]);

    const baseAmount = parseFloat(simAmount) || 0;
    const isMexico = simCountry === 'MX';

    const logSteps = [
      { text: `[SYSTEM] Spawning execution sandbox container...`, delay: 0, type: 'system' },
      { text: `[SDK] Initializing core package: @internal/calculation-engine@2.4.1`, delay: 400, type: 'info' },
      { text: `[SDK] Parsing calculation schedule strategy: ${simCycle}`, delay: 800, type: 'info' },
      { text: `[CALC-ENGINE] Running compound interest logic for amount: $${baseAmount.toFixed(2)}`, delay: 1200, type: 'info' },
      ...(simPromo
        ? [
            { text: `[SDK] Intersecting promotional engine check...`, delay: 1500, type: 'warn' },
            { text: `[SDK] Initializing core package: @internal/promotion-engine@1.1.0`, delay: 1800, type: 'info' },
            { text: `[PROMO-ENGINE] Active promotion located: ${isMexico ? 'MEXICO_LAUNCH_12' : 'US_ANNUAL_SPECIAL'}`, delay: 2100, type: 'success' },
            { text: `[PROMO-ENGINE] Applying ${isMexico ? '12%' : '8%'} calculation deduction to aggregate ledger`, delay: 2400, type: 'success' }
          ]
        : [
            { text: `[CALC-ENGINE] Skipped promotional validation (Disabled)`, delay: 1600, type: 'warn' }
          ]),
      { text: `[DB] Routing connection lookup to AWS RDS PostgreSQL via RDS Proxy...`, delay: 2700, type: 'system' },
      { text: `[DB] RDS Proxy cached active pool channel (0ms latency penalty)`, delay: 3000, type: 'success' },
      { text: `[SYSTEM] Dispatching calculation result payloads...`, delay: 3300, type: 'system' }
    ];

    logSteps.forEach((step) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step.text]);
      }, step.delay);
    });

    setTimeout(() => {
      // Calculate outputs
      const promoDeduction = simPromo ? (isMexico ? 0.12 : 0.08) : 0;
      const interestRate = isMexico ? 0.16 : 0.09; // Mock tax rates

      const totalInterest = baseAmount * interestRate;
      const finalAmount = (baseAmount + totalInterest) * (1 - promoDeduction);

      setSimResult({
        amount: Math.max(0, parseFloat(finalAmount.toFixed(2))),
        interest: parseFloat(totalInterest.toFixed(2)),
        text: `Successfully resolved ${isMexico ? 'Mexico-specific' : 'U.S.-specific'} tax ledger variables.`
      });
      setSimulating(false);
    }, 3600);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background elements */}
      <div className="hero-grid-bg"></div>
      <div className="hero-glow-effect"></div>

      {/* STICKY NAV */}
      <nav>
        <a href="#hero" className="nav-logo">
          Raja<span>varman</span>
        </a>
        
        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
          </li>
          <li>
            <a href="#architecture" className={activeSection === 'architecture' ? 'active' : ''}>Cloud Infra</a>
          </li>
          <li>
            <a href="#timeline" className={activeSection === 'timeline' ? 'active' : ''}>Career Timeline</a>
          </li>
          <li>
            <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
          </li>
          <li>
            <a href="#simulator" className={activeSection === 'simulator' ? 'active' : ''}>NPM Simulation</a>
          </li>
          <li>
            <a href="#contact" className="btn-contact-nav">Contact</a>
          </li>
        </ul>

        {/* Mobile menu trigger */}
        <button 
          style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* CSS workaround for displaying mobile trigger */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 576px) {
            .mobile-menu-toggle { display: block !important; }
            .nav-links { display: none !important; }
          }
        `}} />
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'hsl(var(--bg-card))',
          borderBottom: '1px solid hsl(var(--border))',
          padding: '2rem',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: 'hsl(var(--text-primary))', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>About</a>
          <a href="#architecture" onClick={() => setMobileMenuOpen(false)} style={{ color: 'hsl(var(--text-primary))', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>Cloud Infra</a>
          <a href="#timeline" onClick={() => setMobileMenuOpen(false)} style={{ color: 'hsl(var(--text-primary))', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>Career Timeline</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)} style={{ color: 'hsl(var(--text-primary))', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>Skills</a>
          <a href="#simulator" onClick={() => setMobileMenuOpen(false)} style={{ color: 'hsl(var(--text-primary))', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>NPM Simulation</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: 'hsl(var(--text-primary))', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>Contact</a>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="hero" className="container">
        <div className="hero-content">
          <div className="badge-pulse">Available for new opportunities</div>
          <h1>
            Backend Engineer<br/>
            <span className="text-gradient-indigo">Building systems that scale.</span>
          </h1>
          <p className="hero-sub">
            5+ years crafting event-driven serverless architectures and high-throughput financial platforms on AWS. Specializing in Node.js, TypeScript, and distributed database designs.
          </p>
          
          <div className="hero-cta">
            <a href="#timeline" className="btn btn-primary">
              View Milestones <ArrowRight size={16} />
            </a>
            <a href="#architecture" className="btn btn-outline">
              Explore Architecture
            </a>
          </div>

          {/* TELEMETRY METRICS */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">77<span>%</span></div>
              <div className="stat-label">API Latency Reduction</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">250<span>K+</span></div>
              <div className="stat-label">Peak Daily Payments</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">4.2<span>M</span></div>
              <div className="stat-label">Records / Batch Run</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">5<span>+</span></div>
              <div className="stat-label">Years Serverless Stack</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{ background: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-tag">// profiling</span>
              <h2 className="section-title">From Intern to Technical Lead</h2>
              <p>
                I am a backend specialist operating at the intersection of <strong>event-driven design, high-throughput pipelines, and cloud optimization</strong>. 
                Over the past 5 years, I scaled payment API responses by 77%, delivered modern serverless solutions to replace aging 16-year legacy servers, and assumed ownership of multi-market architectures.
              </p>
              <p>
                Currently, I act as <strong>Technical Lead for a team of 15 engineers</strong>, heading key platform initiatives, reviewing code for quality, and standardizing core business utilities into company-wide reusable SDK packages.
              </p>

              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon"><Server size={20} /></div>
                  <div>
                    <div className="highlight-label">Enterprise Serverless Systems</div>
                    <div className="highlight-sub">AWS Lambda · API Gateway · CloudFormation IaC</div>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Cpu size={20} /></div>
                  <div>
                    <div className="highlight-label">Performant Data Syncing</div>
                    <div className="highlight-sub">RDS Proxy pooling · Cache mechanisms · Thread queues</div>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Users size={20} /></div>
                  <div>
                    <div className="highlight-label">Technical Leadership</div>
                    <div className="highlight-sub">Guiding 15-dev team · Launching cross-border modules</div>
                  </div>
                </div>
              </div>
            </div>

            {/* KEY METRICS CARD */}
            <div className="glass-panel about-card">
              <div className="about-card-title">Operational Telemetry</div>
              <div className="metric-row">
                <div className="metric-item">
                  <div className="metric-val">3s → 700ms</div>
                  <div className="metric-desc">Payment Latency</div>
                </div>
                <div className="metric-item">
                  <div className="metric-val">250,000+</div>
                  <div className="metric-desc">Daily Transactions</div>
                </div>
                <div className="metric-item">
                  <div className="metric-val">4.2M</div>
                  <div className="metric-desc">Depreciation Runs</div>
                </div>
                <div className="metric-item">
                  <div className="metric-val">16 Years</div>
                  <div className="metric-desc">Legacy Sunset Completed</div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'hsl(var(--text-muted))', marginBottom: '0.75rem' }}>
                  Authored Private SDK Packages
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="skill-badge highlighted">@internal/calculation-engine</span>
                  <span className="skill-badge highlighted">@internal/promotion-engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AWS SERVERLESS ARCHITECTURE EXPLORER */}
      <section id="architecture" style={{ borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className="container">
          <span className="section-tag">// visual architecture</span>
          <h2 className="section-title">Interactive AWS Serverless Canvas</h2>
          <p className="section-sub">
            Click on the cloud nodes below to explore the AWS design patterns, optimization pipelines, and metrics engineered into my platform solutions.
          </p>

          <div className="arch-grid">
            {/* Visual Architecture Canvas */}
            <div className="glass-panel canvas-container">
              <div className="architecture-canvas">
                {/* SVG Connections */}
                <svg className="connection-svg">
                  <defs>
                    <linearGradient id="grad-gate-pay" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent-indigo)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="grad-pay-proxy" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="grad-proxy-db" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--accent-emerald)" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  
                  {/* API Gateway to Payment Lambda */}
                  <path d="M 120, 155 Q 220, 120 280, 110" fill="none" stroke="url(#grad-gate-pay)" strokeWidth="2" strokeDasharray="5 5" />
                  
                  {/* Payment Lambda to RDS Proxy */}
                  <path d="M 420, 110 H 480" fill="none" stroke="url(#grad-pay-proxy)" strokeWidth="2" />
                  
                  {/* RDS Proxy to RDS PostgreSQL */}
                  <path d="M 620, 110 Q 680, 120 780, 155" fill="none" stroke="url(#grad-proxy-db)" strokeWidth="2" />
                  
                  {/* API Gateway to SNS/SQS */}
                  <path d="M 120, 175 Q 220, 210 280, 220" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5 5" />
                  
                  {/* SNS/SQS to Worker Lambda */}
                  <path d="M 420, 220 H 480" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  
                  {/* Worker Lambda to RDS PostgreSQL */}
                  <path d="M 620, 220 Q 680, 210 780, 175" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                </svg>

                {/* Nodes rendering */}
                {archNodes.map((node) => {
                  const isActive = activeNode === node.id;
                  return (
                    <div
                      key={node.id}
                      className={`arch-node ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveNode(node.id)}
                      style={{
                        position: 'relative',
                        transform: isActive ? 'scale(1.05) translateY(-5px)' : 'scale(1)'
                      }}
                    >
                      <div className="node-icon">{node.icon}</div>
                      <div className="node-title">{node.title}</div>
                      <div className="node-sub">{node.sub}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Node Details Spotlight */}
            {(() => {
              const node = archNodes.find(n => n.id === activeNode);
              if (!node) return null;
              return (
                <div className="glass-panel detail-card" style={{ borderLeft: `4px solid ${node.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
                        {node.title} — {node.sub}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>
                        Optimization Layer Description
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.8rem', 
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      color: 'hsl(var(--accent-cyan))'
                    }}>
                      {node.metric}
                    </div>
                  </div>
                  <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                    {node.description}
                  </p>
                  <p style={{ color: 'hsl(var(--text-faint))', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                    🛠️ <strong>Implementation Spec:</strong> {node.techDetails}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* CAREER TIMELINE WITH SPOTLIGHT */}
      <section id="timeline" style={{ background: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className="container">
          <span className="section-tag">// tracking progression</span>
          <h2 className="section-title">Career Milestones</h2>
          <p className="section-sub">
            Select a milestone to display a deep-dive spotlight on my roles, team structures, and legacy modernization initiatives.
          </p>

          <div className="timeline-section-grid">
            {/* Timeline Left Navigation */}
            <div className="timeline-nav">
              {milestones.map((ms) => {
                const isActive = activeMilestone === ms.id;
                return (
                  <button
                    key={ms.id}
                    className={`timeline-nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveMilestone(ms.id)}
                  >
                    <div className="timeline-nav-dot"></div>
                    <div className="timeline-nav-meta">
                      <span className="timeline-nav-year">{ms.year}</span>
                      <span className="timeline-nav-title">{ms.role}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Timeline Right Spotlight Card */}
            {(() => {
              const ms = milestones.find(m => m.id === activeMilestone);
              if (!ms) return null;
              return (
                <div className="glass-panel timeline-spotlight">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800 }}>{ms.role}</h3>
                      <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem', marginTop: '2px' }}>{ms.company}</p>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'hsl(var(--accent-indigo))' }}>
                      {ms.year}
                    </div>
                  </div>

                  {/* Operational Detail Badge */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.9rem' }}>👥</span>
                    <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>
                      <strong>Team Context:</strong> {ms.teamSize}
                    </span>
                  </div>

                  <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1rem', marginBottom: '1.5rem' }}>
                    {ms.description}
                  </p>

                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    Key Contributions & Initiatives:
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
                    {ms.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', color: 'hsl(var(--text-muted))', lineHeight: '1.5' }}>
                        <span style={{ color: 'hsl(var(--accent-cyan))', fontWeight: 'bold' }}>→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                      Technology Stack:
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {ms.tech.map((t, idx) => (
                        <span key={idx} className="skill-badge">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* SKILLS MATRIX */}
      <section id="skills" style={{ borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className="container">
          <span className="section-tag">// competencies</span>
          <h2 className="section-title">Skills & Capabilities</h2>
          <p className="section-sub">
            Filter my capabilities by domain. Main framework dependencies that are central to my system solutions are highlighted.
          </p>

          {/* Filtering tabs */}
          <div className="skills-filter">
            {['All', 'Backend', 'AWS', 'Management'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${skillsFilter === filter ? 'active' : ''}`}
                onClick={() => setSkillsFilter(filter)}
              >
                {filter === 'All' ? 'Full Stack' : filter}
              </button>
            ))}
          </div>

          {/* Grid display */}
          <div className="skills-grid">
            {filteredSkills.map((cat, idx) => (
              <div key={idx} className="glass-panel skill-card">
                <div className="skill-card-head">
                  <div className="skill-card-icon">{cat.icon}</div>
                  <div className="skill-card-title">{cat.category}</div>
                </div>
                <div className="skill-tag-wrapper">
                  {cat.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`skill-badge ${tag.highlight ? 'highlighted' : ''}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NPM PACKAGES SIMULATOR */}
      <section id="simulator" style={{ background: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className="container">
          <span className="section-tag">// interactive demonstration</span>
          <h2 className="section-title">Private NPM Packages Sandbox</h2>
          <p className="section-sub">
            Simulate the logic within my private packages: <code>@internal/calculation-engine</code> and <code>@internal/promotion-engine</code>. Adjust variables and execute to view real-time compilation traces.
          </p>

          <div className="simulator-layout">
            {/* Input Controllers */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                Simulator Configurations
              </h3>
              
              <div className="sim-controls">
                <div className="sim-control-group">
                  <label className="sim-label">Base Transaction Amount ($)</label>
                  <input
                    type="number"
                    className="sim-input"
                    value={simAmount}
                    onChange={(e) => setSimAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="sim-control-group">
                  <label className="sim-label">Calculation Period</label>
                  <select
                    className="sim-select"
                    value={simCycle}
                    onChange={(e) => setSimCycle(e.target.value)}
                  >
                    <option value="Weekly">Weekly Cycle</option>
                    <option value="Bi-weekly">Bi-weekly Cycle</option>
                    <option value="Monthly">Monthly Cycle</option>
                    <option value="Quarterly">Quarterly Cycle</option>
                  </select>
                </div>

                <div className="sim-control-group">
                  <label className="sim-label">Target Market Rollout</label>
                  <select
                    className="sim-select"
                    value={simCountry}
                    onChange={(e) => setSimCountry(e.target.value)}
                  >
                    <option value="US">United States Market (9% Tax rate)</option>
                    <option value="MX">Mexico Market (16% localized Tax rate)</option>
                  </select>
                </div>

                <div className="sim-control-group" style={{ marginTop: '0.5rem' }}>
                  <label className="sim-toggle">
                    <input
                      type="checkbox"
                      className="sim-checkbox"
                      checked={simPromo}
                      onChange={(e) => setSimPromo(e.target.checked)}
                    />
                    <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                      Apply Promotion Engine Verification
                    </span>
                  </label>
                </div>

                <button
                  className="sim-btn"
                  onClick={runSimulation}
                  disabled={simulating}
                >
                  <Terminal size={16} /> {simulating ? 'Executing SDK Modules...' : 'Run Simulation'}
                </button>
              </div>
            </div>

            {/* Simulated Console Screen */}
            <div className="sim-console">
              <div className="console-header">
                <div className="console-dots">
                  <div className="console-dot red"></div>
                  <div className="console-dot yellow"></div>
                  <div className="console-dot green"></div>
                </div>
                <div className="console-title">rajavarman-execution-logs.sh</div>
              </div>

              <div className="console-body">
                {simLogs.length === 0 ? (
                  <div style={{ color: 'hsl(var(--text-faint))', textAlign: 'center', marginTop: '4rem' }}>
                    <Sliders size={28} style={{ marginBottom: '0.5rem', opacity: 0.3 }} />
                    <p>Adjust variables and click "Run Simulation" to boot up sandbox containers.</p>
                  </div>
                ) : (
                  simLogs.map((log, index) => {
                    let logClass = 'console-line';
                    if (log.includes('[SYSTEM]')) logClass += ' system';
                    else if (log.includes('[SDK]')) logClass += ' info';
                    else if (log.includes('[PROMO-ENGINE]') || log.includes('0ms latency')) logClass += ' success';
                    else if (log.includes('[CALC-ENGINE]')) logClass += ' info';
                    else if (log.includes('Skipped')) logClass += ' warn';
                    
                    return (
                      <div key={index} className={logClass}>
                        {log}
                      </div>
                    );
                  })
                )}

                {simResult && (
                  <div className="console-line result">
                    <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: 'hsl(var(--accent-cyan))' }}>
                      ✓ SIMULATION RESOLVED SUCCESSFULLY
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>
                      <div>Base Sum: ${parseFloat(simAmount || '0').toFixed(2)}</div>
                      <div>Interest Charges: ${simResult.interest.toFixed(2)}</div>
                      {simPromo && (
                        <div style={{ gridColumn: 'span 2', color: 'hsl(var(--accent-emerald))' }}>
                          Promo Applied: -{simCountry === 'MX' ? '12%' : '8%'} Discount Code Check
                        </div>
                      )}
                      <div style={{ gridColumn: 'span 2', fontSize: '0.85rem', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                        <strong>Net Payable Sum: ${simResult.amount.toFixed(2)}</strong>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'hsl(var(--text-faint))', marginTop: '0.5rem' }}>
                      {simResult.text}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <span className="section-tag">// communication channels</span>
              <h2 className="section-title">Let's build systems together.</h2>
              <p style={{ color: 'hsl(var(--text-muted))', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                I am actively seeking roles as a <strong>Senior Backend Engineer, Staff Backend Developer, or Technical Solution Architect</strong> (Remote or Hybrid location).
              </p>
              
              <div className="contact-note">
                <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                  🎯 <strong>Target stack alignment:</strong> Scalable serverless microservices, Postgres RDS clustering, asynchronous message streaming (RabbitMQ/SQS), API Gateway security layers, and private SDK design modules.
                </p>
              </div>

              <div className="contact-links">
                <a href="mailto:rajavarman.arulmani@gmail.com" className="contact-card">
                  <div className="contact-card-icon"><Mail size={18} /></div>
                  <div className="contact-card-info">
                    <span className="contact-card-label">Email</span>
                    <span className="contact-card-value">rajavarman.arulmani@gmail.com</span>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/rajavarman-arulmani" target="_blank" rel="noopener noreferrer" className="contact-card">
                  <div className="contact-card-icon"><Linkedin size={18} /></div>
                  <div className="contact-card-info">
                    <span className="contact-card-label">LinkedIn</span>
                    <span className="contact-card-value">linkedin.com/in/rajavarman-arulmani</span>
                  </div>
                </a>

                <a href="https://github.com/RajavarmanArulmani" target="_blank" rel="noopener noreferrer" className="contact-card">
                  <div className="contact-card-icon"><Github size={18} /></div>
                  <div className="contact-card-info">
                    <span className="contact-card-label">GitHub Source Code</span>
                    <span className="contact-card-value">github.com/RajavarmanArulmani</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Extra information board */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Current Training & Active Goals
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: 'hsl(var(--accent-cyan))', fontSize: '1.1rem' }}>✦</span>
                    <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                      Preparing for <strong>AWS Solutions Architect Associate (SAA-C03)</strong> certification.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: 'hsl(var(--accent-cyan))', fontSize: '1.1rem' }}>✦</span>
                    <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                      Deep diving into high-availability multi-region database replication protocols and CQRS patterns.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Core Philosophy
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))', fontStyle: 'italic', lineHeight: '1.5' }}>
                  "Code complexity should be abstracted away from client routes. Write modular library logic that resolves in sub-250ms chunks, and decouple transactional mutations asynchronously to achieve maximum API responsiveness."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: 'auto' }}>
        <div className="container">
          <p>
            Designed & Built with React + TypeScript · <a href="https://github.com/RajavarmanArulmani/Rajavarman-Arulmani" target="_blank" rel="noopener noreferrer">View Source on GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
