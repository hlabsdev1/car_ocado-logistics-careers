const json = [
  {
    id: 1,
    label: `On the go`,
    question: `Our roles are as varied as our teams and some are office based or in one
      particular warehouse or fulfilment centre (Personal Shoppers who load the
      bags, and Team Managers for example), and some are out and about every day
      (our Zoom last mile bike riders can make up to 30 drops per shift across busy
      city streets on power assisted bikes).
      Which of these best describes where you like to work?`,
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
  },
  {
    id: 2,
    label: `Heavy lifting`,
    question: `We deliver to customers’ doorsteps - anywhere from remote farms to high rise
flats. So whilst our robots do a lot of the heavy lifting, our Customer Service
drivers will often carry a ton of shopping over just one shift, our LGV drivers
need to be able to couple and uncouple vehicles, our Zoom riders able to
manage a 100kg fully-loaded ebike, and our warehouse teams roll large crates
on and off lorries. Everyone needs to ensure they follow safety procedures and
use the right equipment but how do you feel about heavy lifting?`,
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
  },
  {
    id: 3,
    label: `Shift work`,
    question: `Our customers rely on us to get their groceries to them whenever they need
them. There’s no telling when grumbling tummies might strike after all. That
means many roles work 8-10 hour shifts at weekends or sometimes overnight.
Which of these describes when you’re able to work?`,
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
        text: `I can work whatever shifts are necessary, which I know might include long shifts, regular weekend or nighttime work. But I’m prepared for it.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 1,
          LGV: 1,
        },
      },
    ],
  },
  {
    id: 4,
    label: `Customer interaction`,
    question: `The people who deliver to our customers are the face of Ocado and our
      partners. They don’t chuck shopping outside the door or leave it on the drive in
      the pouring rain – they ring the bell, say hello and hand the order to the
      customer with a smile. For anyone needing a bit more help, they are there, and
      if something spills, they sort it out. How do you feel about putting the
      customer first every single day?`,
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
  },
  {
    id: 5,
    label: `Busy vs steady pace`,
    question: `During busy shifts – when there is a list of drops to complete and traffic is bad, or lots of orders and a broken conveyer – the pace is fast, with priorities that can change quickly and decisions that need to be made on the go. At the same time, it’s important we do what’s right, especially for team safety. What sort of working pace suits you best?`,
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
        text: `I prefer slower paced work – where I can take my time, consider the outcomes safely and avoid feeling rushed.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: -100,
          LGV: -100,
        },
      },
    ],
  },
  {
    id: 6,
    label: `Being on the road`,
    question: `Some roles involve spending a lot of time on the road. We say you need to live within an hour of your base, so you're not adding to that distance. Our Customer Service Team Members regularly cover two hundred miles in a shift – that's the same as driving from London to Manchester! So, it's essential to stay focused, follow safety rules and avoid any distractions (like glancing at your phone). How do you feel about driving or riding a bike all day?`,
    options: [
      {
        id: "A",
        text: `I enjoy being out on the road driving and in control of the radio – but I always make sure I stay focused and I'm always safe.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 0,
          LGV: 1,
        },
      },
      {
        id: "B",
        text: `I don't think I would enjoy spending long periods driving or riding an e-cargo bike.`,
        scores: {
          customerService: -100,
          headOffice: 0,
          warehouse: 0,
          LGV: -100,
        },
      },
    ],
  },
  {
    id: 7,
    label: `Mental/physical resilience`,
    question: `As with most jobs, there will be difficult days. That might mean anything from working all day in cold storage (0-5 degrees), planning shift patterns in advance to ensure we meet demand during busy holiday season, walking repeatedly across site (our Erith site is 7x the size of Wembley and our stock availability advisors regularly complete their 20,000 steps a day), or spending your Engineering shift manually clearing conveyors instead of using your tools. How do you stay positive and keep going even when the day is challenging?`,
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
        text: `I would prefer to work with less pressure, physical demand or fewer unexpected challenges.`,
        scores: {
          customerService: 0,
          headOffice: 1,
          warehouse: 0,
          LGV: 0,
        },
      },
    ],
  },
  {
    id: 8,
    label: `Time pressure`,
    question: `Because our customers pay for us to deliver bang on time, staying on track during a shift is vital, as delays anywhere along the supply chain can knock things off schedule. But safety and process are important across all our roles. You might be an LGV driver who needs to reverse into a tight bay in only 5 minutes or a Zoom last mile rider trying to make up time between deliveries – the day can change quickly, so working fast while staying safe and providing great customer service or respect to your peers is essential.`,
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
  },
  {
    id: 9,
    label: `Teamwork`,
    question: `In many of our roles, the work only runs smoothly when people stay connected. That might mean a planner juggling shifts with a Team Lead, a driver flagging an issue on the road, an engineer working with operations to get a conveyor moving again or a personal shopper stepping in to support a busy area.\n\nClear communication matters here. Sometimes, you’ll need to share updates, ask for input, offer help or work through a problem with others so the right decision can be made quickly.\n\nWhen things get busy or plans change, how do you prefer to work?`,
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
  },
  {
    id: 10,
    label: `Accountability`,
    question: `Some roles need people to work independently and sort out any problems without a manager immediately being present beside them. But everyone plays a part in keeping the day running smoothly and safely. And sometimes things go wrong – an order is missing, a robot stops, a route is delayed, or a customer needs extra help. When this happens, it’s important to take ownership of the part you play, follow the right process, speak up early and do what you can to fix the issue. When something goes wrong during your shift or time in the office, what are you most likely to do?`,
    options: [
      {
        id: "A",
        text: `I am comfortable taking responsibility for my part, using my initiative and judgement, to let the right people know and focus on what I can do to help put things right.`,
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
  },
  {
    id: 11,
    label: `Leadership`,
    question: `Some people naturally look out for the wider team. They notice when someone needs support, keep things calm when plans change and are comfortable stepping forward when a decision or action is needed. That does not always mean being the loudest person in the room. It can mean setting a good example, sharing useful information, encouraging others or helping the team stay focused on what needs to happen next. There are sometimes opportunities for Team Manager roles based at our Hatfield Head Office or warehouses. When the team is busy or something unexpected happens, what are you most likely to do?`,
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
  },
  {
    id: 12,
    label: `Career progression and learning`,
    question: `Lots of people join us and go on to build their career in different directions. That might be learning new skills. Many of our roles offer opportunities for building confidence, training, developing others or taking on more responsibility. Some roles require you to keep up to date with regulations (LGV drivers) or new technology (Engineers) or give the opportunity to develop deeper expertise in the role.\n\nWe’re interested to hear from those who are curious, open to learning and excited by the idea of growing with us over time – whether that growth is upwards, sideways or simply becoming brilliant at what they do.\n\nHow do you feel about learning and developing in your role?`,
    options: [
      {
        id: "A",
        text: `I’m looking for a job I can settle into as it is, hone my skillset and I’m less interested in extra learning, or future career moves, preferring to give my ‘all’ during my shift and then go home.`,
        scores: {
          customerService: 1,
          headOffice: 0,
          warehouse: 1,
          LGV: 0,
        },
      },
      {
        id: "B",
        text: `I like learning new things and would be interested in building a longer-term career, whether than means progressing, trying different areas or developing specialist skills over time. I am happy to seek these opportunities out and put myself forward.`,
        scores: {
          customerService: 0,
          headOffice: 1,
          warehouse: 0,
          LGV: 1,
        },
      },
    ],
  },
];
