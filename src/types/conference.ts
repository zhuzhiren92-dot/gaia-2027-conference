export type NavItem = {
  label: string
  path: string
}

export type SchoolSlide = {
  id: string
  index: string
  eyebrow: string
  title: string
  description: string
  note: string
  art: 'orbit' | 'strata' | 'grid' | 'wave'
}

export type Highlight = {
  label: string
  value: string
  detail: string
}

export type TimelineItem = {
  date: string
  title: string
  description: string
  status: 'confirmed' | 'pending'
}

export type Speaker = {
  name: string
  affiliation: string
  topic: string
}

export type ProgramDay = {
  date: string
  label: string
  items: Array<{
    time: string
    title: string
    detail: string
  }>
}

export type PreviousEvent = {
  year: string
  edition: string
  location: string
  dates: string
  theme: string
  href: string
}

export type ContactItem = {
  role: string
  name: string
  email: string
}

export type CommitteeMember = {
  role: string
  name: string
  profileUrl: string
  photo: string
  biography?: string
}

export type ContactChannel = {
  label: string
  email: string
  kind: 'person' | 'committee'
}

export type OrganizationLogo = {
  label: string
  name: string
  logo: string
}

export type ConferenceContent = {
  identity: {
    shortName: string
    year: string
    edition: string
    fullName: string
    theme: string
    location: string
    dates: string
  }
  navigation: NavItem[]
  schoolSlides: SchoolSlide[]
  highlights: Highlight[]
  timeline: TimelineItem[]
  workshop: {
    overview: string
    topics: string[]
    speakers: Speaker[]
    venue: Highlight[]
  }
  registration: {
    status: string
    message: string
    steps: string[]
    fees: Array<{ category: string; early: string; regular: string }>
    policies: string[]
  }
  program: ProgramDay[]
  previousEvents: PreviousEvent[]
  contacts: ContactItem[]
  committee: CommitteeMember[]
  contactChannels: ContactChannel[]
  organizedBy: OrganizationLogo[]
  supportedBy: OrganizationLogo[]
  organizations: Array<{ role: string; name: string }>
}
