module.exports = {
  communityChest: [
    {
      "description" : "You have inherited $200 from a dead relative.  But the funeral cost $500.  Do the math.",
      "net" : -300
    },
    {
      "description" : "The kids need braces, all of them.  Pay the dentist $1000.",
      "net" : -1000
    },
    {
      "description" : "You win the lottery, here take this $10.  It was a scratch off.",
      "net" : 10
    },
    {
      "description" : "You pick up an odd job doing security.  It pays $500",
      "net" : 500
    },
    {
      "description" : "You find out you an an heir to a $200,000 fortune.  You keep it all for yourself.",
      "net" : 200000
    },
    {
      "description" : "Ugh, car repairs...",
      "net" : -500
    },
    {
      "description" : "You decide to go back to school.  That's going to cost $20,000",
      "net" : 20000
    }
  ],
  destinations: ["Texas", "Maine", "Hawaii", "Paris", "New York", "Dubai", "Instabul"],
  initialBalance: 40000,
  salary: 40000,
  values: {
    "hotel" : 400000,
    "house" : 100000,
    "office" : 200000
  },
  interestRate: {
    "air": 0.20,
    "hotel": 0.30,
    "land": 0.25,
    "house": 0.10,
    "sea": 0.15,
    "office": 0.15,
    "rail": 0.05
  }
}
