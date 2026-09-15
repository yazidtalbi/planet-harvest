import { Hero, Intro, Split, Callout, Cards, Button, styles } from '@/components/EditorialPage';
export const metadata = { title: 'Food Boxes & Community Programs — Planet Harvest', description: 'Fresh food box programs connecting farms with communities, from employee wellness to community food access and emergency response.' };
const programs = [
  {title:'Community food access',copy:'Expanding access to fresh fruits and vegetables in communities facing food insecurity.'},
  {title:'Employee & family wellness',copy:'Bringing fresh food directly to employees and their families through workplace distributions and engagement programs.'},
  {title:'Food as Medicine',copy:'Supporting health-focused initiatives with fresh food programs designed around specific populations and health objectives.'},
  {title:'Condition-specific programs',copy:'Curating fresh food experiences that complement education and engagement around areas such as heart health, brain health, diabetes and healthy aging.'},
  {title:'Emergency & disaster response',copy:'Mobilizing fresh food and other essential resources when communities face unexpected need.'},
  {title:'Community activations',copy:'Creating high-touch food distributions that bring together employees, nonprofit partners, volunteers and community members.'},
];
const steps = [
  ['Strategy & program design','Define objectives, priority populations, markets, timing and success measures.'],
  ['Fresh food & dry goods sourcing','Source fresh fruits and vegetables through our grower and produce-industry network, with an emphasis on quality, seasonality and maximizing the value of the harvest.'],
  ['Box curation & packaging','Develop fresh food boxes based on program goals, audience needs, seasonality and available supply.'],
  ['Community partner identification','Identify and coordinate with trusted local organizations that understand their communities and can help food reach the people who need it.'],
  ['Logistics & distribution','Coordinate packing, transportation, delivery and distribution across individual communities or multiple markets.'],
  ['Education & engagement','Integrate recipes, nutrition education, QR codes, branded materials and other resources that extend the impact beyond the food itself.'],
  ['Impact measurement & storytelling','Capture program outputs and outcomes, including food distributed, households reached, community participation and stories that demonstrate the human impact behind the numbers.'],
];
export default function FoodBoxesPage() {
  return <main id="main-content" className={styles.page}>
    <Hero eyebrow="Community impact & box programs" title="Fresh Food. Shared Good." film="food-boxes" copy="Access to fresh, nutritious food should not depend on where you live, work or what resources are available to you." image="/food-boxes-hero.jpg" alt="Food boxes filled with fresh produce" tone="blue"><Button href="/contact?interest=community">Build a program with us</Button></Hero>
    <Intro eyebrow="Fresh food boxes built for impact" title="Meeting people where they are."><p>Our food boxes bring fresh produce directly to people where they are—at work, in their communities and through trusted organizations already serving them.</p><p>Through our fresh food box programs, we connect farms with communities where fresh food can make a meaningful difference—helping companies, healthcare organizations, foundations and nonprofit partners turn fresh produce into measurable impact.</p></Intro>
    <section className={styles.section} id="programs"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>A program for your purpose</span><h2>Fresh food.<br />So many ways to help.</h2></div><p>We source a diverse mix of fresh fruits and vegetables and build programs around the needs of each partner and population.</p></div><Cards items={programs} /></section>
    <Split title="What impact are we trying to create?" eyebrow="Every program starts with a question" image="/food-boxes-split.jpg" alt="Volunteers packing fresh produce food boxes in distribution center"><p>Planet Harvest builds the program from there.</p><p>We work with partners to determine the right markets, populations, box composition, distribution model and community organizations to bring the program to life.</p><p>From a single community activation to a multi-market national program, we provide an end-to-end solution designed to make fresh food access easier, more scalable and more impactful.</p></Split>
    <section className={styles.section}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>From idea to impact</span><h2>We manage the details.<br />From end to end.</h2></div></div><div className={styles.steps}>{steps.map(([title, copy], i) => <details key={title} open={i === 0}><summary><span className={styles.eyebrow}>0{i+1}</span>{title}</summary><p>{copy}</p></details>)}</div></section>
    <Callout title="What impact could we create together?" href="/contact?interest=community" button="Build a program with us" />
  </main>;
}
