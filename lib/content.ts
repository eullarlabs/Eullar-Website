export const SITE = {
  name: "Eullar Labs",
  short: "Eullar",
  tagline: "Applied AI research, shipped as tools people can use.",
  description:
    "Eullar Labs is an AI research company. We build practical AI tools and advance AI knowledge through responsible research.",
  email: "hello@eullar.com",
  location: "Accra · Remote",
  founded: 2024,
} as const;

export const NAV = [
  { label: "Research", href: "/research" },
  { label: "Syllabi", href: "/products/syllabi" },
  { label: "Reevue", href: "/products/reevue" },
  { label: "About", href: "/about" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Products                                                                    */
/* -------------------------------------------------------------------------- */

export type Product = {
  slug: string;
  name: string;
  kind: string;
  status: string;
  href: string;
  oneLiner: string;
  summary: string;
  audience: string;
  accent: "turq" | "iris";
  index: string;
  capabilities: { title: string; body: string }[];
  stack: { label: string; value: string }[];
  flow: { n: string; title: string; body: string }[];
  refusals: string[];
  quote: { text: string; who: string };
};

export const PRODUCTS: Product[] = [
  {
    slug: "syllabi",
    name: "Syllabi",
    kind: "Education",
    status: "In private beta",
    href: "/products/syllabi",
    accent: "turq",
    index: "P-01",
    oneLiner: "Teaching and learning, tailored to the learner in front of you.",
    summary:
      "Syllabi reads a curriculum the way a teacher does — as a graph of dependent ideas, not a list of topics. It models what a learner already holds, finds the gap that is actually blocking them, and rebuilds the path from there. Teachers get plans, materials and diagnostics; learners get a route that fits.",
    audience: "Schools, universities, tutoring programmes, training teams",
    capabilities: [
      {
        title: "Curriculum as a graph",
        body: "Every syllabus is decomposed into concepts and prerequisite edges, so a weak node explains the failures downstream of it instead of hiding behind a topic label.",
      },
      {
        title: "Learner state modelling",
        body: "A running estimate of mastery per concept, updated from work the learner actually produces — not from a one-off placement test.",
      },
      {
        title: "Path rewriting",
        body: "When the estimate moves, the route moves. Sequencing, difficulty and modality re-plan continuously against the same learning objectives.",
      },
      {
        title: "Materials that follow the plan",
        body: "Explanations, worked examples, practice sets and assessments generated against the specific gap, in the register the learner reads best.",
      },
      {
        title: "Teacher in the loop",
        body: "Every generated plan is inspectable and editable. Teachers see why a route was chosen and can overrule any step of it.",
      },
      {
        title: "Classroom-scale view",
        body: "Aggregate the same graph across a cohort to see which prerequisite is quietly costing the whole class its marks.",
      },
    ],
    stack: [
      { label: "Interface", value: "Web · LMS embed · API" },
      { label: "Unit of work", value: "Concept node" },
      { label: "Update signal", value: "Learner artefacts" },
      { label: "Human control", value: "Full plan override" },
    ],
    flow: [
      {
        n: "01",
        title: "Ingest the syllabus",
        body: "The existing curriculum document goes in as-is. Concepts and prerequisite edges come out, with every extracted edge attributed to the passage that produced it so a teacher can contest it.",
      },
      {
        n: "02",
        title: "Estimate where the learner is",
        body: "Mastery is inferred from work the learner produces — attempts, errors, explanations — and expressed per concept rather than per topic, with an uncertainty attached to each estimate.",
      },
      {
        n: "03",
        title: "Find what is actually blocking",
        body: "The system walks the graph backwards from the failure to the earliest weak prerequisite. That node, not the assessed topic, is where teaching resumes.",
      },
      {
        n: "04",
        title: "Write the route and the materials",
        body: "A sequence of steps with explanations, worked examples and practice generated against that specific gap. The teacher edits or rejects any step before it reaches a learner.",
      },
    ],
    refusals: [
      "Syllabi does not assign grades or produce a mark that follows a learner.",
      "It does not run without a teacher able to see and override the plan.",
      "It does not infer anything about a learner from demographic attributes.",
    ],
    quote: {
      text: "The interesting question was never 'can a model explain fractions'. It was 'does it know that fractions are why this student cannot do the algebra'.",
      who: "From the Syllabi design notes",
    },
  },
  {
    slug: "reevue",
    name: "Reevue",
    kind: "Hiring",
    status: "Available",
    href: "/products/reevue",
    accent: "iris",
    index: "P-02",
    oneLiner: "Every applicant leaves with something useful.",
    summary:
      "Reevue embeds into a company's application portal and returns tailored, specific feedback to candidates — including the ones who were not selected. It reads the application against the role the company actually defined, and explains the distance between them in language a person can act on.",
    audience: "Employers, universities, grant and fellowship programmes",
    capabilities: [
      {
        title: "Portal-native",
        body: "Drops into an existing applicant tracking system or careers portal. Candidates never leave the company's own flow.",
      },
      {
        title: "Role-grounded evaluation",
        body: "Feedback is derived from the criteria the hiring team wrote down, not from a generic model of what a good CV looks like.",
      },
      {
        title: "Specific, not soothing",
        body: "Named gaps, evidence from the application itself, and the concrete next step — instead of 'we went with other candidates'.",
      },
      {
        title: "Auditable by the employer",
        body: "Every piece of feedback is traceable to a criterion and a passage. Teams review, tune, and approve tone before anything is sent.",
      },
      {
        title: "Bias surface monitoring",
        body: "Feedback distributions are monitored across cohorts so a systematic skew shows up as a measurement, not as a complaint.",
      },
      {
        title: "No decision authority",
        body: "Reevue explains outcomes. It does not rank, score, or select candidates — that stays with the hiring team.",
      },
    ],
    stack: [
      { label: "Interface", value: "Portal SDK · REST · Webhooks" },
      { label: "Unit of work", value: "Application ↔ criterion pair" },
      { label: "Latency target", value: "Async, minutes" },
      { label: "Human control", value: "Review before send" },
    ],
    flow: [
      {
        n: "01",
        title: "Read the criteria the team wrote",
        body: "The role definition is parsed into weighted criteria. Anything vague is surfaced back to the hiring team before the first application is processed, because unclear criteria produce unusable feedback.",
      },
      {
        n: "02",
        title: "Anchor evidence in the application",
        body: "Each criterion is matched to the passages that speak to it. A criterion with no supporting passage is a gap, and the absence itself is the evidence.",
      },
      {
        n: "03",
        title: "Draft the feedback",
        body: "One or two gaps, named plainly, with the specific next step that would close them — plus what the applicant did well, so the strong signal is not lost in the critique.",
      },
      {
        n: "04",
        title: "Team review, then send",
        body: "Nothing leaves without the configured level of human review. Teams tune tone once, spot-check continuously, and can block any individual message.",
      },
    ],
    refusals: [
      "Reevue does not rank, score or select candidates — it explains a decision already made.",
      "It does not send anything the hiring team has not authorised.",
      "It does not use protected attributes, and it monitors its own output for skew across cohorts.",
    ],
    quote: {
      text: "A rejection is the only contact most applicants ever have with a company. Making it useful is not a nice-to-have; it is the whole product.",
      who: "From the Reevue design notes",
    },
  },
];

export const productBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

/* -------------------------------------------------------------------------- */
/*  Research                                                                    */
/* -------------------------------------------------------------------------- */

export type Note = {
  id: string;
  title: string;
  abstract: string;
  area:
    | "Alignment"
    | "Evaluation"
    | "Learning science"
    | "Systems"
    | "Interpretability";
  status: "Working note" | "Draft" | "In review" | "Published";
  date: string;
};

export const NOTES: Note[] = [
  {
    id: "EL-2025-07",
    title:
      "Prerequisite graphs beat topic lists for diagnosing where a learner stalls",
    abstract:
      "Treating a syllabus as a dependency graph rather than an ordered list changes what a wrong answer tells you. We describe the extraction procedure we use to build these graphs from existing curricula, and where it still fails — chiefly on subjects whose prerequisites are cultural rather than logical.",
    area: "Learning science",
    status: "Working note",
    date: "2025-11",
  },
  {
    id: "EL-2025-06",
    title: "Feedback that survives contact with the reader",
    abstract:
      "Rejected applicants rarely act on feedback that is accurate but unspecific. We look at what makes a generated critique actionable — evidence anchoring, single-gap focus, and an explicit next step — and propose a rubric for measuring it independently of reader satisfaction.",
    area: "Evaluation",
    status: "Draft",
    date: "2025-09",
  },
  {
    id: "EL-2025-04",
    title: "Measuring skew in generated evaluations across applicant cohorts",
    abstract:
      "A method for monitoring the distribution of generated feedback across groups, designed to run continuously in production rather than as a pre-launch audit. We report the failure mode that motivated it: uniform politeness masking uneven specificity.",
    area: "Alignment",
    status: "In review",
    date: "2025-06",
  },
  {
    id: "EL-2025-02",
    title: "Cheap uncertainty signals for tutoring systems",
    abstract:
      "A tutor that is confidently wrong costs more than one that says it is unsure. We compare lightweight uncertainty estimates that can run per-turn inside a live tutoring session under a fixed latency budget.",
    area: "Systems",
    status: "Working note",
    date: "2025-03",
  },
  {
    id: "EL-2024-09",
    title: "What a model appears to know versus what a learner retains",
    abstract:
      "Notes on the gap between model-side mastery estimates and delayed recall in human learners, and why optimising a tutoring policy against the former degrades the latter.",
    area: "Interpretability",
    status: "Working note",
    date: "2024-12",
  },
];

/* -------------------------------------------------------------------------- */
/*  Principles                                                                  */
/* -------------------------------------------------------------------------- */

export const PRINCIPLES = [
  {
    n: "01",
    title: "Research earns its keep by shipping",
    body: "We do not maintain a wall between the lab and the product. A result that cannot survive real users, real latency and real edge cases is an unfinished result.",
  },
  {
    n: "02",
    title: "The human keeps the decision",
    body: "Our systems explain, propose and draft. Teachers keep authority over a learning plan; hiring teams keep authority over a hiring outcome. We build the seams that make override easy.",
  },
  {
    n: "03",
    title: "Specificity over reassurance",
    body: "Vague output is a way of hiding uncertainty. We would rather a system name a narrow gap it can defend than produce a fluent answer to a question it did not understand.",
  },
  {
    n: "04",
    title: "Measure the thing, not the proxy",
    body: "Satisfaction scores, engagement time and completion rates are proxies. We instrument for retained understanding and acted-on feedback, even when they are slower and less flattering.",
  },
  {
    n: "05",
    title: "Publish the failures",
    body: "Our working notes include the methods that did not hold up. A lab that only publishes wins is a marketing department with a LaTeX template.",
  },
  {
    n: "06",
    title: "Build where it is needed",
    body: "We are based in Accra and build first for classrooms and job markets that most AI products treat as an afterthought. Constraint is a design input, not an excuse.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Misc                                                                        */
/* -------------------------------------------------------------------------- */

export const TICKER = [
  "prerequisite graph extraction",
  "learner state estimation",
  "evidence-anchored critique",
  "uncertainty under latency budget",
  "cohort skew monitoring",
  "curriculum path rewriting",
  "criterion ↔ passage alignment",
  "delayed-recall evaluation",
  "human override surfaces",
  "retrieval over syllabi",
];

export const FAQ = [
  {
    q: "Does Eullar train its own foundation models?",
    a: "No. We build the layer above them — representation, evaluation and control — and we stay deliberately model-agnostic so that a product decision is never hostage to a single provider's roadmap.",
  },
  {
    q: "Where does customer data go?",
    a: "Customer content is processed for the customer's own workload and is not used to train shared models. Schools and employers keep their data boundaries; deployment options include region-pinned and self-hosted inference.",
  },
  {
    q: "Can Reevue reject candidates automatically?",
    a: "No, and it is architecturally prevented from doing so. Reevue receives an outcome and explains it. Selection stays with the hiring team.",
  },
  {
    q: "Is Syllabi a replacement for teachers?",
    a: "It is a planning and diagnostics instrument for teachers. Every route it proposes is inspectable and editable, and the teacher's override is a first-class action rather than an escape hatch.",
  },
  {
    q: "Do you work with research collaborators?",
    a: "Yes — particularly with education faculties and labour-market researchers who want to run studies on deployed systems rather than on benchmarks.",
  },
];
