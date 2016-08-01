module.exports = {
  communityChest: [
    {
      "description" : "You have inherited $200 from a dead relative.  But the funeral cost $1500.  Do the math.",
      "net" : -1300
    },
    {
      "description" : "The kids need braces, all of them.  Pay the dentist $1500.",
      "net" : -1500
    },
    {
      "description" : "You win the lottery, here take this $10.",
      "net" : 10
    },
    {
      "description" : "You pick up an odd job doing security.  It pays $500",
      "net" : 500
    }
  ],
  destinations: ["Texas", "Maine"],
  initialBalance: 1000,
  salary: 200,
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
