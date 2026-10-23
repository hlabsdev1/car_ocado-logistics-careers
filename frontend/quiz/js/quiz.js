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
    color: "#8453CF",
    textColor: "var(--_palette---white)",
    image:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a7f1037262b45168d555e54_quiz-bg-purple.webp",
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
    label: `Always on the go`,
    question: `<div>
    Every role here helps keep groceries moving. Some of our teams are based in one place, from Head Office to our warehouses and fulfilment centres. Others spend much of the day out and about – like our Customer Delivery Drivers (CSTM’s) and Zoom Last mile riders.
    </div>
    <div class="quiz-ques-break">
    </div>
    Which working environment sounds most like you?`,
    styleVariants: styleVariants.pink,
    options: [
      {
        id: "A",
        text: `I prefer to be based mainly in one location, with my team and everything I need around me.`,
        scores: {
          headOffice: 3,
          customerService: 0,
          LGV: 0,
          warehouse: 4,
        },
      },
      {
        id: "B",
        text: `I enjoy being out and about, working independently and spending much of the day on the move.`,
        scores: {
          headOffice: 0,
          customerService: 4,
          LGV: 4,
          warehouse: 0,
        },
      },
    ],
    answer: `<div>
    There's more than one way to keep things moving. Some roles are based in one location, while others come with four wheels, two wheels and a changing view.
    </div>
    <div>
    Our Customer Delivery Drivers can make dozens of drops in a day, and our Zoom Riders are out across busy city streets. Meanwhile, our Head Office and warehouse teams keep everything flowing from behind the scenes. Neither is better – it’s more about where you’ll feel most at home.
    </div>`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c2b23dbd39f65f65ef323_Sample.png",
  },
  {
    id: 2,
    label: `Active ‘hands on’ work`,
    question: `<div>
    Some roles here are more physical than others. Our Customer Delivery Drivers (CSTM’s) carry shopping to everything from high rise flats to farms. LGV Drivers couple and uncouple vehicles, Zoom riders handle loaded e-bikes, and some of our warehouse teams move roll cages or operate equipment throughout their shifts.
    </div>
    <div>
    You’ll have the right guidance, equipment and ways of working to support you – and we’re definitely not looking for weightlifters.
    </div>
    <div>How comfortable are you with a role that involves regular lifting, carrying or moving?</div>`,
    styleVariants: styleVariants.orange,
    options: [
      {
        id: "A",
        text: `I’m comfortable with an active, hands-on role and understand the importance of working safely and asking for help when I need it.`,
        scores: {
          headOffice: 1,
          customerService: 4,
          LGV: 2,
          warehouse: 4,
        },
      },
      {
        id: "B",
        text: `I’d be better suited to a role where there is less lifting, carrying or physical activity.`,
        scores: {
          headOffice: 3,
          customerService: 1,
          LGV: 2,
          warehouse: 1,
        },
      },
    ],
    answer: `<div>
    Some roles keep you moving more than others. A Customer Delivery Driver can move up to a tonne of shopping across a shift, while others involve handling totes, cages, equipment or vehicles.
    </div>
    <div>
    That doesn’t mean every job here is an unofficial workout. Many Head Office, specialist and some warehouse roles are much less hands on.
    </div>
    <div>
    The important thing is finding the kind of working day that suits you best – whether that means being active and on the move, or using your skills in a role that’s a little less physical.
    </div>`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d4ca5a4e9c5f43e506_1.webp",
  },
  {
    id: 3,
    label: `Varied working hours`,
    question: `<div>
    Our customers rely on us to get their groceries where they need to be, so many of our operational roles work across different times of the day and week. The good news is that we work hard to make our shifts as predictable as possible, so you can plan life outside work too.
    </div>
    <div>
    But some roles include early starts, evenings, weekends or nights, while others follow more regular office hours.
    </div>
    <div>
    Which sounds most like you?
    </div>`,
    styleVariants: styleVariants.green,
    options: [
      {
        id: "A",
        text: `I prefer a more regular working pattern and would be happiest in a role that mainly follows office hours.`,
        scores: {
          headOffice: 3,
          customerService: 2,
          LGV: 0,
          warehouse: 0,
        },
      },
      {
        id: "B",
        text: `I’m comfortable working a varied shift pattern, which could include early starts, evenings, weekends or nights, depending on the role.`,
        scores: {
          headOffice: 2,
          customerService: 3,
          LGV: 4,
          warehouse: 4,
        },
      },
    ],
    answer: `<div>
    Many of our Warehouse, Customer Delivery and LGV roles work shifts, which can include early starts, evenings, weekends or nights. Some Engineering roles can include longer shifts too.
    </div>
    <div>
    But shift work doesn’t always mean 12 hour days or unpredictable hours. We work hard to make rotas as predictable as possible, so you can plan life outside work and find a rhythm that suits you.
    </div>
    <div>
    Take a look at our example rosters in FAQs to see what different patterns could look like.
    </div>`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d47eab4bd21b8a8803_2.webp",
  },
  {
    id: 4,
    label: `Customer interaction`,
    question: `<div>
     Whatever your role, there’s a customer at the end of everything we do. For our Delivery team, that means being the friendly face at the door – even when the day is busy. They’ll take a moment to help; make sure the shopping is safe and sort things out when something isn’t quite right. For our Head Office, Engineering, LGV or Warehouse teams it’s about working at pace behind the scenes to react to changes in demand, planning to make the day run smoothly, picking and packing at pace or ensuring every grocery item is exactly where it needs to be 24/7. 
    </div>
    <div>
    Which most sounds like you? 
    </div>`,
    styleVariants: styleVariants.red,
    options: [
      {
        id: "A",
        text: `I enjoy helping people face to face even when busy, I’ll spot when someone needs a hand and do what I can to help.`,
        scores: {
          headOffice: 2,
          customerService: 4,
          LGV: 1,
          warehouse: 1,
        },
      },
      {
        id: "B",
        text: `I always put the customer central to my thinking, but I’d rather make a difference behind the scenes than work with customers face to face.`,
        scores: {
          headOffice: 3,
          customerService: 1,
          LGV: 3,
          warehouse: 3,
        },
      },
    ],
    answer: `At Ocado Logistics, we treat colleagues and customers with empathy and respect. Sometimes, a small act can make a big impact. If a customer needs extra help, you may take their shopping into the kitchen – as long as you feel comfortable and follow the correct process. It’s all part of delivering smiles and making great service pop. Behind the scenes our roles are just as important and often involve being a different kind of reactive, working collectively as a team to achieve the right solution.`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d43893a257daf53104_3.webp",
  },
  {
    id: 5,
    label: `Pace and Priorities`,
    question: `<div>
    Sometimes things happen and you need to react quickly as things change around you. In those moments you will often need to stay calm and organised, make decisions as you go and keep things moving forward – without ever compromising safety. Other roles are just as busy but give you more space to plan, think long term and work through details and manage priorities in a more structured way.
    </div>
    <div>
    Which sounds most like you?
    </div>`,
    styleVariants: styleVariants.blue,
    options: [
      {
        id: "A",
        text: `I enjoy working in the moment, adapting quickly when priorities change and making decisions as I go, whilst always remaining focused and safe.`,
        scores: {
          headOffice: 2,
          customerService: 4,
          LGV: 3,
          warehouse: 4,
        },
      },
      {
        id: "B",
        text: `I enjoy a busy role where I can plan, work through competing priorities and give proper thought to the decisions I am making.`,
        scores: {
          headOffice: 3,
          customerService: 2,
          LGV: 2,
          warehouse: 2,
        },
      },
    ],
    answer: `Theres more than one way to work at pace here. Some roles are fast and reactive, with priorities changing throughout the day. Others move just as quickly but rely more on planning, judgement and thinking ahead. What matters is finding the kind of pace that brings out your best – while always doing things safely and properly.`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d46cbc7ab805bdb9c7_4.webp",
  },
  {
    id: 6,
    label: `On the move`,
    question: `<div>
    Some people enjoy the rhythm of being out on the road, working independently and managing their day as it unfolds. Others prefer being based in one place, with more people surrounding them throughout the day.
    </div>
    <div>
    Which sounds like you most?
    </div>`,
    styleVariants: styleVariants.pink,
    options: [
      {
        id: "A",
        text: `I like being out and about, working independently and managing my day as it evolves. Whether I am driving or riding, I’m comfortable staying focused and working safely.`,
        scores: {
          headOffice: 0,
          customerService: 4,
          LGV: 4,
          warehouse: 0,
        },
      },
      {
        id: "B",
        text: `I’d rather be based in one main location, with my team and everything I need around me, than spend most of my working day on the road or out riding.`,
        scores: {
          headOffice: 3,
          customerService: 0,
          LGV: 0,
          warehouse: 4,
        },
      },
    ],
    answer: `<div>
    Your workplace might have wheels. Our Customer Delivery Drivers can cover 200 miles in one shift, LGV Drivers travel across our growing network, and Zoom Riders are out in the city in all weathers. 
    </div>
    <div>
    For driving roles, we ask you to live within an hour of your base so you’re not adding a long commute to an already mobile day. You’ll also spend stretches of time working independently, so staying alert, focused and distraction free is essential.
    </div>`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d4feeb6ad25bc05199_5.webp",
  },
  {
    id: 7,
    label: `Staying steady`,
    question: `<div>
    No two days are the same here, it’s all part of the excitement. Some roles involve changing plans to meet demands, maybe working in colder areas, others covering plenty of ground, or solving a problem you hadn’t expected.
    </div>
    <div>
    We don’t expect anyone to be cheerful every minute, but focus is on how we work collectively to solve challenges. Staying respectful, pushing forward and working well with the people around you – even when that day isn’t quite going to plan.
    </div>
    <div>
    Which sounds most like you?
    </div>`,
    styleVariants: styleVariants.orange,
    options: [
      {
        id: "A",
        text: `I am good at staying calm and constructive when things get demanding or change unexpectedly.`,
        scores: {
          headOffice: 3,
          customerService: 3,
          LGV: 3,
          warehouse: 3,
        },
      },
      {
        id: "B",
        text: `I’m at my best when the day is more predictable, with fewer unexpected changes or physically demanding conditions.`,
        scores: {
          headOffice: 2,
          customerService: 2,
          LGV: 1,
          warehouse: 2,
        },
      },
    ],
    answer: `Some days will test your stride. You might be working in 0–5°C, clocking up thousands of steps across one of our bigger sites, reshuffling plans during a busy period or fixing an unexpected problem. You don’t need to grin through every second. You do need to stay respectful, work safely and keep communicating with the people around you. Whether you are with customers or colleagues, how you respond when things get tricky can make a big difference.`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d4def9dac5b8a092c4_6.webp",
  },
  {
    id: 8,
    label: `When timing matters`,
    question: `<div>
    In logistics, timing matters. One delay can have a knock-on effect somewhere else, so many of our roles involve keeping things moving, responding quickly and working collectively toward an end mission.
    </div>
    <div>
    That could mean an LGV Driver reversing into a bay within a set time, a Zoom Rider adapting their route between deliveries to avoid traffic, or a colleague making a quick call to keep a process on track.
    </div>
    <div>
    Which sounds most like you?
    </div>`,
    styleVariants: styleVariants.green,
    options: [
      {
        id: "A",
        text: `I’m comfortable making decisions quickly, staying calm and taking ownership when something needs sorting. I’ll use my judgement and ask for support when I need it.`,
        scores: {
          headOffice: 3,
          customerService: 4,
          LGV: 4,
          warehouse: 3,
        },
      },
      {
        id: "B",
        text: `I prefer having a little more time to consider the details, weigh up my options and make a well-thought-out decision`,
        scores: {
          headOffice: 3,
          customerService: 2,
          LGV: 2,
          warehouse: 2,
        },
      },
    ],
    answer: `Sometimes, every minute counts. We’re always looking for ways to keep our network moving brilliantly and deliver on time, which means there will be moments when you will need to think on your feet. Whatever your role, it’s about knowing when to act quickly, when to ask for help and when something deserves a little more thinking time.`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d4162f50d743d9a357_7.webp",
  },
  {
    id: 9,
    label: `Working with others`,
    question: `<div>
    Most roles here involve both teamwork and independence in equal measures. You might need to share an update at the end of our shift, hand something over, ask for input or step in to help someone else if you can see they are struggling. Equally, there’ll be times when you’re expected to get on with the job and use your own judgement. It’s about being able to use your judgement and empathy when it’s needed most.
    </div>
    <div>
    When things get busy or plans change, which sounds most like you? 
    </div>`,
    styleVariants: styleVariants.red,
    options: [
      {
        id: "A",
        text: `I enjoy working as part of a team, sharing updates and ideas, and asking for or offering support when it helps get things done.`,
        scores: {
          headOffice: 4,
          customerService: 2,
          LGV: 2,
          warehouse: 4,
        },
      },
      {
        id: "B",
        text: `I’m comfortable working independently and like to solve problems myself first, while knowing when it’s important to keep others informed or ask for help.`,
        scores: {
          headOffice: 2,
          customerService: 4,
          LGV: 4,
          warehouse: 2,
        },
      },
    ],
    answer: `No one keeps this operation moving completely on their own – not even the person with the best spreadsheet, quickest route or most heroic tea round. Some roles are very team-based while others can mean spending much of your day working independently. What matters is knowing when to get on with it, when to keep people updated and when to ask for or offer a hand. That’s what keeps everything connected.`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d444c353b424cb935a_8.webp",
  },
  {
    id: 10,
    label: `Taking ownership`,
    question: `<div>
    We know things don’t always go to plan. An order might be missing, a delivery stuck in traffic, a period of good weather that demands more BBQ items, a robot that’s feeling a bit ‘off’, someone that may need extra help or just a process that you think could be improved.
    </div>
    <div>
    Whatever the role, we want our people to notice what’s happening, speak up and play their part in getting things back on track – sometimes independently sometimes with others.
    </div>
    <div>
    When something goes wrong, which sounds like you most?
    </div>`,
    styleVariants: styleVariants.blue,
    options: [
      {
        id: "A",
        text: `I am comfortable taking ownership of my part, using my judgement and getting started on what I can do to help resolve it, while keeping the right people informed.`,
        scores: {
          headOffice: 3,
          customerService: 4,
          LGV: 4,
          warehouse: 3,
        },
      },
      {
        id: "B",
        text: `I like to involve others early, talk through what’s happened and agree the best way forward before acting.`,
        scores: {
          headOffice: 4,
          customerService: 2,
          LGV: 2,
          warehouse: 4,
        },
      },
    ],
    answer: `Taking ownership is about helping things move forward. It means noticing when something needs attention, being open about what’s happened and doing what you can to help put things right. Sometimes that means using your own judgement; sometimes it means bringing in the right people. What matters is speaking up, staying curious and helping find a way forward.`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d4d059983417be9e13_9.webp",
  },
  {
    id: 11,
    label: `Positive influence`,
    question: `<div>
    Some people naturally help set the tone around them. They notice when someone needs support, share useful information, stay steady when things change and help others keep focused on what matters.
    </div>
    <div>
    That doesn’t mean being the loudest person in the room or having ‘manager’ in your job title. Sometimes, it’s simply about setting a good example and helping people around you do their best work.
    </div>
    <div>
    When things get busy or unexpected, which sounds most like you?
    </div>`,
    styleVariants: styleVariants.pink,
    options: [
      {
        id: "A",
        text: `I naturally step forward, help others understand what needs to happen and try to set a positive example. I enjoy supporting people, sharing what I know and helping the team maintain high standards.`,
        scores: {
          headOffice: 4,
          customerService: 2,
          LGV: 2,
          warehouse: 4,
        },
      },
      {
        id: "B",
        text: `I'm happiest focusing on doing my own role really well, supporting others when needed and contributing positively without necessarily wanting to take the lead.`,
        scores: {
          headOffice: 3,
          customerService: 3,
          LGV: 3,
          warehouse: 2,
        },
      },
    ],
    answer: `<div>
    Leadership can show up anywhere. It’s not about having all the answers. It can be staying calm, setting a great example, sharing what you know and helping others keep moving in the right direction.
    </div>
    <div>
    Some of our operational roles also offer opportunities to step up and support or lead others, while building new skills or taking on more responsibility.
    </div>`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d4909c47b86b915cdf_10.webp",
  },
  {
    id: 12,
    label: `Learning and growing`,
    question: `<div>
    Some people want to become brilliant at what they already do. Others are curious about what else they could learn, try or take on over time.
    </div>
    <div>
    Growth here does not always mean moving upwards. It might mean building deeper expertise, keeping qualifications up to date, stepping into more responsibility or moving into a completely different part of the business.
    </div>
    <div>
    Which sounds most like you?
    </div>
    <div>
    How do you feel about learning and developing in your role?
    </div>
    `,
    styleVariants: styleVariants.orange,
    options: [
      {
        id: "A",
        text: `I like becoming really good at what I do and building confidence and expertise in my role. I’m happy to learn what I need to keep doing the job well, without necessarily looking for my next move.`,
        scores: {
          headOffice: 3,
          customerService: 3,
          LGV: 3,
          warehouse: 3,
        },
      },
      {
        id: "B",
        text: `I’m naturally curious about what else I could learn or try. I’d be interested in building new skills, taking on more responsibility or exploring different opportunities over time – and I’m comfortable putting myself forward for them.`,
        scores: {
          headOffice: 3,
          customerService: 4,
          LGV: 4,
          warehouse: 4,
        },
      },
    ],
    answer: `<div>
    There isn’t always one set route here. Some people stay on the same path and become brilliant at what they do. Others take a step up, switch lanes into another team or head somewhere completely different across our Group.
    </div>
    <div>
    You may need to keep an eye out for opportunities and put yourself forward, but there are plenty of ways to keep moving. Your next step doesn’t always have to be upwards; there are plenty of ways to grow.
    </div>`,
    answerImg:
      "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a8c23d58a50d2d94436a25f_11.webp",
  },
];
