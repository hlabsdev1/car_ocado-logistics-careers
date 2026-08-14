const styleVariants = {
  pink: {
    color: "#FB83AD",
    textColor: "var(--_palette---grey)",
    image:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a63398905cafa158a01ab80_quiz-bg-pink.webp",
  },
  orange: {
    color: "#FF8700",
    textColor: "var(--_palette---grey)",
    image:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a633989dfb16996cdaf38f7_quiz-bg-orange.webp",
  },
  green: {
    color: "#7DDC1D",
    textColor: "var(--_palette---grey)",
    image:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a633989240b6a9700870b5f_quiz-bg-green.webp",
  },
  red: {
    color: "#F9001B",
    textColor: "var(--_palette---white)",
    image:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a633989d1bd20370034fffd_quiz-bg-red.webp",
  },
  blue: {
    color: "#36D4E7",
    textColor: "var(--_palette---grey)",
    image:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a633989357706f28432fa10_quiz-bg-blue.webp",
  },
};

const json = [
  {
    id: 1,
    label: `On the go`,
    question: `<div>Our roles are as varied as our teams and some are office-based or in one particular warehouse or fulfilment centre (Personal Shoppers who load the bags, and Team Managers for example), and some are out and about every day (our Zoom last mile bike riders can make up to 30 drops per shift across busy city streets on power-assisted bikes).</div>
    Which of these best describes where you like to work?`,
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
    answer: `All of our teams are transforming the future of grocery deliveries and making sure everyday moments flow. Whether you prefer to be based in one site – so might be more suitable for one of our warehouse roles or more suited to powering one of our zippy bikes or purple vans - there’s a hometown hero role for you within Ocado Logistics.  Let’s try and narrow that down!`,
  },
  {
    id: 2,
    label: `Heavy lifting`,
    question: `<div>We deliver to customers’ doorsteps - anywhere from remote farms to high rise flats. So whilst our robots do a lot of the heavy lifting, our Customer Service drivers will often carry a ton of shopping over just one shift, our LGV drivers need to be able to couple and uncouple vehicles, our Zoom riders able to manage a 100kg fully-loaded ebike, and our warehouse teams roll large crates on and off lorries. Everyone needs to ensure they follow safety procedures and use the right equipment but how do you feel about heavy lifting?
    </div>`,
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
        text: `That doesn’t really sound like me – I would prefer a role where there is little or no heavy lifting.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: 0,
          LGV: 0,
        },
      },
    ],
    answer: `Our robots might do a lot of heavy lifting but every role within the supply chain network we have created has an element of heavy lifting involved every day. But fear not – you may still be suited to a role within our head office or another specialist area.`,
  },
  {
    id: 3,
    label: `Shift work`,
    question: `<div>Our customers rely on us to get their groceries to them whenever they need them. There’s no telling when grumbling tummies might strike after all. That means many roles work 8-10 hour shifts at weekends or sometimes overnight. Which of these describes when you’re able to work?</div>`,
    styleVariants: styleVariants.green,
    options: [
      {
        id: "A",
        text: `I think I’d prefer routine so I’m really only after an office hours role.`,
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
    answer: `All of our Warehouse, Customer Delivery and LGV drivers work shift patterns and some shifts for our Engineers can be up to 12 hours long. This isn’t always for everyone, and we prefer you to have had some experience working in this kind of environment, there’s only so much coffee will power you through. You have to be just as alert and operate within the same high levels of safety we require during the day. You can view example rosters on our website to see how the shifts may fall.`,
  },
  {
    id: 4,
    label: `Customer interaction`,
    question: `<div>The people who deliver to our customers are the face of Ocado and our partners. They don’t chuck shopping outside the door or leave it on the drive in the pouring rain – they ring the bell, say hello and hand the order to the customer with a smile. For anyone needing a bit more help, they are there, and if something spills, they sort it out.</div>
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
    answer: `At Ocado Logistics, we treat colleagues and customers with empathy and respect. Sometimes, a small act can make a big impact. If a customer needs extra help, you may take their shopping into the kitchen - as long as you feel comfortable and follow the correct process. It’s all part of delivering smiles and making great service pop.`,
  },
  {
    id: 5,
    label: `Busy vs steady pace`,
    question: `<div>During busy shifts – when there is a list of drops to complete and traffic is bad, or lots of orders and a broken conveyor – the pace is fast, with priorities that can change quickly and decisions that need to be made on the go. At the same time, it’s important we do what’s right, especially for team safety. What sort of working pace suits you best?</div>`,
    styleVariants: styleVariants.blue,
    options: [
      {
        id: "A",
        text: `I enjoy a busy environment where I need to stay focused and organised, communicate clearly and keep moving to get things done on time. Time pressure doesn’t stop me doing things the right way.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 0,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I prefer slower-paced work – where I can take my time, consider the outcomes safely and avoid feeling rushed.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: -100,
          LGV: -100,
        },
      },
    ],
    answer: `Some days here move fast. Really fast! We pick and pack one order every single second of the day. Think full vans, busy roads, lots of orders, changing priorities and the occasional ‘well, that wasn’t part of the plan’ moments. Pace matters, but safety comes first. Always. Fast is good. Rushed and risky is not.`,
  },
  {
    id: 6,
    label: `Being on the road`,
    question: `<div>Some roles involve spending a lot of time on the road. We say you need to live within an hour of your base, so you’re not adding to that distance. Our Customer Service Team Members regularly cover two hundred miles in a shift – that’s the same as driving from London to Manchester! So, it’s essential to stay focused, follow safety rules and avoid any distractions (like glancing at your phone).</div>
    How do you feel about driving or riding a bike all day?`,
    styleVariants: styleVariants.pink,
    options: [
      {
        id: "A",
        text: `I enjoy being out on the road driving and in control of the radio – but I always make sure I stay focused and I’m always safe.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 0,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I don’t think I would enjoy spending long periods driving or riding an e-cargo bike.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: 0,
          LGV: -100,
        },
      },
    ],
    answer: `Some people enjoy the rhythm of being out on the road, while others prefer a role with more people around them throughout the day. Whichever driving role you apply for, safety always comes first. Our vehicles are fitted with a range of safety features, but you’ll also need to stay alert, patient and calm -even when traffic, delays or tricky routes put you to the test.`,
  },
  {
    id: 7,
    label: `Mental/physical resilience`,
    question: `<div>As with most jobs, there will be difficult days. That might mean anything from working all day in cold storage (0-5 degrees), planning shift patterns in advance to ensure we meet demand during the busy holiday season, walking repeatedly across the site (our Erith site is 7x the size of Wembley and our stock availability advisors regularly complete their 20,000 steps a day), or spending your Engineering shift manually clearing conveyors instead of using your tools.</div>
    How do you stay positive and keep going even when the day is challenging?`,
    styleVariants: styleVariants.orange,
    options: [
      {
        id: "A",
        text: `I am resilient and can keep a positive mental attitude even when the work is physically or mentally demanding.`,
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
    answer: `Let’s be honest, not every shift offers sunshine – and we don’t expect anyone to be cheerful every second of the day – we’re human after all and we have enough robots to look after. But being able to stay calm, resilient and safe when things get tricky or tense can make a huge difference here for you and your team.`,
  },
  {
    id: 8,
    label: `Time pressure`,
    question: `<div>Because our customers pay for us to deliver bang on time, staying on track during a shift is vital, as delays anywhere along the supply chain can knock things off schedule. But safety and process are important across all our roles. You might be an LGV driver who needs to reverse into a tight bay in only 5 minutes or a Zoom last mile rider trying to make up time between deliveries – the day can change quickly, so working fast while staying safe and providing great customer service or respect to your peers is essential.</div>`,
    styleVariants: styleVariants.green,
    options: [
      {
        id: "A",
        text: `I’m great at staying calm under pressure, thinking logically and making sensible decisions quickly. And I know to ask for support if I need it. I’d get a real sense of achievement from working well under time pressure.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 1,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I might struggle to make decisions quickly and would prefer to have someone else help me when there is an urgent issue or not to work under a lot of time pressure.`,
        scores: {
          customerService: 0,
          headOffice: 0,
          warehouse: 0,
          LGV: 0,
        },
      },
    ],
    answer: `Around here, we like pace - but we love good judgement. Speed matters, safety matters more, and teamwork keeps everything moving. Our customers count on us to deliver when we say we will, so one delay can have a knock-on effect across the whole day. We know that can bring pressure, which is why staying calm, making good decisions and supporting each other really matters.`,
  },
  {
    id: 9,
    label: `Teamwork`,
    question: `<div>In many of our roles, the work only runs smoothly when people stay connected. That might mean a planner juggling shifts with a Team Lead, a driver flagging an issue on the road, an engineer working with operations to get a conveyor moving again or a personal shopper stepping in to support a busy area.</div>
    <div>Clear communication matters here. Sometimes, you’ll need to share updates, ask for input, offer help or work through a problem with others so the right decision can be made quickly.</div>
    When things get busy or plans change, how do you prefer to work?`,
    styleVariants: styleVariants.red,
    options: [
      {
        id: "A",
        text: `I prefer to be part of a team and like having people around me to share ideas, updates, support each other to solve problems and get things done. I’m happy to ask for input or offer help when it keeps things moving.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: 1,
          LGV: 0,
        },
      },
      {
        id: "B",
        text: `I’m comfortable working independently and prefer to focus on solving problems myself before involving others. I’d rather limit extra conversations unless they are really needed.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: -100,
          LGV: 1,
        },
      },
    ],
    answer: `No one keeps this operation moving completely on their own – not even the person with the best spreadsheet, the quickest route or the most heroic tea round. Here, teamwork means knowing when to communicate, when to listen and when to ask for help and step in for someone else. That’s what keeps us moving.`,
  },
  {
    id: 10,
    label: `Accountability`,
    question: `<div>Some roles need people to work independently and sort out any problems without a manager immediately being present beside them. But everyone plays a part in keeping the day running smoothly and safely. And sometimes things go wrong – an order is missing, a robot stops, a route is delayed, or a customer needs extra help. When this happens, it’s important to take ownership of the part you play, follow the right process, speak up early and do what you can to fix the issue.</div>
    When something goes wrong during your shift or time in the office, what are you most likely to do?`,
    styleVariants: styleVariants.blue,
    options: [
      {
        id: "A",
        text: `I am comfortable taking responsibility for my part, using my initiative and judgement to let the right people know and focus on what I can do to help put things right.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 0,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I prefer to wait until I am asked what happened, especially if the issue wasn’t my fault or someone else may be better placed to deal with it.`,
        scores: {
          customerService: -100,
          headOffice: 1,
          warehouse: 0,
          LGV: -100,
        },
      },
    ],
    answer: `Here, accountability isn’t about taking the blame for everything. It’s about being honest, speaking up, following the process and doing your bit to help things get back on track.
    If you chose the first response, you’re likely to be someone who solves problems, flags issues early and focuses on what can be done next. If you identify more with the second response, that’s OK too. It may simply mean you prefer clearer guidance and handovers before deciding what to do next.`,
  },
  {
    id: 11,
    label: `Leadership`,
    question: `<div>Some people naturally look out for the wider team. They notice when someone needs support, keep things calm when plans change and are comfortable stepping forward when a decision or action is needed. That does not always mean being the loudest person in the room. It can mean setting a good example, sharing useful information, encouraging others or helping the team stay focused on what needs to happen next. There are sometimes opportunities for Team Manager roles based at our Hatfield Head Office or warehouses.</div>
    When the team is busy or something unexpected happens, what are you most likely to do?`,
    styleVariants: styleVariants.pink,
    options: [
      {
        id: "A",
        text: `I’ve managed teams before and get huge satisfaction helping people develop at work. I naturally step up, stay calm and help others understand what needs to happen. I like supporting people, sharing ideas and helping the team move forward.`,
        scores: {
          customerService: 0,
          headOffice: 1,
          warehouse: 0,
          LGV: 0,
        },
      },
      {
        id: "B",
        text: `I haven’t been a manager before and prefer to focus on my own tasks and let someone else take the lead on supporting others and co-ordinating what happens next. But I am always ready to step up and offer my support.`,
        scores: {
          customerService: 0,
          headOffice: 0,
          warehouse: 0,
          LGV: 0,
        },
      },
    ],
    answer: `Here, leadership is not about a job title. It’s about attitude, awareness and helping the team do the right thing. Some people have a knack for helping the team find its feet when the day throws a bit of a curveball. Not by barking orders or waving a clipboard around, but by staying calm, leading by example, identifying what needs doing and supporting teammates with a bit of a steady energy to help keep things moving.`,
  },
  {
    id: 12,
    label: `Career progression and learning`,
    question: `<div>Lots of people join us and go on to build their career in different directions. That might be learning new skills. Many of our roles offer opportunities for building confidence, training, developing others or taking on more responsibility. Some roles require you to keep up to date with regulations (LGV drivers) or new technology (Engineers) or give the opportunity to develop deeper expertise in the role.</div>
    <div>Whether you’re looking to progress or simply want to become great at what you do, there’s a place for you in our team.</div>
    How do you feel about learning and developing in your role?`,
    styleVariants: styleVariants.orange,
    options: [
      {
        id: "A",
        text: `I’m looking for a job I can settle into as it is, hone my skillset and I’m less interested in extra learning, or future career moves, preferring to give my ‘all’ during my shift and then go home. `,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 1,
          LGV: 0,
        },
      },
      {
        id: "B",
        text: `I like learning new things and would be interested in building a longer-term career, whether that means progressing, trying different areas or developing specialist skills over time. I am happy to seek these opportunities out and put myself forward.`,
        scores: {
          customerService: 0,
          headOffice: 1,
          warehouse: 0,
          LGV: 1,
        },
      },
    ],
    answer: `Some people join us for a job; others come to build a career. And the best career moves aren’t always straight up. Your next step could be sideways, diagonal, into a role you didn’t know existed- or even somewhere else across the Ocado Group.`,
  },
];
