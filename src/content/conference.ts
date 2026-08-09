import type { ConferenceContent } from '../types/conference'

export const conference: ConferenceContent = {
  identity: {
    shortName: 'GAIA',
    year: '2027',
    edition: '3rd',
    fullName: 'International Workshop of Geomechanics Alliance In Asia',
    theme: 'Advances in Micro–Macro Geomechanics',
    location: 'Hong Kong, China',
    dates: 'May 2027',
  },
  navigation: [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'WORKSHOP', path: '/workshop' },
    { label: 'REGISTRATION', path: '/registration' },
    { label: 'PROGRAM', path: '/program' },
    { label: 'PREVIOUS GAIA', path: '/previous-gaia' },
    { label: 'CONTACT', path: '/contact' },
  ],
  schoolSlides: [
    {
      id: 'host',
      index: '01',
      eyebrow: 'HOST INSTITUTION',
      title: 'Host university',
      description:
        'The host institution for GAIA 2027 will be introduced here, together with its academic heritage and international outlook.',
      note: 'TO BE ANNOUNCED',
      art: 'orbit',
    },
    {
      id: 'research',
      index: '02',
      eyebrow: 'GEOMECHANICS RESEARCH',
      title: 'Research at the host',
      description:
        'A focused introduction to the laboratories, research groups and facilities supporting the workshop.',
      note: 'CONTENT FORTHCOMING',
      art: 'strata',
    },
    {
      id: 'campus',
      index: '03',
      eyebrow: 'CAMPUS & COMMUNITY',
      title: 'A place to exchange',
      description:
        'Campus life, learning spaces and the community that will welcome GAIA participants from across Asia.',
      note: 'IMAGERY FORTHCOMING',
      art: 'grid',
    },
    {
      id: 'city',
      index: '04',
      eyebrow: 'CITY & REGION',
      title: 'Beyond the workshop',
      description:
        'A concise portrait of the host city, its landscape, culture and connections for international visitors.',
      note: 'LOCATION FORTHCOMING',
      art: 'wave',
    },
  ],
  highlights: [
    {
      label: 'Edition',
      value: '03',
      detail: 'The third annual GAIA workshop',
    },
    {
      label: 'Format',
      value: 'In person',
      detail: 'Lectures, discussion and poster exchange',
    },
    {
      label: 'Working language',
      value: 'English',
      detail: 'An international academic programme',
    },
    {
      label: 'Audience',
      value: 'Asia +',
      detail: 'Young researchers and graduate students',
    },
  ],
  timeline: [
    {
      date: '2026 — Q3',
      title: 'Website launch',
      description: 'The first GAIA 2027 information hub goes online.',
      status: 'confirmed',
    },
    {
      date: 'TO BE ANNOUNCED',
      title: 'Registration opens',
      description: 'Registration details and participation guidance will follow.',
      status: 'pending',
    },
    {
      date: 'TO BE ANNOUNCED',
      title: 'Abstract deadline',
      description: 'Submission format and review milestones will be published here.',
      status: 'pending',
    },
    {
      date: '2027',
      title: 'GAIA third workshop',
      description: 'The workshop dates and host city will be announced.',
      status: 'pending',
    },
  ],
  workshop: {
    overview:
      'GAIA is conceived as a durable platform for young researchers and graduate students in geomechanics to exchange knowledge, test ideas and build research relationships across Asia. The annual workshop is its main in-person forum.',
    topics: [
      'Fundamental and applied geomechanics',
      'Multiscale observation and modelling',
      'Granular and porous materials',
      'Geo-energy and environmental geotechnics',
      'Data-driven methods in geomechanics',
      'Resilient infrastructure and natural hazards',
    ],
    speakers: [
      {
        name: 'Keynote speaker 01',
        affiliation: 'To be announced',
        topic: 'Lecture title to be announced',
      },
      {
        name: 'Keynote speaker 02',
        affiliation: 'To be announced',
        topic: 'Lecture title to be announced',
      },
      {
        name: 'Keynote speaker 03',
        affiliation: 'To be announced',
        topic: 'Lecture title to be announced',
      },
    ],
    venue: [
      {
        label: 'Workshop venue',
        value: 'TBA',
        detail: 'Venue and address will be published after confirmation.',
      },
      {
        label: 'Nearest airport',
        value: 'TBA',
        detail: 'International arrival guidance will be added here.',
      },
      {
        label: 'Local transport',
        value: 'TBA',
        detail: 'Rail, taxi and public transport options will follow.',
      },
    ],
  },
  registration: {
    status: 'REGISTRATION NOT YET OPEN',
    message:
      'GAIA 2027 registration details are being prepared. No personal information is collected on this website at this stage.',
    steps: [
      'Review the participation and presentation requirements.',
      'Prepare your personal and affiliation information.',
      'Submit registration through the official channel once announced.',
      'Receive confirmation from the organizing committee.',
    ],
    fees: [
      { category: 'Regular participant', early: 'TBA', regular: 'TBA' },
      { category: 'Student participant', early: 'TBA', regular: 'TBA' },
    ],
    policies: [
      'Registration capacity and eligibility will be announced.',
      'Payment instructions will only appear after official confirmation.',
      'Accommodation is expected to be arranged separately unless stated otherwise.',
      'Cancellation and substitution terms will be published before registration opens.',
    ],
  },
  program: [
    {
      date: 'DAY 01',
      label: 'Arrival & connection',
      items: [
        {
          time: 'TBA',
          title: 'On-site registration',
          detail: 'Participant check-in and workshop materials.',
        },
        {
          time: 'TBA',
          title: 'Welcome gathering',
          detail: 'An informal opening for participants and organizers.',
        },
      ],
    },
    {
      date: 'DAY 02',
      label: 'Ideas across scales',
      items: [
        {
          time: 'TBA',
          title: 'Opening & keynote lectures',
          detail: 'Plenary talks and moderated discussion.',
        },
        {
          time: 'TBA',
          title: 'Young researcher sessions',
          detail: 'Focused presentations with extended discussion.',
        },
        {
          time: 'TBA',
          title: 'Poster exchange',
          detail: 'An open-format research conversation.',
        },
      ],
    },
    {
      date: 'DAY 03',
      label: 'Research in dialogue',
      items: [
        {
          time: 'TBA',
          title: 'Keynote & invited sessions',
          detail: 'Cross-disciplinary perspectives in geomechanics.',
        },
        {
          time: 'TBA',
          title: 'Closing & awards',
          detail: 'Workshop reflections and recognition.',
        },
      ],
    },
    {
      date: 'DAY 04',
      label: 'Field perspective',
      items: [
        {
          time: 'TBA',
          title: 'Technical visit',
          detail: 'Optional site visit, subject to final arrangements.',
        },
      ],
    },
  ],
  previousEvents: [
    {
      year: '2026',
      edition: 'Second Workshop',
      location: 'Jinan, Shandong, China',
      dates: '27–30 March 2026',
      theme: 'Advances in Micro–Macro Geomechanics',
      href: 'https://gaia2026.hi97.cn/',
    },
    {
      year: '2025',
      edition: 'First Workshop',
      location: 'Atami, Shizuoka, Japan',
      dates: '22–24 February 2025',
      theme: 'The beginning of the GAIA research network',
      href: 'https://www.kz.tsukuba.ac.jp/~tmatsu/GAIA_homepage/',
    },
  ],
  contacts: [
    {
      role: 'Chairman',
      name: 'Jianfeng Wang',
      email: 'jefwang@cityu.edu.hk',
    },
    {
      role: 'Organizing committee',
      name: 'GAIA 2027',
      email: 'gaia_2027@outlook.com',
    },
  ],
  committee: [
    {
      role: 'Chairman',
      name: 'Prof. Jeff Wang',
      profileUrl: 'https://scholars.cityu.edu.hk/en/persons/jefwang/',
      photo: 'assets/contact/wang-jianfeng.webp',
      biography:
        'An internationally recognized scholar in micro–macro mechanics of granular materials, X-ray CT characterization, DEM simulation and data-driven analysis of geomaterials.',
    },
    {
      role: 'Vice-chairman',
      name: 'Dr. Kostas Senetakis',
      profileUrl: 'https://scholars.cityu.edu.hk/en/persons/ksenetak/',
      photo: 'assets/contact/senetakis-kostas.webp',
      biography:
        'His research spans experimental soil mechanics and dynamics, micromechanics, tribology, geosynthetics and recycled aggregates in geotechnical engineering.',
    },
    {
      role: 'Vice-chairman',
      name: 'Dr. Fiona Kwok',
      profileUrl: 'https://scholars.cityu.edu.hk/en/persons/fionkwok/',
      photo: 'assets/contact/kwok-fiona.webp',
    },
    {
      role: 'Secretary',
      name: 'Dr. Zhiren Zhu',
      profileUrl: 'https://scholars.cityu.edu.hk/en/persons/zhirenzhu2/',
      photo: 'assets/contact/zhu-zhiren.png',
    },
  ],
  contactChannels: [
    {
      kind: 'person',
      label: 'Jianfeng Wang',
      email: 'jefwang@cityu.edu.hk',
    },
    {
      kind: 'committee',
      label: 'Organizing Committee',
      email: 'gaia_2027@outlook.com',
    },
  ],
  organizedBy: [
    {
      label: 'Organized by',
      name: 'City University of Hong Kong',
      logo: 'assets/contact/cityu-logo.webp',
    },
  ],
  supportedBy: [
    {
      label: 'Supported by',
      name: 'SIMSG',
      logo: 'assets/contact/simsg.png',
    },
    {
      label: 'Supported by',
      name: 'TC105 Geo-Mechanics from Micro to Macro',
      logo: 'assets/contact/tc105.png',
    },
    {
      label: 'Supported by',
      name: 'CISMGE-CCES',
      logo: 'assets/contact/cismge.png',
    },
  ],
  organizations: [
    { role: 'Organized by', name: 'City University of Hong Kong' },
    { role: 'Supported by', name: 'SIMSG' },
    { role: 'Supported by', name: 'CISMGE-CCES' },
  ],
}
