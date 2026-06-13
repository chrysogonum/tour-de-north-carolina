/* =====================================================================
   LE TOUR DE NORTH CAROLINA — Bar Exam Edition
   Verified question bank.  NC vs. CA comparative law.

   Every item below was verified by research against primary sources:
     - North Carolina General Statutes ......... ncleg.gov
     - California codes ........................ leginfo.legislature.ca.gov
     - State Bar of California RPC ............. calbar.ca.gov
     - North Carolina State Bar RPC ........... ncbar.gov
   Citations are shown to the player in each explanation so the quiz
   doubles as a study aid.  Do not alter legal substance without
   re-verifying against the primary source.

   terrain:  'flat' | 'rolling' | 'sprint' | 'climb' | 'hc'
       flat    = warm-up / soft-pedal recall
       rolling = moderate
       sprint  = fast, timed, green-jersey points
       climb   = Category climb, polka-dot KOM points (hard)
       hc      = Hors Categorie summit, hardest (marquee divergence)
   correct = the EXACT text of the correct option (options are shuffled
             at runtime, so we match by value, not index).
   ===================================================================== */

const STAGES = [
  /* ================================================================= */
  {
    id: 1,
    name: "Mount Mitchell",
    sub: "The Marital Property Massif",
    blurb: "6,684 ft — the highest peak east of the Mississippi, right here in North Carolina. " +
           "Fitting, because the gap between California community property and North Carolina " +
           "equitable distribution is the biggest climb on the whole calendar. Settle in.",
    subject: "Family Law & Marital Property",
    questions: [
      {
        terrain: "flat", diff: 1,
        q: "You move a divorcing client's file from your California desk to North Carolina. Under each state's baseline rule, how is property acquired by a spouse during the marriage treated?",
        options: [
          "CA: community property (owned 50/50 from acquisition); NC: equitable distribution, with a rebuttable presumption of equal division",
          "Both states: community property owned 50/50",
          "Both states: equitable distribution with no presumption",
          "CA: equitable distribution; NC: community property"
        ],
        correct: "CA: community property (owned 50/50 from acquisition); NC: equitable distribution, with a rebuttable presumption of equal division",
        explain: "California is a community-property state; North Carolina divides marital property equitably, presuming (but not requiring) an equal split.",
        nc: "N.C. Gen. Stat. § 50-20(c)", ca: "Cal. Fam. Code § 760"
      },
      {
        terrain: "flat", diff: 1,
        q: "Which state's judge MUST divide the marital/community estate equally (50/50) absent the spouses' own agreement?",
        options: [
          "California",
          "North Carolina",
          "Both states require a mandatory equal division",
          "Neither — both are purely discretionary"
        ],
        correct: "California",
        explain: "California mandates an equal division of the community estate unless the parties agree otherwise. North Carolina's equal split is only a presumption a judge can override on equity grounds.",
        nc: "N.C. Gen. Stat. § 50-20(c)", ca: "Cal. Fam. Code § 2550"
      },
      {
        terrain: "sprint", diff: 2,
        q: "SPRINT! How long must North Carolina spouses live separate and apart before an absolute divorce — and does California require the same waiting period?",
        options: [
          "NC: one year of separation; CA: none — pure no-fault on irreconcilable differences",
          "NC: six months; CA: six months",
          "NC: none; CA: one year",
          "NC: two years; CA: ninety days"
        ],
        correct: "NC: one year of separation; CA: none — pure no-fault on irreconcilable differences",
        explain: "NC requires a full year living separate and apart before an absolute divorce. CA grants dissolution on irreconcilable differences with no separation period.",
        nc: "N.C. Gen. Stat. § 50-6", ca: "Cal. Fam. Code § 2310"
      },
      {
        terrain: "rolling", diff: 2,
        q: "Both states require six months of state residency to file for divorce. What ADDITIONAL residency requirement does California impose that North Carolina does not?",
        options: [
          "Three months of residency in the county where the petition is filed",
          "One full year of domicile in the state",
          "Physical presence in the state on the day of filing",
          "None — the requirements are identical"
        ],
        correct: "Three months of residency in the county where the petition is filed",
        explain: "Both require six months' state residency, but California adds a three-month county-residency requirement. NC has no county requirement.",
        nc: "N.C. Gen. Stat. § 50-8", ca: "Cal. Fam. Code § 2320"
      },
      {
        terrain: "climb", diff: 3,
        q: "Your client wants to sue her husband's paramour for alienation of affection. Where can that tort claim proceed?",
        options: [
          "North Carolina — still recognized (limited by § 52-13); barred in California by Civ. Code § 43.5",
          "California only",
          "Both states recognize the tort",
          "Neither state recognizes it"
        ],
        correct: "North Carolina — still recognized (limited by § 52-13); barred in California by Civ. Code § 43.5",
        explain: "NC is one of the few states that still permits alienation-of-affection and criminal-conversation suits against a third party. California abolished both 'heart-balm' torts in 1939.",
        nc: "N.C. Gen. Stat. § 52-13", ca: "Cal. Civ. Code § 43.5"
      },
      {
        terrain: "climb", diff: 3,
        q: "A DEPENDENT spouse who committed adultery during the marriage (before separation) seeks alimony. What happens?",
        options: [
          "NC: the court SHALL NOT award alimony; CA: adultery is legally irrelevant and support may still be ordered",
          "Both states deny alimony outright",
          "Both states award alimony regardless",
          "NC awards alimony; CA denies it"
        ],
        correct: "NC: the court SHALL NOT award alimony; CA: adultery is legally irrelevant and support may still be ordered",
        explain: "In NC, a dependent spouse's 'illicit sexual behavior' before separation is an absolute bar to alimony (and a supporting spouse's is a mandate to pay). California spousal support is no-fault.",
        nc: "N.C. Gen. Stat. § 50-16.3A(a)", ca: "Cal. Fam. Code § 4320"
      },
      {
        terrain: "rolling", diff: 2,
        q: "California spousal support is famously 'no-fault,' yet § 4320 still requires the court to weigh ONE category of fault-like conduct. Which?",
        options: [
          "Documented history of domestic violence (and a conviction for spousal abuse)",
          "Adultery by either spouse",
          "Abandonment of the marital home",
          "Concealment of marital assets"
        ],
        correct: "Documented history of domestic violence (and a conviction for spousal abuse)",
        explain: "California excludes ordinary marital fault but carves out domestic violence: § 4320(i) (documented history) and § 4320(m) (a spousal-abuse conviction) must be considered.",
        nc: "N.C. Gen. Stat. § 50-16.3A (broad misconduct factors)", ca: "Cal. Fam. Code § 4320(i), (m)"
      },
      {
        terrain: "climb", diff: 3,
        q: "A prenuptial agreement is signed the same day it is first presented; one spouse had no lawyer and signed no written waiver of counsel. Which state's statute most clearly renders it involuntary on those facts alone?",
        options: [
          "California — Fam. Code § 1615's 7-day review rule and independent-counsel-or-written-waiver requirement",
          "North Carolina — Chapter 52B imposes the same per se rules",
          "Both states, identically",
          "Neither — voluntariness turns only on disclosure"
        ],
        correct: "California — Fam. Code § 1615's 7-day review rule and independent-counsel-or-written-waiver requirement",
        explain: "California deems a prenup involuntary unless the challenging party had at least 7 days to review it and was represented by counsel or expressly waived counsel in a separate writing. NC's UPAA (Ch. 52B) has no such per se rules.",
        nc: "N.C. Gen. Stat. § 52B-7", ca: "Cal. Fam. Code § 1615(c)"
      },
      {
        terrain: "rolling", diff: 2,
        q: "A couple acquires a brokerage account while living in Texas, then moves and later divorces. Which state's divorce court would treat that account as 'quasi-community property'?",
        options: [
          "California — Fam. Code § 125",
          "North Carolina",
          "Both states",
          "Neither state"
        ],
        correct: "California — Fam. Code § 125",
        explain: "California reclassifies out-of-state acquisitions that WOULD have been community property as 'quasi-community property' and divides them like community property. NC has no such category.",
        nc: "No analog (classifies under N.C. Gen. Stat. § 50-20(b))", ca: "Cal. Fam. Code § 125"
      },
      {
        terrain: "climb", diff: 3,
        q: "Which state's equitable-distribution statute creates a distinct 'divisible property' category to capture post-separation appreciation (and passive changes in value) of marital assets?",
        options: [
          "North Carolina — § 50-20(b)(4)",
          "California",
          "Both states",
          "Neither state"
        ],
        correct: "North Carolina — § 50-20(b)(4)",
        explain: "NC adds a third bucket — 'divisible property' — for post-separation changes in value of marital assets. California uses only community, separate, and quasi-community property.",
        nc: "N.C. Gen. Stat. § 50-20(b)(4)", ca: "No analog"
      },
      {
        terrain: "hc", diff: 3,
        q: "SUMMIT. A 15-year marriage in NC. An equal division of the marital estate would actually be inequitable given one spouse's misconduct and contributions. Can the NC judge order an unequal split — and could a CA judge do the same with community property?",
        options: [
          "NC: yes, via the § 50-20(c) equity factors; CA: no — equal division is mandatory absent the parties' own agreement (§ 2550)",
          "Both judges may deviate on equity grounds",
          "Neither judge may deviate from a 50/50 split",
          "NC: no, it is locked at 50/50; CA: yes, on equity grounds"
        ],
        correct: "NC: yes, via the § 50-20(c) equity factors; CA: no — equal division is mandatory absent the parties' own agreement (§ 2550)",
        explain: "This is the whole massif in one question: NC equality yields to a judge's equity findings; California equality yields only to the parties' agreement or in-court stipulation.",
        nc: "N.C. Gen. Stat. § 50-20(c)", ca: "Cal. Fam. Code § 2550"
      }
    ]
  },

  /* ================================================================= */
  {
    id: 2,
    name: "The Tar Heel Criterium",
    sub: "Secured Ground — Your Home Roads",
    blurb: "You financed the residential mortgages, the student loans, the charter-school receivables. " +
           "Article 9 is your backyard, so the first half is flat and fast — soft-pedal it and bank the " +
           "time. But don't get comfortable: California corporate law throws two walls at you near the line.",
    subject: "Secured Transactions, Business Orgs & Securities",
    questions: [
      {
        terrain: "flat", diff: 1,
        q: "Uniform Article 9 (identical in NC and CA): a bank funds a loan and takes a signed security agreement describing the collateral, but the debtor does not yet own the goods being financed. Has the security interest attached?",
        options: [
          "No — attachment requires value, the debtor's RIGHTS in the collateral, AND a security agreement (or possession/control); all three must coexist",
          "Yes — a signed security agreement is sufficient on its own",
          "Yes — attachment is complete the moment value is given",
          "No — attachment never occurs until a financing statement is filed"
        ],
        correct: "No — attachment requires value, the debtor's RIGHTS in the collateral, AND a security agreement (or possession/control); all three must coexist",
        explain: "9-203's three elements must all be present; the debtor must have rights in the collateral. This rule is uniform in both states.",
        nc: "N.C. Gen. Stat. § 25-9-203", ca: "Cal. Com. Code § 9203"
      },
      {
        terrain: "sprint", diff: 2,
        q: "SPRINT! Non-inventory PMSI. The debtor receives the equipment on June 1. By what date must the lender perfect to keep PMSI super-priority over a prior perfected blanket lien? (Uniform NC/CA.)",
        options: [
          "June 21 — within 20 days after the debtor receives possession",
          "June 11 — within 10 days",
          "June 1 — the same day, or priority is lost",
          "July 1 — within 30 days"
        ],
        correct: "June 21 — within 20 days after the debtor receives possession",
        explain: "9-324(a) gives a 20-day relation-back grace period for non-inventory PMSIs. Uniform in both states.",
        nc: "N.C. Gen. Stat. § 25-9-324", ca: "Cal. Com. Code § 9324"
      },
      {
        terrain: "flat", diff: 1,
        q: "A registered organization is formed in Delaware but operates in NC and CA. Which state's law governs perfection of a security interest in its accounts? (Uniform choice-of-law rule.)",
        options: [
          "Delaware — the debtor's location, which for a registered organization is its state of organization",
          "North Carolina — where it operates",
          "California — where it operates",
          "Whichever state the accounts are physically maintained in"
        ],
        correct: "Delaware — the debtor's location, which for a registered organization is its state of organization",
        explain: "9-301 points to the debtor's location; 9-307 locates a registered organization in its state of organization. File where the debtor is. Uniform in both states.",
        nc: "N.C. Gen. Stat. §§ 25-9-301, 25-9-307", ca: "Cal. Com. Code §§ 9301, 9307"
      },
      {
        terrain: "rolling", diff: 2,
        q: "Where is a financing statement covering a FIXTURE filed, versus one covering general equipment? (Uniform.)",
        options: [
          "Fixture filing goes in the local real-property records; general equipment goes with the Secretary of State",
          "Both go with the Secretary of State",
          "Both go in the local real-property records",
          "Fixtures with the Secretary of State; equipment in local records"
        ],
        correct: "Fixture filing goes in the local real-property records; general equipment goes with the Secretary of State",
        explain: "9-501 splits the filing office by collateral type — fixtures/timber/as-extracted collateral file locally (NC register of deeds / CA county recorder), everything else with the Secretary of State.",
        nc: "N.C. Gen. Stat. § 25-9-501", ca: "Cal. Com. Code § 9501"
      },
      {
        terrain: "sprint", diff: 2,
        q: "SPRINT! Uniform Article 3 (NC and CA): which of these is NOT a requirement to be a holder in due course?",
        options: [
          "Having recorded the instrument with the Secretary of State",
          "Being a holder of the instrument",
          "Taking the instrument for value",
          "Taking in good faith and without notice of defenses"
        ],
        correct: "Having recorded the instrument with the Secretary of State",
        explain: "HDC status under 3-302 requires a holder who took for value, in good faith, and without notice of defenses or claims. There is no recording requirement. Uniform in both states.",
        nc: "N.C. Gen. Stat. § 25-3-302", ca: "Cal. Com. Code § 3302"
      },
      {
        terrain: "rolling", diff: 2,
        q: "True or false: both North Carolina's and California's general corporation statutes are based on the Model Business Corporation Act.",
        options: [
          "False — NC's Chapter 55 follows the (Revised) Model Business Corporation Act; California's General Corporation Law is sui generis",
          "True — both adopted the MBCA",
          "True — both adopted it in 1984",
          "False — both are sui generis and follow no model act"
        ],
        correct: "False — NC's Chapter 55 follows the (Revised) Model Business Corporation Act; California's General Corporation Law is sui generis",
        explain: "NC tracks the MBCA (so sister-state MBCA case law helps). California's Corporations Code is its own animal — which is exactly why the next two climbs exist.",
        nc: "N.C. Gen. Stat. Ch. 55 (Business Corporation Act)", ca: "Cal. Corp. Code § 100 et seq. (General Corporation Law)"
      },
      {
        terrain: "climb", diff: 3,
        q: "A closely held corporation's articles are SILENT on cumulative voting. May a minority shareholder cumulate votes to elect a director?",
        options: [
          "CA: yes — cumulative voting is the statutory default (Corp. Code § 708); NC: no — only if the articles so provide (§ 55-7-28)",
          "Both: yes, by default",
          "Both: no, unless the articles provide for it",
          "CA: no; NC: yes, by default"
        ],
        correct: "CA: yes — cumulative voting is the statutory default (Corp. Code § 708); NC: no — only if the articles so provide (§ 55-7-28)",
        explain: "Polar-opposite defaults: California makes cumulative voting ON by default for non-listed corporations; North Carolina makes it an opt-IN that must be in the articles.",
        nc: "N.C. Gen. Stat. § 55-7-28(b)", ca: "Cal. Corp. Code § 708(a)"
      },
      {
        terrain: "hc", diff: 3,
        q: "SUMMIT. A Delaware corporation has 60% of its property/payroll/sales in California and 55% of its shares held by California residents, and it is not exchange-listed. Whose cumulative-voting rule presumptively governs its board elections — and does NC have a comparable doctrine?",
        options: [
          "California's, via the 'pseudo-foreign corporation' statute (Corp. Code § 2115); North Carolina has no analog",
          "Delaware's, and North Carolina applies the very same doctrine",
          "North Carolina's, because CA always defers to the state of incorporation",
          "Delaware's, because § 2115 has been held unconstitutional everywhere"
        ],
        correct: "California's, via the 'pseudo-foreign corporation' statute (Corp. Code § 2115); North Carolina has no analog",
        explain: "§ 2115 overrides the internal-affairs doctrine, applying enumerated CA corporate provisions (including § 708 cumulative voting) to foreign corporations with majority-California operations and ownership. NC has nothing like it. (Delaware courts resist § 2115 as to Delaware corporations — VantagePoint v. Examen, 2005 — but it remains the marquee CA-vs-other contrast.)",
        nc: "No analog", ca: "Cal. Corp. Code § 2115"
      },
      {
        terrain: "rolling", diff: 2,
        q: "Which state's LLC statute is a version of the national uniform act (RULLCA), and which is home-grown?",
        options: [
          "CA = the Revised Uniform LLC Act (Corp. Code § 17701.01 et seq.); NC = its own Chapter 57D",
          "NC = RULLCA; CA = its own home-grown act",
          "Both states adopted RULLCA",
          "Neither state adopted a uniform LLC act"
        ],
        correct: "CA = the Revised Uniform LLC Act (Corp. Code § 17701.01 et seq.); NC = its own Chapter 57D",
        explain: "Both acts took effect in 2014, but California adopted the uniform act while North Carolina wrote its own Chapter 57D — which matters for default rules like the statutory duty of loyalty.",
        nc: "N.C. Gen. Stat. Ch. 57D", ca: "Cal. Corp. Code § 17701.01 et seq."
      },
      {
        terrain: "climb", diff: 3,
        q: "Match the state 'blue-sky' securities regimes:",
        options: [
          "NC: the North Carolina Securities Act, Ch. 78A ('registration' by notification/coordination/qualification); CA: the Corporate Securities Law of 1968 ('qualification' by permit, Corp. Code § 25000 et seq.)",
          "NC: the Corporate Securities Law of 1968; CA: the Uniform Securities Act",
          "Both states adopted the Uniform Securities Act verbatim",
          "Both states rely solely on the federal regime with no blue-sky statute"
        ],
        correct: "NC: the North Carolina Securities Act, Ch. 78A ('registration' by notification/coordination/qualification); CA: the Corporate Securities Law of 1968 ('qualification' by permit, Corp. Code § 25000 et seq.)",
        explain: "NC follows the Uniform Securities Act 'registration' model with three tracks. California uses its own 1968 Law's 'qualification by permit' vocabulary, administered by the DFPI.",
        nc: "N.C. Gen. Stat. Ch. 78A (§§ 78A-24 to -27)", ca: "Cal. Corp. Code § 25000 et seq. (§§ 25110, 25113)"
      }
    ]
  },

  /* ================================================================= */
  {
    id: 3,
    name: "The Code-vs-Rules Ridge",
    sub: "Procedure & Proof",
    blurb: "California litigates out of its own Code of Civil Procedure and its own Evidence Code. " +
           "North Carolina runs on rules that track the federal model. Same race, two completely " +
           "different course maps — and the descents are deceptively technical.",
    subject: "Civil Procedure & Evidence",
    questions: [
      {
        terrain: "flat", diff: 1,
        q: "A complaint alleges only that 'defendant negligently injured plaintiff.' Under which state's standard is it most vulnerable to attack for failing to plead the elements of the claim?",
        options: [
          "California — fact/code pleading requires pleading the 'ultimate facts' constituting each element (CCP § 425.10)",
          "North Carolina — its pleading standard is the stricter of the two",
          "Both are equally vulnerable",
          "Neither — notice pleading governs in both"
        ],
        correct: "California — fact/code pleading requires pleading the 'ultimate facts' constituting each element (CCP § 425.10)",
        explain: "California uses fact/code pleading (plead the ultimate facts). North Carolina, like the federal courts, uses notice pleading under Rule 8 — far more forgiving.",
        nc: "N.C. Gen. Stat. § 1A-1, Rule 8(a)(1)", ca: "Cal. Code Civ. Proc. § 425.10(a)(1)"
      },
      {
        terrain: "rolling", diff: 2,
        q: "In California, what procedural device tests a complaint that 'does not state facts sufficient to constitute a cause of action'?",
        options: [
          "A demurrer (CCP § 430.10(e))",
          "A Rule 12(b)(6) motion to dismiss",
          "A motion for summary judgment",
          "A plea in abatement"
        ],
        correct: "A demurrer (CCP § 430.10(e))",
        explain: "California still uses the demurrer. North Carolina abolished it (Rule 7(c)) and tests pleading sufficiency with a Rule 12(b)(6) motion to dismiss.",
        nc: "N.C. Gen. Stat. § 1A-1, Rules 7(c) & 12(b)(6)", ca: "Cal. Code Civ. Proc. § 430.10(e)"
      },
      {
        terrain: "sprint", diff: 2,
        q: "SPRINT! A car-crash plaintiff sues 2.5 years after the wreck. Timely where?",
        options: [
          "North Carolina (3-year limit, § 1-52); time-barred in California (2-year limit, CCP § 335.1)",
          "California only",
          "Both states",
          "Neither state"
        ],
        correct: "North Carolina (3-year limit, § 1-52); time-barred in California (2-year limit, CCP § 335.1)",
        explain: "Personal-injury limitations: NC gives 3 years, California only 2.",
        nc: "N.C. Gen. Stat. § 1-52(5)", ca: "Cal. Code Civ. Proc. § 335.1"
      },
      {
        terrain: "sprint", diff: 2,
        q: "SPRINT! A breach-of-WRITTEN-contract suit is filed 3.5 years after the breach. Timely where?",
        options: [
          "California (4-year limit, CCP § 337); time-barred in North Carolina (3-year limit, § 1-52)",
          "North Carolina only",
          "Both states",
          "Neither state"
        ],
        correct: "California (4-year limit, CCP § 337); time-barred in North Carolina (3-year limit, § 1-52)",
        explain: "Written-contract limitations: California gives 4 years; NC gives 3 (and, unlike CA, NC applies the same 3 years to oral contracts).",
        nc: "N.C. Gen. Stat. § 1-52(1)", ca: "Cal. Code Civ. Proc. § 337(a)"
      },
      {
        terrain: "climb", diff: 3,
        q: "A civil jury splits 9–3 for the plaintiff. Where can that stand as a valid verdict with no prior stipulation by the parties?",
        options: [
          "California — a three-fourths civil verdict is allowed (Cal. Const. art. I, § 16)",
          "North Carolina",
          "Both states",
          "Neither state"
        ],
        correct: "California — a three-fourths civil verdict is allowed (Cal. Const. art. I, § 16)",
        explain: "California permits a 3/4 (non-unanimous) civil verdict by its constitution. North Carolina's default requires 12 jurors and a unanimous verdict absent the parties' stipulation.",
        nc: "N.C. Gen. Stat. § 1A-1, Rule 48", ca: "Cal. Const. art. I, § 16"
      },
      {
        terrain: "climb", diff: 3,
        q: "A newspaper sued for defamation over a story about a public official wants an early, fee-shifting 'special motion to strike' the suit as targeting protected speech. Which state's statute provides it?",
        options: [
          "California — the anti-SLAPP statute (CCP § 425.16)",
          "North Carolina",
          "Both states",
          "Neither state"
        ],
        correct: "California — the anti-SLAPP statute (CCP § 425.16)",
        explain: "California has a robust anti-SLAPP special motion to strike, with a discovery stay and mandatory fee-shifting. North Carolina has no general anti-SLAPP statute.",
        nc: "No general anti-SLAPP statute", ca: "Cal. Code Civ. Proc. § 425.16"
      },
      {
        terrain: "flat", diff: 1,
        q: "'Rule 403' balancing — excluding relevant evidence when its probative value is substantially outweighed by unfair prejudice — appears under that exact number in which state?",
        options: [
          "North Carolina — Rule 403, tracking the Federal Rules of Evidence",
          "California — Rule 403 of its Evidence Code",
          "Both states number it 403",
          "Neither — both use § 352"
        ],
        correct: "North Carolina — Rule 403, tracking the Federal Rules of Evidence",
        explain: "NC's Rules of Evidence track the FRE numbering. California's Evidence Code is a standalone codification — the Rule 403 analog lives at Evidence Code § 352.",
        nc: "N.C. Gen. Stat. § 8C-1, Rule 403", ca: "Cal. Evid. Code § 352 (analog)"
      },
      {
        terrain: "hc", diff: 3,
        q: "SUMMIT. A party offers a NOVEL scientific technique. Which state asks whether it is 'generally accepted in the relevant scientific community' rather than applying the Daubert reliability factors?",
        options: [
          "California — the Kelly/Frye general-acceptance test (People v. Leahy), plus Sargon gatekeeping",
          "North Carolina — which rejected Daubert",
          "Both states apply Daubert",
          "Neither — both use pure general acceptance"
        ],
        correct: "California — the Kelly/Frye general-acceptance test (People v. Leahy), plus Sargon gatekeeping",
        explain: "California rejects Daubert, using Kelly/Frye 'general acceptance' for new scientific methods. North Carolina adopted the Daubert reliability standard via its 2011 amendment to Rule 702(a).",
        nc: "N.C. Gen. Stat. § 8C-1, Rule 702(a) (Daubert)", ca: "People v. Kelly / People v. Leahy; Sargon Enters. v. USC"
      },
      {
        terrain: "rolling", diff: 2,
        q: "Under which state's physician-patient privilege statute may the trial judge COMPEL disclosure simply because it is 'necessary to a proper administration of justice'?",
        options: [
          "North Carolina — § 8-53 contains that express judicial override",
          "California — § 994 contains that override",
          "Both states' statutes contain it",
          "Neither — the privilege is absolute in both"
        ],
        correct: "North Carolina — § 8-53 contains that express judicial override",
        explain: "Both states recognize a statutory physician-patient privilege (the federal rules don't), but NC's § 8-53 expressly lets the trial judge compel disclosure in the interest of justice. California's § 994 has no such general override.",
        nc: "N.C. Gen. Stat. § 8-53", ca: "Cal. Evid. Code § 994"
      },
      {
        terrain: "climb", diff: 3,
        q: "Which state's constitution provides that 'relevant evidence shall not be excluded in any criminal proceeding,' subject to enumerated exceptions?",
        options: [
          "California — art. I, § 28(f), the Proposition 8 'Right to Truth-in-Evidence'",
          "North Carolina",
          "Both states",
          "Neither state"
        ],
        correct: "California — art. I, § 28(f), the Proposition 8 'Right to Truth-in-Evidence'",
        explain: "California's Prop 8 constrains the exclusion of relevant evidence in criminal cases (subject to listed exceptions and a 2/3 supermajority to add new ones). North Carolina has no equivalent.",
        nc: "No analog", ca: "Cal. Const. art. I, § 28(f)(2)"
      },
      {
        terrain: "rolling", diff: 2,
        q: "The 'other crimes, wrongs, or acts' character-evidence rule lives at Rule 404(b) in North Carolina. What is its California counterpart?",
        options: [
          "Evidence Code § 1101(b)",
          "Evidence Code § 352",
          "Rule 404(b) — California uses the same number",
          "Penal Code § 1101"
        ],
        correct: "Evidence Code § 1101(b)",
        explain: "Same doctrine, different address: Rule 404(b) in NC, Evidence Code § 1101(b) in California — a clean illustration that NC tracks the FRE numbering and California does not.",
        nc: "N.C. Gen. Stat. § 8C-1, Rule 404(b)", ca: "Cal. Evid. Code § 1101(b)"
      }
    ]
  },

  /* ================================================================= */
  {
    id: 4,
    name: "The Queen Stage",
    sub: "Summit Finish at Probate Peak",
    blurb: "The decisive day. Wills, trusts, and the ethics rules where California is famously its own " +
           "country. The elective share and the California confidentiality rule are the steepest ramps " +
           "of the whole tour. Empty the tank — the maillot jaune is decided here.",
    subject: "Wills, Trusts & Estates · Professional Responsibility",
    questions: [
      {
        terrain: "climb", diff: 3,
        q: "A spouse married 12 years is completely disinherited by will, and the estate is entirely SEPARATE property. What can the surviving spouse claim?",
        options: [
          "NC: an elective share of one-third of the Total Net Assets (§ 30-3.1); CA: nothing — it has no elective share, and separate property may be freely devised away",
          "Both states: a 50% forced share",
          "Both states: nothing",
          "NC: nothing; CA: a 50% forced share"
        ],
        correct: "NC: an elective share of one-third of the Total Net Assets (§ 30-3.1); CA: nothing — it has no elective share, and separate property may be freely devised away",
        explain: "NC guarantees a sliding-scale elective share (15/25/33/50% by marriage length — one-third at 10-to-15 years). California has NO elective share: the spouse is protected only by community property, so all-separate-property can be disinherited entirely.",
        nc: "N.C. Gen. Stat. § 30-3.1", ca: "No elective share (Cal. Prob. Code § 100; community property)"
      },
      {
        terrain: "rolling", diff: 2,
        q: "A will is written on pre-printed letterhead, with handwritten dispositive terms and a handwritten signature. Is it a valid HOLOGRAPHIC will?",
        options: [
          "CA: yes — only the material provisions and signature must be handwritten (§ 6111); NC: problematic — it must be written ENTIRELY in the testator's handwriting (§ 31-3.4)",
          "Both states: yes",
          "Both states: no",
          "NC: yes; CA: no"
        ],
        correct: "CA: yes — only the material provisions and signature must be handwritten (§ 6111); NC: problematic — it must be written ENTIRELY in the testator's handwriting (§ 31-3.4)",
        explain: "California tolerates printed form text around handwritten material provisions. NC demands an entirely handwritten instrument. (Note: NC repealed the old 'found among valuable papers' requirement effective July 8, 2021.)",
        nc: "N.C. Gen. Stat. § 31-3.4", ca: "Cal. Prob. Code § 6111"
      },
      {
        terrain: "climb", diff: 3,
        q: "A testator acknowledges her signature to Witness A on Monday and, separately, to Witness B on Tuesday; each signs the same day she sees them. Valid attested will?",
        options: [
          "NC: yes — there is no simultaneous-presence requirement (§ 31-3.3); CA: no — the two witnesses must be present at the SAME TIME (§ 6110(b))",
          "Both states: yes",
          "Both states: no",
          "NC: no; CA: yes"
        ],
        correct: "NC: yes — there is no simultaneous-presence requirement (§ 31-3.3); CA: no — the two witnesses must be present at the SAME TIME (§ 6110(b))",
        explain: "Both require two witnesses, but California requires them to witness the signing or acknowledgment while present at the same time. NC has no such simultaneity requirement.",
        nc: "N.C. Gen. Stat. § 31-3.3", ca: "Cal. Prob. Code § 6110(b)"
      },
      {
        terrain: "climb", diff: 3,
        q: "A will is signed by only ONE witness, but the proponent proves by clear and convincing evidence that the decedent intended the document as her will. Can it be admitted?",
        options: [
          "CA: possibly yes — the harmless-error rule saves it (§ 6110(c)(2)); NC: no — the two-witness requirement must be met (§ 31-3.3)",
          "Both states: yes",
          "Both states: no",
          "NC: yes; CA: no"
        ],
        correct: "CA: possibly yes — the harmless-error rule saves it (§ 6110(c)(2)); NC: no — the two-witness requirement must be met (§ 31-3.3)",
        explain: "California has a statutory harmless-error / substantial-compliance safety valve. North Carolina has not adopted harmless error — its execution formalities must be met.",
        nc: "N.C. Gen. Stat. § 31-3.3", ca: "Cal. Prob. Code § 6110(c)(2)"
      },
      {
        terrain: "rolling", diff: 2,
        q: "Decedent dies intestate, survived by a spouse and one child; the estate is $1,000,000 of COMMUNITY property. The surviving spouse's share?",
        options: [
          "CA: the entire $1,000,000 (spouse keeps her own half plus the decedent's half, § 6401); NC: no community property — under § 29-14 the spouse takes the first $60,000 of personalty + half the balance + half of any realty",
          "Both states: $500,000",
          "CA: $500,000; NC: everything",
          "Both states: the entire estate"
        ],
        correct: "CA: the entire $1,000,000 (spouse keeps her own half plus the decedent's half, § 6401); NC: no community property — under § 29-14 the spouse takes the first $60,000 of personalty + half the balance + half of any realty",
        explain: "California's community-property classification controls intestacy: the spouse ends up with all of it. North Carolina has no community property and uses a dollar-threshold-plus-fraction formula.",
        nc: "N.C. Gen. Stat. § 29-14", ca: "Cal. Prob. Code § 6401"
      },
      {
        terrain: "sprint", diff: 2,
        q: "SPRINT! A beneficiary brings a will contest that ultimately LOSES but was supported by probable cause. Does the no-contest clause forfeit her gift?",
        options: [
          "No in both states — California by statute (§ 21311), North Carolina by common law (the Ryan v. Wachovia probable-cause exception)",
          "Yes in both states",
          "Yes in NC; no in CA",
          "No in NC; yes in CA"
        ],
        correct: "No in both states — California by statute (§ 21311), North Carolina by common law (the Ryan v. Wachovia probable-cause exception)",
        explain: "Both protect a good-faith contestant with probable cause — but California's safe harbor is codified and narrowly enumerated, while North Carolina's is judge-made.",
        nc: "Ryan v. Wachovia Bank & Trust Co. (common-law probable-cause exception)", ca: "Cal. Prob. Code § 21311"
      },
      {
        terrain: "hc", diff: 3,
        q: "SUMMIT FINISH. A client is using your legal services to perpetrate a large FINANCIAL fraud on third parties — no risk of bodily harm to anyone. May you reveal confidential information to prevent it?",
        options: [
          "NC: yes, permissively (RPC 1.6(b)(4)); CA: no — California's ONLY exception is to prevent a criminal act likely to cause death or substantial bodily harm (Rule 1.6(b); Bus. & Prof. Code § 6068(e))",
          "Both states: yes",
          "Both states: no",
          "NC: no; CA: yes"
        ],
        correct: "NC: yes, permissively (RPC 1.6(b)(4)); CA: no — California's ONLY exception is to prevent a criminal act likely to cause death or substantial bodily harm (Rule 1.6(b); Bus. & Prof. Code § 6068(e))",
        explain: "The marquee ethics divergence. California's confidentiality exception is limited to preventing death or substantial bodily harm — there is NO fraud or financial-crime exception. North Carolina follows the broader ABA model, including disclosure to prevent or mitigate client financial fraud that used the lawyer's services.",
        nc: "N.C. RPC 1.6(b)(4)", ca: "Cal. RPC 1.6(b); Cal. Bus. & Prof. Code § 6068(e)"
      },
      {
        terrain: "rolling", diff: 2,
        q: "When did California adopt Rules of Professional Conduct using the ABA Model Rules numbering and format?",
        options: [
          "November 1, 2018 — the last state to do so",
          "1983, alongside the original Model Rules",
          "1997",
          "It never has — California has no Rules of Professional Conduct"
        ],
        correct: "November 1, 2018 — the last state to do so",
        explain: "California was the final state to move to ABA-model-format rules (effective Nov. 1, 2018) and still diverges substantively. North Carolina has been ABA-model-aligned for decades.",
        nc: "N.C. RPC (ABA-model-aligned for decades)", ca: "Cal. Rules of Professional Conduct (eff. Nov. 1, 2018)"
      },
      {
        terrain: "climb", diff: 3,
        q: "A lawyer takes an HOURLY matter where total fees will foreseeably reach $5,000, under nothing but an oral agreement. Is the fee agreement enforceable?",
        options: [
          "CA: it is VOIDABLE by the client — § 6148 required a writing once foreseeable cost exceeds $1,000 (the lawyer is then limited to a reasonable fee); NC: no per-se writing rule for hourly work (RPC 1.5)",
          "Fully enforceable in both states",
          "Void in both states",
          "Voidable in NC; perfectly fine in CA"
        ],
        correct: "CA: it is VOIDABLE by the client — § 6148 required a writing once foreseeable cost exceeds $1,000 (the lawyer is then limited to a reasonable fee); NC: no per-se writing rule for hourly work (RPC 1.5)",
        explain: "California requires written fee agreements for non-contingency matters where foreseeable total cost exceeds $1,000; non-compliance makes the agreement voidable by the client. NC requires writings for contingent fees but has no blanket $1,000 rule.",
        nc: "N.C. RPC 1.5(c)", ca: "Cal. Bus. & Prof. Code § 6148"
      },
      {
        terrain: "rolling", diff: 2,
        q: "As of 2026, do both NC and CA impose a mandatory duty to report another lawyer's serious misconduct?",
        options: [
          "Yes — both do now, but California's Rule 8.3 only took effect August 1, 2023, while North Carolina's has existed since 1997",
          "Only North Carolina has a mandatory reporting rule",
          "Only California has one",
          "Neither state requires reporting another lawyer's misconduct"
        ],
        correct: "Yes — both do now, but California's Rule 8.3 only took effect August 1, 2023, while North Carolina's has existed since 1997",
        explain: "California was a long-standing holdout with no mandatory-reporting rule until its Rule 8.3 took effect Aug. 1, 2023. North Carolina has required reporting since its 1997 ABA-model reorganization.",
        nc: "N.C. RPC 8.3 (since 1997)", ca: "Cal. RPC 8.3 (eff. Aug. 1, 2023)"
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) { module.exports = { STAGES }; }
