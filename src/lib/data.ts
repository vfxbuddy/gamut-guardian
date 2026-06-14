export type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export type Topic = {
  id: string;
  title: string;
  suit: "Source" | "Primaries" | "Curve" | "View";
  summary: string;
  xp: number;
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  difficulty: "Runner" | "Junior" | "Senior";
  rarity: Rarity;
  tags: string[];
};

export type Scenario = {
  id: string;
  title: string;
  prompt: string;
  plateState: string;
  choices: {
    id: string;
    label: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  rewardXp: number;
  suit: Topic["suit"];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  xpRequired: number;
  rarity: Rarity;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  tags: string[];
  rarity: Rarity;
};

export type GuideArticle = {
  id: string;
  title: string;
  category: string;
  summary: string;
  steps: string[];
  relatedTerms: string[];
};

export const topics: Topic[] = [
  {
    id: "acescg",
    title: "ACEScg",
    suit: "Primaries",
    summary: "Scene-linear AP1 working space for CG, comp math, lighting passes, and clean merges.",
    xp: 42,
  },
  {
    id: "idts",
    title: "IDTs",
    suit: "Source",
    summary: "Input transforms that translate camera or texture encodings into the ACES scene.",
    xp: 28,
  },
  {
    id: "odts",
    title: "ODTs",
    suit: "View",
    summary: "Display transforms for review devices without baking display decisions into the comp.",
    xp: 31,
  },
  {
    id: "utility-linear-srgb",
    title: "Utility Linear sRGB",
    suit: "Curve",
    summary: "Linearized sRGB primaries for specific texture and interchange cases, not a universal camera IDT.",
    xp: 19,
  },
];

export const flashcards: Flashcard[] = [
  {
    id: "fc-acescg",
    front: "When should a Nuke comp use ACEScg?",
    back: "Use ACEScg as the scene-linear working space when combining CG, plates, light operations, and renders that need predictable linear math.",
    difficulty: "Runner",
    rarity: "Rare",
    tags: ["ACEScg", "AP1", "Working Space"],
  },
  {
    id: "fc-idt",
    front: "What does an IDT fix before comp starts?",
    back: "It interprets source encoding and camera colorimetry so log footage enters the ACES scene correctly.",
    difficulty: "Runner",
    rarity: "Uncommon",
    tags: ["IDT", "Source"],
  },
  {
    id: "fc-odt",
    front: "Why should an ODT stay near review/output?",
    back: "An ODT maps scene-referred values to a display. Baking it into comp math can clamp highlights and double-transform images.",
    difficulty: "Junior",
    rarity: "Rare",
    tags: ["ODT", "Viewer Transform"],
  },
  {
    id: "fc-hdri",
    front: "What is the ACES risk with HDRIs?",
    back: "HDRIs can arrive in mixed color spaces. Confirm texture encoding and convert intentionally before using them for lighting or reflections.",
    difficulty: "Junior",
    rarity: "Epic",
    tags: ["HDRI", "Texture", "Source"],
  },
  {
    id: "fc-exr",
    front: "Why are EXRs usually friendlier to ACES workflows?",
    back: "EXRs preserve scene-linear high dynamic range values, metadata, and multi-channel passes better than display-encoded files.",
    difficulty: "Runner",
    rarity: "Common",
    tags: ["EXR", "Workflow"],
  },
];

export const scenarios: Scenario[] = [
  {
    id: "sc-logc4",
    title: "LogC4 Misread",
    prompt: "Metadata shows ARRI LogC4 footage, but the Read node is tagged as Linear sRGB.",
    plateState: "The plate is flat in the source, then turns contrasty and clipped once grades stack.",
    rewardXp: 40,
    suit: "Source",
    choices: [
      {
        id: "cast-logc4",
        label: "Cast the LogC4 IDT",
        isCorrect: true,
        feedback: "Correct. Interpret the camera encoding at the source before doing scene-linear comp math.",
      },
      {
        id: "override-srgb",
        label: "Override with sRGB",
        isCorrect: false,
        feedback: "That swaps one wrong assumption for another. The camera log encoding still needs the right IDT.",
      },
      {
        id: "apply-odt",
        label: "Apply Rec.709 ODT",
        isCorrect: false,
        feedback: "An ODT belongs at viewing/output, not as the source fix for camera log plates.",
      },
    ],
  },
  {
    id: "sc-hdri",
    title: "Hot HDRI Reflection",
    prompt: "A CG chrome pass blooms strangely after an HDRI was converted with a display transform.",
    plateState: "Specular energy feels synthetic: dim mids, hot edges, and odd hue shifts.",
    rewardXp: 35,
    suit: "Curve",
    choices: [
      {
        id: "linearize-texture",
        label: "Reconvert the HDRI as scene-linear texture data",
        isCorrect: true,
        feedback: "Correct. Keep lighting data scene-linear so reflections preserve energy.",
      },
      {
        id: "add-viewer-lut",
        label: "Stack a stronger Viewer LUT",
        isCorrect: false,
        feedback: "A viewer transform cannot repair source data that was display-mapped too early.",
      },
      {
        id: "clamp-highlights",
        label: "Clamp values above one",
        isCorrect: false,
        feedback: "That hides the symptom and destroys useful HDR lighting values.",
      },
    ],
  },
  {
    id: "sc-exr",
    title: "Mystery EXR",
    prompt: "A vendor EXR arrives without notes. It looks washed out when assigned ACEScg.",
    plateState: "Black levels are lifted and beauty/specular do not merge like the turntable reference.",
    rewardXp: 30,
    suit: "Primaries",
    choices: [
      {
        id: "inspect-metadata",
        label: "Inspect metadata and confirm render color space",
        isCorrect: true,
        feedback: "Correct. EXR container does not guarantee ACEScg. Verify the actual render space.",
      },
      {
        id: "assume-acescg",
        label: "Assume every EXR is ACEScg",
        isCorrect: false,
        feedback: "EXR stores values well, but the color space still needs confirmation.",
      },
      {
        id: "bake-rec709",
        label: "Bake a Rec.709 LUT into the EXR",
        isCorrect: false,
        feedback: "That makes downstream scene-linear comp less reliable.",
      },
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: "linearity-vanguard",
    title: "Linearity Vanguard",
    description: "Win a challenge by preserving scene-linear math.",
    xpRequired: 100,
    rarity: "Rare",
  },
  {
    id: "ap1-operator",
    title: "AP1 Operator",
    description: "Master the difference between AP0, AP1, and display primaries.",
    xpRequired: 180,
    rarity: "Epic",
  },
  {
    id: "source-sentinel",
    title: "Source Sentinel",
    description: "Catch camera, HDRI, and vendor source mistakes before comp.",
    xpRequired: 260,
    rarity: "Legendary",
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "acescg",
    term: "ACEScg",
    definition: "ACES working space using AP1 primaries and a scene-linear transfer, commonly used for CG and compositing.",
    tags: ["AP1", "Comp", "CG"],
    rarity: "Rare",
  },
  {
    id: "idt",
    term: "IDT",
    definition: "Input Device Transform. Converts camera or source encodings into ACES scene-referred values.",
    tags: ["Source", "Camera"],
    rarity: "Uncommon",
  },
  {
    id: "odt",
    term: "ODT",
    definition: "Output Device Transform. Maps scene-referred values to a specific display target.",
    tags: ["Display", "Viewer"],
    rarity: "Uncommon",
  },
  {
    id: "utility-linear-srgb",
    term: "Utility Linear sRGB",
    definition: "A utility color space with sRGB primaries and linear transfer, useful for certain textures and interchange workflows.",
    tags: ["Texture", "Linear"],
    rarity: "Rare",
  },
  {
    id: "viewer-transform",
    term: "Viewer Transform",
    definition: "A non-destructive viewing conversion that previews scene-referred imagery on a display.",
    tags: ["Nuke", "Review"],
    rarity: "Common",
  },
  {
    id: "exr-workflow",
    term: "EXR Workflow",
    definition: "A high dynamic range image workflow that preserves linear values, channels, and metadata through comp.",
    tags: ["EXR", "Render"],
    rarity: "Common",
  },
  {
    id: "common-aces-mistake",
    term: "Double Transform",
    definition: "Applying an input, view, or output transform twice, often causing contrast, saturation, or highlight errors.",
    tags: ["Mistake", "Troubleshooting"],
    rarity: "Epic",
  },
  {
    id: "hdri",
    term: "HDRI",
    definition: "High dynamic range environment imagery used for lighting, reflection, or reference. Encoding must be confirmed.",
    tags: ["Lighting", "Source"],
    rarity: "Rare",
  },
];

export const guideArticles: GuideArticle[] = [
  {
    id: "read-node-triage",
    title: "Read Node Triage",
    category: "Nuke Workflow",
    summary: "Confirm source metadata, expected encoding, and the working-space handoff before grading.",
    steps: ["Read metadata", "Assign the correct source transform", "Check neutral values", "Compare through the viewer transform"],
    relatedTerms: ["IDT", "Viewer Transform"],
  },
  {
    id: "exr-vendor-check",
    title: "Vendor EXR Check",
    category: "Production Reference",
    summary: "Use metadata, contact sheets, and known-gray checks before assuming a render is ACEScg.",
    steps: ["Inspect channels", "Check metadata", "Compare known grays", "Document the confirmed space"],
    relatedTerms: ["EXR Workflow", "ACEScg"],
  },
  {
    id: "viewer-vs-bake",
    title: "Viewer Transform vs Bake",
    category: "Troubleshooting",
    summary: "Keep review transforms in the viewer/output path unless delivery explicitly requires a baked display file.",
    steps: ["Keep comp scene-linear", "Preview through show/view transform", "Bake only at output", "Label deliverables clearly"],
    relatedTerms: ["ODT", "Viewer Transform", "Double Transform"],
  },
];

export const totalStarterXp = topics.reduce((sum, topic) => sum + topic.xp, 0);
