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
      id: 'hong-kong-harbour',
      image: 'assets/carousel/hong-kong-harbour.webp',
      alt: 'Hong Kong harbour skyline',
      objectPosition: 'center center',
    },
    {
      id: 'cityu-campus',
      image: 'assets/carousel/cityu-campus-main.webp',
      alt: 'City University of Hong Kong campus view',
      objectPosition: 'center center',
      objectFit: 'contain',
      background: '#f8fbff',
    },
    {
      id: 'geomechanics-structure',
      image: 'assets/carousel/geomechanics-structure-3.webp',
      alt: 'Geomechanics research visualization',
      objectPosition: 'center center',
      objectFit: 'contain',
      background: '#f7fbff',
    },
    {
      id: 'numerical-simulation',
      image: 'assets/carousel/numerical-simulation-geotechnics-2.webp',
      alt: 'Numerical simulation in geotechnics',
      objectPosition: 'center center',
      objectFit: 'contain',
      background: '#f8fbff',
    },
    {
      id: 'ace-department',
      image: 'assets/carousel/ace-department-full.webp',
      alt: 'Department of Architecture and Civil Engineering at CityUHK',
      objectPosition: 'center center',
      objectFit: 'contain',
      background: '#f8fbff',
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
      label: 'Capacity',
      value: '150',
      detail: 'Registration is limited to approximately 150 participants',
    },
  ],
  timeline: [
    {
      date: '2026/12/20',
      title: 'Online registration opens.',
      description: 'GAIA 2027 online registration is planned to open.',
      status: 'pending',
    },
    {
      date: '2027/03/22',
      title: 'Early-bird registration closes.',
      description: 'Early-bird registration is planned to close.',
      status: 'pending',
    },
    {
      date: '2027/04/30',
      title: 'Final registration closes.',
      description: 'Final online registration will close before workshop preparation.',
      status: 'pending',
    },
    {
      date: '2027/05/20',
      title: 'Workshop on-site registration starts.',
      description: 'Participants arrive in Hong Kong and collect materials.',
      status: 'pending',
    },
    {
      date: '2027/05/21',
      title: 'GAIA 2027 officially starts.',
      description: 'The third GAIA workshop begins at City University of Hong Kong.',
      status: 'pending',
    },
  ],
  homeFeatures: [
    {
      kicker: 'ABOUT THE ALLIANCE',
      title: 'GAIA: Geomechanics Alliance In Asia',
      body: 'GAIA, the Geomechanics Alliance in Asia, is proposed as a platform for Asian students and young researchers in geomechanics to exchange knowledge and ideas, fostering the development of a lasting research network.',
      linkLabel: 'More about GAIA',
      linkTo: '/about',
    },
    {
      kicker: 'PREVIOUS WORKSHOP',
      title: 'GAIA 2027',
      body: 'GAIA Third Workshop (GAIA 2027) is scheduled from 20 to 25 May 2027 in Hong Kong, China.',
      linkLabel: 'More about the workshop',
      linkTo: '/workshop',
    },
  ],
  about: {
    whatIsGaia: [
      'GAIA (Geomechanics Alliance in Asia) is a proposed pan-Asian initiative that aims to build a vibrant, interconnected platform for students, young researchers, and professionals in geomechanics, geotechnical engineering, and related earth-science disciplines. By promoting regular knowledge exchange, collaborative research, and professional networking, GAIA seeks to establish a durable research community that tackles both regional and global challenges in geomechanics and related fields.',
      "Similar initiatives exist elsewhere - for example, ALERT Geomaterials, founded in 1989, has sustained a close European network in research on geomaterials for decades. ALERT leverages Europe's compact geography to run annual thematic sessions and doctoral schools, which have been instrumental in fostering strong scientific ties and training successive generations of researchers.",
      "Recognizing Asia's much larger geographic scale and greater cultural and institutional diversity, GAIA will adopt a rotating host-country model to maximize accessibility and ensure broad regional representation. By connecting talent, facilities, and industry needs, GAIA will help form resilient, cross-border networks that accelerate innovation, strengthen capacity, and contribute to the sustainable development and safety of infrastructure throughout the region.",
    ],
    scientificHighlights: [
      {
        title: 'Experimental investigations',
        text: 'Experimental investigations on soils and granular materials, addressing key aspects such as particle-scale effects, partial saturation, time-dependent behaviour, and coupled physical processes.',
      },
      {
        title: 'Modeling approaches',
        text: 'Modeling approaches spanning both discrete and continuum perspectives, aiming to better capture material behaviour across multiple scales and under complex conditions.',
      },
      {
        title: 'Academic exchange',
        text: 'The event will bring together professors, experts, and students, offering a platform for in-depth discussions and knowledge exchange in this rapidly evolving field.',
      },
    ],
  },
  workshop: {
    overview: [
      'Geomechanics Alliance in Asia (GAIA) aims to provide a platform for young researchers and graduate students in geomechanics and geotechnical engineering across Asia to exchange ideas and foster collaboration. The annual GAIA Workshop serves as the main channel for communication and interaction.',
      'The third workshop, GAIA 2027, will be hosted by City University of Hong Kong and is scheduled to take place from 20 to 25 May 2027 in Hong Kong, China. The main theme is Advances in Micro–Macro Geomechanics, covering key topics in geotechnical engineering such as particle-scale effects, micro–macro constitutive relationships, multiphase and multi-physics coupling, multiscale experimental and monitoring techniques, and multiscale numerical modeling methods.',
      'To ensure high-quality discussions and interactions, the workshop will be limited to approximately 150 participants.',
    ],
    topics: [
      'Advanced characterization of geomaterials using X-ray microtomography (CT), X-ray diffraction (XRD), 3D laser scanning, particle image velocimetry (PIV), and other non-destructive optical and imaging techniques',
      'Latest development of numerical modelling methods including DEM, FEM, FDM, MPM, CFD, LBM, and SPH for multiphase geomaterials, granular instability, and granular flow problems',
      'New development and application of machine learning and deep learning methods in geotechnical engineering',
      'Physics-informed, data-driven constitutive modelling of geomaterials',
      'Intelligent characterization, modelling, and simulation in geotechnical engineering using data-driven approaches',
      'Geotechnical infrastructure monitoring using novel remote sensing techniques',
    ],
    speakers: Array.from({ length: 6 }, (_, index) => ({
      name: `Keynote speaker ${String(index + 1).padStart(2, '0')}`,
      affiliation: 'To be announced',
      topic: 'Profile, portrait and lecture title will be added after confirmation.',
    })),
    venue: [
      {
        label: 'Host',
        value: 'CityUHK',
        detail: 'City University of Hong Kong will host GAIA 2027.',
      },
      {
        label: 'City',
        value: 'Hong Kong',
        detail: 'Travel and local access guidance will be updated later.',
      },
      {
        label: 'Capacity',
        value: '150',
        detail: 'Registration is limited to approximately 150 participants.',
      },
    ],
    dates: [
      {
        date: 'May 20, 2027',
        title: 'Workshop on-site registration starts',
      },
      {
        date: 'May 21, 2027',
        title: 'First official workshop day',
        detail: 'Gala dinner and poster session are planned.',
      },
      {
        date: 'May 22, 2027',
        title: 'Second official workshop day',
        detail: 'Award ceremony and academic sessions are planned.',
      },
      {
        date: 'May 25, 2027',
        title: 'Construction site visit',
        detail: 'Optional activity, subject to final arrangements.',
      },
    ],
    framework: [
      {
        label: 'Maximum participants',
        value: '150',
        detail:
          'registration is limited to 150 participants. Once this number is reached, registration will be closed',
      },
      {
        label: 'Language',
        value: 'English',
        detail: '',
      },
      {
        label: 'Presentation',
        value: 'Mainly from young researchers and students',
        detail: '',
      },
      {
        label: 'Presentation Time per Person',
        value: '20 min',
        detail: 'including discussion',
      },
    ],
    posterSessions: [
      'Please refer to the workshop schedule for the detailed conference timetable. Participants are required to prepare an electronic file of their academic poster in a 1:2 aspect ratio, clearly presenting the research topic, main content, and key conclusions.',
      'The organizer will arrange centralized poster printing, and the electronic poster file should be sent to the conference email address by May 20, 2027. Before the poster session begins, on-site staff will contact participants and guide them to the designated location.',
      "If poster submissions exceed the venue's capacity, the organizing committee may screen submitted materials based on academic innovation and thematic relevance. Participants affected by this process will be informed by email.",
      'We look forward to your wonderful presentations.',
    ],
    registrationCta: {
      kicker: 'REGISTRATION',
      title: 'Online registration will officially start on December 20, 2026',
      body: 'Registration details, participation guidance, and modification instructions will be updated on the Registration page.',
      linkLabel: 'Go to Registration',
      linkTo: '/registration',
    },
    timetableNote:
      'This tentative timetable may change depending on follow-up arrangements for the workshop. A detailed programme table will be added later.',
  },
  registration: {
    status: 'REGISTRATION IS OPEN NOW',
    message:
      'The items you need to input for registration are listed below. The official registration channel will be linked here once it is confirmed.',
    steps: [
      'Personal information: name, email, living address, phone number, status, and affiliation.',
      'Accommodation request: stay dates, room type, roommate names, and dietary restrictions.',
      'Oral or poster presentation request: relevant research information is required.',
      'GAIA questionnaire: short questions prepared by the organizing committee.',
    ],
    fees: [
      {
        category: 'Regular Participants',
        early: 'HKD 3,000 per person',
        regular: 'HKD 3,500 per person',
      },
      {
        category: 'Student Participants',
        early: 'HKD 1,500 per person',
        regular: 'HKD 1,800 per person',
      },
    ],
    policies: [
      'If you need to modify submitted registration details, use the View/Edit/Cancel function after entering your personal registration ID.',
      'The personal registration ID is generated after successful initial registration and should be saved locally by each participant.',
      'Registration capacity is limited to approximately 150 participants.',
      'Final payment and cancellation policies will be confirmed by the organizing committee.',
    ],
    timeline: [
      {
        date: '2026/12/20',
        title: 'Online registration opens.',
        description: 'Online registration is planned to open.',
        status: 'pending',
      },
      {
        date: '2027/03/22',
        title: 'Early-bird registration closes.',
        description: 'Early-bird registration is planned to close.',
        status: 'pending',
      },
      {
        date: '2027/04/30',
        title: 'Final registration closes.',
        description: 'The closing date remains subject to official confirmation.',
        status: 'pending',
      },
      {
        date: '2027/05/20',
        title: 'Workshop on-site registration starts.',
        description: 'Participants arrive and collect workshop materials.',
        status: 'pending',
      },
      {
        date: '2027/05/21',
        title: 'GAIA 2027 officially starts.',
        description: 'The first official workshop day begins.',
        status: 'pending',
      },
    ],
    feeNote:
      'The registration fee covers conference accessories, relevant facilities and materials for oral presentations and poster sessions, lunches, dinners, the gala dinner during the conference dates, participation certificates and award certificates, and expenses related to the construction site visit.',
  },
  program: [
    {
      date: 'May 20, 2027',
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
      date: 'May 21, 2027',
      label: 'First official workshop day',
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
          title: 'Gala dinner & poster session',
          detail: 'Academic exchange and evening programme.',
        },
      ],
    },
    {
      date: 'May 22, 2027',
      label: 'Second official workshop day',
      items: [
        {
          time: 'TBA',
          title: 'Keynote & invited sessions',
          detail: 'Cross-disciplinary perspectives in geomechanics.',
        },
        {
          time: 'TBA',
          title: 'Award ceremony',
          detail: 'Workshop reflections and recognition.',
        },
      ],
    },
    {
      date: 'May 25, 2027',
      label: 'Field perspective',
      items: [
        {
          time: 'TBA',
          title: 'Construction site visit',
          detail: 'Optional site visit, subject to final arrangements.',
        },
      ],
    },
  ],
  previousEvents: [
    {
      year: '2026',
      edition: 'Second Workshop',
      title: 'GAIA 2026 Jinan, Shandong, China | Mar. 27-30, 2026',
      location: 'Jinan, Shandong, China',
      dates: '27-30 March 2026',
      theme: 'Advances in Micro–Macro Geomechanics',
      href: 'https://gaia2026.hi97.cn/',
      images: [
        {
          src: 'assets/previous/gaia-2026-group.webp',
          alt: 'GAIA 2026 workshop participants',
          variant: 'wide',
        },
        {
          src: 'assets/previous/gaia-2026-shandong.webp',
          alt: 'Shandong venue and city view for GAIA 2026',
          variant: 'wide',
        },
        {
          src: 'assets/previous/gaia-2026-shandong-extra.webp',
          alt: 'GAIA 2026 workshop scene in Shandong',
          variant: 'wide',
        },
      ],
    },
    {
      year: '2025',
      edition: 'First Workshop',
      title: 'GAIA 2025 Atami, Shizuoka, Japan | Feb. 22-24, 2025',
      location: 'Atami, Shizuoka, Japan',
      dates: '22-24 February 2025',
      theme: 'The beginning of the GAIA research network',
      href: 'https://www.kz.tsukuba.ac.jp/~tmatsu/GAIA_homepage/',
      images: [
        {
          src: 'assets/previous/gaia-2025-main.webp',
          alt: 'GAIA 2025 workshop group photo',
          variant: 'wide',
        },
        {
          src: 'assets/previous/gaia-2025-1-3.webp',
          alt: 'GAIA 2025 workshop moment',
          variant: 'small',
        },
        {
          src: 'assets/previous/gaia-2025-1-4.webp',
          alt: 'GAIA 2025 academic exchange',
          variant: 'small',
        },
        {
          src: 'assets/previous/gaia-2025-1-1.webp',
          alt: 'GAIA 2025 participants',
          variant: 'small',
        },
        {
          src: 'assets/previous/gaia-2025-1-2.webp',
          alt: 'GAIA 2025 venue scene',
          variant: 'small',
        },
      ],
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
        'An internationally recognized scholar in micro-macro mechanics of granular materials, X-ray CT characterization, DEM simulation and data-driven analysis of geomaterials.',
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
