const intents: any = {
  firstSet: [
    {
      tag: "greetings",
      patterns: [
        `PRAKVI TECHNO SOLUTIONS PRIVATE TIMITED
        Branch Officq ffice # 3, Second Floor, R V Plaza, Mumbai Naka, Nashik - 422AU Maharashtra
        Cl N : U7 41LODI2015PTC29L9O2
        Confirmation Letter
        Date: 31st October 2023
        Private and Confidential
        To,
        Gaurav Dilip Chaughule
        Nashik
        Dear Gaurav,
        Congratulations! On successful completion of your Probation Period & we here by
        confirm your Employment w.e.f. 31st October 2023.
        We look forward to working with you over the coming months and years. The terms and
        conditions of employment set out in your original Letter of Appointment will continue to
        apply to your ongoing position.
        Thank you for your contribution to Prakvi Techno Solutions Private Limited.
        Yours sincerely,
        FoT PRAKVI TECHNO SOLUTI S PVT. LTf)
        Rashmi Kachi
        Senior Manager - HR & Achts
        Head Office: 1899, Ground Floor; Uday Chand Marg KotlaMubarakpur New Delhi, South Delhi 110049ffi3
        ),),
        f$!`,
      ],
      responses: [
        "It seems you've provided a text that looks like a confirmation letter or document. Is there anything specific you'd like to do with this text, or do you have any questions related to it? Please provide more context or let me know what you'd like assistance with regarding this text.",
      ],
      context: [""],
    },
    {
      tag: "goodbye",
      patterns: [
        `A Simple PDF File This is a small demonstration .pdf file - just for use in the Virtual Mechanics tutorials. More text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. Boring, zzzzz. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. Even more. Continued on page 2 ... Simple PDF File 2 ...continued from page 1. Yet more text. And more text. And more text. And more text. And more text. And more text. And more text. And more text. Oh, how boring typing this stuff. But not as boring as watching paint dry. And more text. And more text. And more text. And more text. Boring. More, a little more text. The end, and just as well.`,
      ],
      responses: [
        "It seems like you've provided the content of a simple PDF file. Is there anything specific you would like to do with this content or any questions you have related to it? Please let me know how I can assist you further.",
      ],
      context: [""],
    },
    {
      tag: "thanks",
      patterns: [
        "Thanks",
        "okay",
        "Thank you",
        "thankyou",
        "That's helpful",
        "Awesome, thanks",
        "Thanks for helping me",
        "wow",
        "great",
      ],
      responses: [
        "Happy to help!",
        "Any time!",
        "you're welcome",
        "My pleasure",
      ],
      context: [""],
    },
    {
      tag: "textdata",
      patterns: [
        `PRAKVI TECHNO SOLUTIONS PRIVATE TIMITED
        Branch Officq ffice # 3, Second Floor, R V Plaza, Mumbai Naka, Nashik - 422 AU Maharashtra
        Cl N : U 741 10DL2015PTC29L9O?
        Confirmation Letter
        Date: 31st Octob er 2023
        Private and Confidential
        To,
        Hitesh Viiay Pawar
        Nashik
        Dear Hitesh,
        Congratulations! On successful completion of your Probation Period & we here by
        confirm your Employment w.e.f. 31st October 2O23.
        We look forward to working with you over the coming months and years. The terms and
        conditions of employment set out in your original Letter of Appointment will continue to
        apply to your ongoing position.
        Thank you for your contribution to Prakvi Techno Solutions Private Limited.
        Yours sincerely,
        FoT PRAKVI TECHNO SIONS PVT. LTD
        Rashmi Kachi
        Senior Manager-HR CCOUNTSffi4
        Head Office: 1899, Ground Floor, Uday Chand Marg KotlaMubarakpur New Delhi, South Delhi 110049`,
      ],
      responses: [
        `
      It appears that you've provided a sample confirmation letter. Is there something specific you would like to do with this text, or do you have any questions related to it? Please provide more details or let me know how I can assist you further.`,
      ],
      context: [""],
    },
    {
      tag: "noanswer",
      patterns: [""],
      responses: ["Sorry, I didn't understand you"],
      context: [""],
    },
  ],
};

export default intents;
