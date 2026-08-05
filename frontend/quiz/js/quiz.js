const styleVariants = {
  pink: {
    color: '#FB83AD',
    textColor: 'var(--_palette---grey)',
    image: 'https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a63398905cafa158a01ab80_quiz-bg-pink.webp',
  },
    orange: {
    color: '#FF8700',
    textColor: 'var(--_palette---grey)',
    image: 'https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a633989dfb16996cdaf38f7_quiz-bg-orange.webp',
  },
    green: {
    color: '#7DDC1D',
    textColor: 'var(--_palette---grey)',
    image: 'https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a633989240b6a9700870b5f_quiz-bg-green.webp',
  },
    red: {
    color: '#F9001B',
    textColor: 'var(--_palette---white)',
    image: 'https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a633989d1bd20370034fffd_quiz-bg-red.webp',
  },
    blue: {
    color: '#36D4E7',
    textColor: 'var(--_palette---grey)',
    image: 'https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a633989357706f28432fa10_quiz-bg-blue.webp',
  }


}

const json = [
  {
    id: 1,
    label: `On the go`,
    question: `<div>Some of our roles are office based or onsite in a warehouse or fulfilment
      centre (e.g. Personal Shoppers who load bags, and Team Managers), and some
      are out and about every day (like zippy Zoom bike riders making around 30
      drops a shift across the city).</div>
      Where would you prefer to work?`,
    styleVariants: styleVariants.pink,
    options: [
      {
        id: "A",
        text: `I am looking for an onsite role.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: 0,
          LGV: -100,
        },
      },
      {
        id: "B",
        text: `I like to be out and about.`,
        scores: {
          customerService: 1,
          headOffice: -100,
          warehouse: 0,
          LGV: 2,
        },
      },
    ],
    answer: `Our teams are transforming the future of grocery delivery. Whether
      you prefer to stay onsite, or you’re interested in powering our zippy bikes or
      purple vans - there’s a hometown hero role for you.`
  },
  {
    id: 2,
    label: `Heavy lifting`,
    question: `<div>
      We deliver to customers’ doorsteps from remote farms to high rise flats. Our
      robots do a lot of heavy lifting onsite, but our Customer Service drivers often
      carry a ton of shopping over their shift, our LGV drivers couple and uncouple
      heavy vehicles, our Zoom riders manage 100kg fully-loaded ebikes, and our
      warehouse teams roll large crates on and off lorries. Everyone needs to follow
      the right safety procedures.
    </div>
      How do you feel about heavy lifting?`,
    styleVariants: styleVariants.orange,
    options: [
      {
        id: "A",
        text: `I am comfortable with physical work and understand the importance of lifting safely and asking for support when I need it.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 1,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I’d prefer a role where there is little or no heavy lifting, in head office or where I can use my specialist skills elsewhere.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: 0,
          LGV: 0,
        },
      },
    ],
    answer: `Our robots do a lot of heavy lifting onsite, but every supply chain role
      has some heavy lifting involved every day. If that’s not your cup of tea, you
      might be a better fit for a head office role, or have specialist qualifications to
      join us elsewhere.`
  },
  {
    id: 3,
    label: `Shift work`,
    question: `<div>Our customers rely on us to get their groceries to them whenever they need
      them – ready for when tummies rumble! That means our Warehouse, Customer
      Delivery, Engineering and LGV teams work shifts of 8-12 hrs, at weekends or
      sometimes overnight.
      This isn’t for everyone so it’s good if you’ve had some experience of it. You have
      to be as alert at night as during the day, working with the same high levels of
      safety.</div>
      When are you able to work?`,
    styleVariants: styleVariants.green,
    options: [
      {
        id: "A",
        text: `I’m only after a weekday office hours role`,
        scores: {
          customerService: -100,
          headOffice: 1,
          warehouse: -100,
          LGV: -100,
        },
      },
      {
        id: "B",
        text: `I can work whatever shifts are necessary, which I know might include long hours, regular weekends or nighttime work. But I’m prepared for it.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 1,
          LGV: 1,
        },
      },
    ],
    answer: `All our Warehouse, Customer Delivery and LGV teams work shifts and
        some can be up to 12 hours long (in Engineering). You can check out our
        example rosters on the website.`
  },
  {
    id: 4,
    label: `Customer interaction`,
    question: `<div>We appreciate the part we all play in ensuring our success and our van drivers
        and ebike riders are the face of Ocado and our partners. They don’t chuck
        shopping outside the door in the rain – they ring the bell, say hello and hand
        the order over with a smile. They are there if someone needs more help, and if
        something spills, they sort it out.</div>
        How do you feel about putting the customer first every day?`,
      styleVariants: styleVariants.red,
    options: [
      {
        id: "A",
        text: `I'm a people person and I enjoy the customer contact. I'll offer a hand whenever someone looks like they need it, I don't wait to be asked.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 0,
          LGV: 0,
        },
      },
      {
        id: "B",
        text: `I’m always thinking of the end customer, but I’d prefer to be in a role that isn’t directly customer-facing.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: 0,
          LGV: 0,
        },
      },
    ],
    answer: `We expect everyone at Ocado Logistics to treat each other as well as
        our customers - with empathy and respect whilst making a big impact. If you need to go that little bit further and help and put your customers shopping in the kitchen we don’t
        mind as long as you are comfortable doing so – as delivering smiles is our
        thing and our hometown heroes make service pop.`
  },
  {
    id: 5,
    label: `Busy vs steady pace`,
    question: `<div>Some days here move really fast! We pack and pick one order every second of
        the day, and there’s the occasional ‘that wasn’t part of the plan!’ moment. When
        there are lots of customers waiting and traffic is bad, or a conveyer is broken,
        priorities can change quickly and decisions need to be made on the go. Pace
        matters, but safety comes first. Always. Fast is good. Rushed and risky is not.</div>`,
    styleVariants: styleVariants.blue,
    options: [
      {
        id: "A",
        text: `I enjoy being busy and time pressure doesn’t stop me doing things the
right way. I’m organised and move quickly, communicating clearly, to get
everything done on time.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 0,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I prefer slower paced work – where I can take my time, and consider
decisions - especially about safety - without feeling rushed.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: -100,
          LGV: -100,
        },
      },
    ],
    answer: `Some days here move fast. Really fast! We pack and pick one order
every single second of the day. Think full vans, busy roads, lots of orders,
changing priorities and the occasional ‘well, that wasn’t part of the plan’
moments. Pace matters, but safety comes first. Always. Fast is good. Rushed
and risky is not.`
  },
  {
    id: 6,
    label: `Being on the road`,
    question: `<div>
    Some roles involve spending a lot of time on the road. You’ll need to live within
an hour of your base, to avoid adding to that distance. Our Customer Service
Team Members regularly drive 200 miles – the same distance as London to
Manchester! Our vans have in-built safety features but you must stay alert and
follow safety rules (no checking phones!), even when delays test your patience.</div>
    How do you feel about driving or riding a bike all day?`,
    styleVariants: styleVariants.pink,
    options: [
      {
        id: "A",
        text: `I enjoy being out on the road, in control of the radio station – and I
always stay focused and safe.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 0,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I don’t think I would enjoy spending my day driving or riding an ebike`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: 0,
          LGV: -100,
        },
      },
    ],
    answer: `Some people enjoy the rhythm of being out and about, others staying
focused and cracking on safely with more people around them throughout the
day. Whichever driver role you apply for safety is paramount and our vans are
fitted with various safety measures and you must remain alert, patient and safe
– even when traffic, delays or tricky routes test your patience.`
  },
  {
    id: 7,
    label: `Mental/physical resilience`,
    question: `<div>As with most jobs, there will be difficult days and we don’t expect anyone to be cheerful all the time. It might be working all day in cold storage (0-5 degrees), walking repeatedly across site (our Erith site is 7x the size of Wembley and our
    stock availability advisors regularly clock up 20,000 steps), or spending your
    Engineering shift manually clearing conveyors instead of using your tools.
    Being able to stay calm when things get tricky can make a huge difference.</div>
    How do you stay positive when the day is challenging?`,
    styleVariants: styleVariants.orange,
    options: [
      {
        id: "A",
        text: `I am resilient and can keep a positive mindset even when the work is
        physically or mentally demanding`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 1,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I would prefer to work with less pressure, and fewer physical demands or
        unexpected challenges.`,
        scores: {
          customerService: 0,
          headOffice: 1,
          warehouse: 0,
          LGV: 0,
        },
      },
    ],
    answer: `Not every shift offers sunshine – and we don’t expect anyone to be
cheerful every second of the day. But being able to stay calm and think things
through clearly when things get tricky can make a huge difference.`
  },
  {
    id: 8,
    label: `Time pressure`,
    question: `<div>Because our customers pay for us to deliver bang on time, staying on track
during a shift is vital, as one delay can have a knock-on effect across the whole
day, and everyone feels the pressure. Speed matters, but good judgement and
safety matter more. You might be an LGV driver who needs to reverse into a
tight bay in only 5 minutes or a Zoom rider trying to make up time between
deliveries – working fast while staying safe and providing great customer
service and respect to your peers is essential.</div>`,
    styleVariants: styleVariants.green,
    options: [
      {
        id: "A",
        text: `I’m great at staying calm under pressure and making sensible decisions
quickly and I know to ask for support if I need it. I’d get a real sense of
achievement from keeping everything running on time.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 1,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I prefer to have time to think about important decisions, or others on
hand to help me when there is an urgent issue.`,
        scores: {
          customerService: 0,
          headOffice: 0,
          warehouse: 0,
          LGV: 0,
        },
      },
    ],
    answer: `Speed matters, but good judgement, legal compliance and safety
matters more. Our customers count on us to deliver when we say we will, so
one delay can have a knock-on effect across the whole day, and everyone feels
the pressure.`
  },
  {
    id: 9,
    label: `Teamwork`,
    question: `<div>In many of our roles, the work only runs smoothly when people stay connected.
    That might mean a planner juggling shifts with a Team Lead, a driver flagging
    an issue on the road, an engineer working with operations to get a conveyor
    moving again or a personal shopper stepping in to support a busy area.</div>
    <div>Clear communication matters here. Sometimes, you’ll need to share updates,
    ask for input, offer help or work through a problem with others so the right
    decision can be made quickly.</div>
    When things get busy or plans change, how do you prefer to work?`,
    styleVariants: styleVariants.red,
    options: [
      {
        id: "A",
        text: ` I prefer to be part of a team and like having people around me to share
ideas, support each other and get things done together. I’m happy to ask for
input or offer help.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: 1,
          LGV: 0,
        },
      },
      {
        id: "B",
        text: ` I’m comfortable working independently and prefer to solve problems myself
before involving others.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: -100,
          LGV: 1,
        },
      },
    ],
    answer: `No one keeps this operation moving completely on their own – not
even the person with the best spreadsheet, the quickest route or the most
heroic tea round. Here, teamwork means knowing when to communicate, when
to listen and when to ask for help and step in for someone else. That’s what
keeps us moving.`
  },
  {
    id: 10,
    label: `Accountability`,
    question: `<div>Here, accountability is not about taking the blame for everything. It’s about
speaking up if there’s an issue, following the process and doing your bit to help.
Some roles need people to work independently without a manager beside
them, and everyone helps keep the day running smoothly and safely. If an order
is missing, a robot stops, a route is delayed, or a customer needs extra help,
you’ll need to take ownership of your part - speaking up early, following the
right process, and doing what you can to fix the issue.</div>
    When something goes wrong, what are you most likely to do?`,
    styleVariants: styleVariants.blue,
    options: [
      {
        id: "A",
        text: ` I am comfortable using my initiative and judgement to let the right people
know quickly and help put things right.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 0,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: ` I prefer familiar processes and clear handovers. When things go wrong, I’ll
explain what happened if I’m asked, but I’m not comfortable jumping into
problems, especially if the issue wasn’t my fault or someone else can deal with it
better than me.`,
        scores: {
          customerService: -100,
          headOffice: 1,
          warehouse: 0,
          LGV: -100,
        },
      },
    ],
    answer: ` If you chose A you’re likely to flag issues early and look proactively for
how you can help. If you identify more with B that’s OK too. It may mean you
prefer clear handovers and following more familiar processes to fix issues.`
  },
  {
    id: 11,
    label: `Leadership`,
    question: `<div>
    Here, leadership is not always about a job title. Some people have a knack for
steadying the team when the day throws a curve ball. Not by barking orders,
but by staying calm and leading by example. They share the right information,
identify what needs doing and support teammates to do it.
    </div>
    When the team is busy or something unexpected happens, what are you
most likely to do?`,
    styleVariants: styleVariants.pink,
    options: [
      {
        id: "A",
        text: `When there’s a problem, I naturally step up, take the lead and help the team find a way forward.`,
        scores: {
          customerService: 0,
          headOffice: 1,
          warehouse: 0,
          LGV: 0,
        },
      },
      {
        id: "B",
        text: `I’m a strong team player who’s happiest following a clear plan, working to schedule and doing my role to the best of my ability.`,
        scores: {
          customerService: 0,
          headOffice: 0,
          warehouse: 0,
          LGV: 0,
        },
      },
    ],
    answer: `Here, leadership is not about a job title. It’s about attitude, awareness
    and helping the team do the right thing. Some people have a knack for helping
    the team find its feet when the day throws a bit of a curve ball. Not by barking
    orders or waving a clipboard around, but by staying calm, leading by example,
    identifying what needs doing and supporting teammates with a bit of a steady
    energy to help keep things moving.`
  },
  {
    id: 12,
    label: `Career progression and learning`,
    question: `<div>
    Many of our roles offer opportunities for training, taking on more responsibility,
and developing others, or progressing into a different part of the business.
Some roles require you to keep up to date with regulations (LGV drivers) or new
technology (Engineers), others give you the opportunity to develop deeper
expertise within the role.
    </div>
    How do you feel about learning and developing in your role?`,
    styleVariants: styleVariants.orange,
    options: [
      {
        id: "A",
        text: ` I’m looking for a job where I can perfect my skills and go home satisfied that
I’ve given my all during a shift. I’m less interested in extra learning, or career
moves.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 1,
          LGV: 0,
        },
      },
      {
        id: "B",
        text: ` I like learning and am interested in building a long-term career, progressing,
trying different areas or developing specialist skills. I’ll seek out opportunities
and put myself forward.`,
        scores: {
          customerService: 0,
          headOffice: 1,
          warehouse: 0,
          LGV: 1,
        },
      },
    ],
    answer: `Some people join us for a steady job and simply want to become
brilliant at what they do – others for a career. Sometimes the best career moves
are sideways, diagonal, or into a role you didn’t know existed! We’re interested
to hear from curious people, open to learning and growing with us over time.`
  },
];
