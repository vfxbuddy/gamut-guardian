export type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export type KnowledgeSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  note: string;
};

export type Topic = {
  id: string;
  title: string;
  suit: "Source" | "Primaries" | "Curve" | "View";
  summary: string;
  xp: number;
  aliases: string[];
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  difficulty: "Runner" | "Junior" | "Senior";
  rarity: Rarity;
  tags: string[];
  aliases: string[];
  sourceIds: string[];
};

export type Scenario = {
  id: string;
  title: string;
  prompt: string;
  plateState: string;
  aliases: string[];
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
  productionUse: string;
  mistakes: string[];
  aliases: string[];
  questions: string[];
  tags: string[];
  rarity: Rarity;
  sourceIds: string[];
};

export type GuideArticle = {
  id: string;
  title: string;
  category: string;
  summary: string;
  steps: string[];
  relatedTerms: string[];
  aliases: string[];
  sourceIds: string[];
};

export type VideoTutorial = {
  id: string;
  title: string;
  channel: string;
  youtubeId?: string;
  playlistId?: string;
  summary: string;
  tags: string[];
  level: "Foundation" | "Production" | "Advanced";
  sourceUrl: string;
};

export const knowledgeSources: KnowledgeSource[] = [
  {
    id: "aces-docs-overview",
    title: "ACES System Overview",
    publisher: "ACES Documentation",
    url: "https://docs.acescentral.com/background/overview/",
    note: "Official overview of ACES encodings including ACES2065-1, ACEScg, and ACEScct.",
  },
  {
    id: "foundry-ocio",
    title: "OCIO Color Management in Nuke",
    publisher: "Foundry Learn",
    url: "https://learn.foundry.com/nuke/content/comp_environment/configuring_nuke/using_ocio_config_files.html",
    note: "Foundry documentation for OCIO configs, working space, Read/Write transforms, viewer defaults, and ACEScg scene_linear roles.",
  },
  {
    id: "ocio-authoring",
    title: "OpenColorIO Authoring Configurations",
    publisher: "OpenColorIO",
    url: "https://opencolorio.readthedocs.io/en/latest/guides/authoring/authoring.html",
    note: "OCIO roles and interchange concepts, including aces_interchange and scene-referred config behavior.",
  },
  {
    id: "acescentral-foundry-video",
    title: "Color Management Fundamentals & ACES Workflows Lesson",
    publisher: "ACESCentral",
    url: "https://acescentral.com/new-video-color-management-fundamentals-aces-workflows-lesson/",
    note: "ACESCentral announcement for Foundry and Victor Perez ACES/Nuke learning material.",
  },
  {
    id: "aswf-ocio-aces",
    title: "OpenColorIO Config ACES Releases",
    publisher: "Academy Software Foundation",
    url: "https://github.com/AcademySoftwareFoundation/OpenColorIO-Config-ACES/releases",
    note: "OpenColorIO ACES config release notes and direction for ACES CG and studio configs.",
  },
];

export const topics: Topic[] = [
  {
    id: "acescg",
    title: "ACEScg",
    suit: "Primaries",
    summary: "Scene-linear AP1 working space for CG, comp math, lighting passes, and clean merges.",
    xp: 42,
    aliases: ["AP1", "scene_linear", "working space", "linear AP1", "CG render space"],
  },
  {
    id: "idts",
    title: "IDTs",
    suit: "Source",
    summary: "Input transforms that translate camera or texture encodings into the ACES scene.",
    xp: 38,
    aliases: ["Input Device Transform", "input transform", "camera transform", "source transform", "LogC4 IDT"],
  },
  {
    id: "odts",
    title: "Output Transforms",
    suit: "View",
    summary: "Display/view transforms for review devices without baking display decisions into the comp.",
    xp: 36,
    aliases: ["ODT", "Output Device Transform", "view transform", "display transform", "Rec.709 output"],
  },
  {
    id: "ocio",
    title: "OCIO in Nuke",
    suit: "View",
    summary: "The config system that exposes ACES roles, colorspaces, displays, and views inside Nuke.",
    xp: 33,
    aliases: ["OpenColorIO", "OCIO config", "roles", "displays", "views"],
  },
  {
    id: "utility-linear-srgb",
    title: "Utility Linear sRGB",
    suit: "Curve",
    summary: "Linearized sRGB primaries for specific texture and interchange cases, not a universal camera IDT.",
    xp: 25,
    aliases: ["lin_srgb", "linear sRGB", "Utility - Linear - sRGB", "texture color space"],
  },
  {
    id: "exr-workflows",
    title: "EXR Workflows",
    suit: "Source",
    summary: "High dynamic range image handling for plates, renders, AOVs, metadata, and handoff checks.",
    xp: 30,
    aliases: ["OpenEXR", "multichannel EXR", "half float", "AOV", "render pass"],
  },
];

export const flashcards: Flashcard[] = [
  {
    id: "fc-acescg-use",
    front: "When should a Nuke comp use ACEScg?",
    back: "Use ACEScg as the scene-linear working space when combining CG, plates, light operations, and renders that need predictable linear math.",
    difficulty: "Runner",
    rarity: "Rare",
    tags: ["ACEScg", "AP1", "Working Space"],
    aliases: ["working space", "scene linear", "cg comp", "AP1"],
    sourceIds: ["aces-docs-overview", "foundry-ocio"],
  },
  {
    id: "fc-aces2065",
    front: "What is ACES2065-1 for?",
    back: "ACES2065-1 is the AP0, scene-linear interchange/archival encoding. It is great for handoff and preservation, but ACEScg is usually friendlier for CG and comp work.",
    difficulty: "Junior",
    rarity: "Epic",
    tags: ["ACES2065-1", "AP0", "Interchange"],
    aliases: ["AP0", "ST2065-1", "archive", "interchange", "ACES AP0"],
    sourceIds: ["aces-docs-overview", "ocio-authoring"],
  },
  {
    id: "fc-idt",
    front: "What does an IDT fix before comp starts?",
    back: "It interprets source encoding and camera colorimetry so log footage enters the ACES scene correctly before linear compositing operations.",
    difficulty: "Runner",
    rarity: "Uncommon",
    tags: ["IDT", "Source", "Camera"],
    aliases: ["input device transform", "input transform", "camera log", "source color"],
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "fc-odt",
    front: "Why should an output/view transform stay near review or output?",
    back: "It maps scene-referred values to a display. Baking it into comp math can clamp highlights, shift color, and create double-transform mistakes.",
    difficulty: "Junior",
    rarity: "Rare",
    tags: ["ODT", "Viewer Transform", "Display"],
    aliases: ["output transform", "view transform", "viewer LUT", "display referred", "Rec709"],
    sourceIds: ["aces-docs-overview", "foundry-ocio"],
  },
  {
    id: "fc-viewer-transform",
    front: "Is the Viewer Transform part of the rendered comp?",
    back: "Usually no. It is a non-destructive preview of scene-linear values on your display. Keep it in the viewer/output path unless a delivery spec says to bake it.",
    difficulty: "Runner",
    rarity: "Common",
    tags: ["Viewer", "Nuke", "Display"],
    aliases: ["viewer process", "viewer lut", "sRGB monitor", "display transform"],
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "fc-hdri",
    front: "What is the ACES risk with HDRIs?",
    back: "HDRIs can arrive in mixed encodings. Confirm texture color space and convert intentionally before using them for lighting, reflections, or CG integration.",
    difficulty: "Junior",
    rarity: "Epic",
    tags: ["HDRI", "Texture", "Source"],
    aliases: ["environment map", "reflection map", "lighting texture", "latlong"],
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "fc-exr",
    front: "Why are EXRs usually friendlier to ACES workflows?",
    back: "EXRs preserve high dynamic range scene-linear values, metadata, and multi-channel passes better than display-encoded files.",
    difficulty: "Runner",
    rarity: "Common",
    tags: ["EXR", "Workflow", "AOV"],
    aliases: ["OpenEXR", "half float", "multichannel", "render pass", "beauty rebuild"],
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "fc-raw",
    front: "When should you use Raw in a Read node?",
    back: "Use Raw for data passes that should not be color transformed, like depth, normals, IDs, motion vectors, masks, and many utility AOVs.",
    difficulty: "Junior",
    rarity: "Rare",
    tags: ["Raw", "Data", "AOV"],
    aliases: ["depth pass", "normals", "P pass", "motion vector", "crypto", "mask"],
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "fc-ap0-ap1",
    front: "What is the practical AP0 vs AP1 difference?",
    back: "AP0 is the very wide ACES interchange gamut. AP1 is smaller and designed for production work such as ACEScg, ACEScc, and ACEScct.",
    difficulty: "Senior",
    rarity: "Legendary",
    tags: ["AP0", "AP1", "Primaries"],
    aliases: ["gamut", "primaries", "ACEScg vs ACES2065", "wide gamut"],
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "fc-double-transform",
    front: "What does a double transform look like?",
    back: "Often too contrasty, too saturated, clipped, or mysteriously dark. It happens when an input, view, or output transform is applied twice.",
    difficulty: "Junior",
    rarity: "Epic",
    tags: ["Mistake", "Troubleshooting", "Double Transform"],
    aliases: ["crunchy", "clipped", "too dark", "too saturated", "wrong viewer"],
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "fc-acescct",
    front: "Why do colorists use ACEScct?",
    back: "ACEScct is a log-like AP1 grading space with a toe near black, built for color correction behavior rather than linear light compositing math.",
    difficulty: "Senior",
    rarity: "Rare",
    tags: ["ACEScct", "Grading", "AP1"],
    aliases: ["ACEScc", "grading space", "log curve", "colorist"],
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "fc-lmt",
    front: "What is an LMT?",
    back: "A Look Modification Transform is a creative or show look transform inside the ACES pipeline. Treat it separately from source IDTs and display output transforms.",
    difficulty: "Senior",
    rarity: "Rare",
    tags: ["LMT", "Look", "Show LUT"],
    aliases: ["look modification transform", "show look", "creative look", "look pipeline"],
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "fc-log-footage",
    front: "Why does log footage look flat before the right transform?",
    back: "Log encodings compress scene values for capture/storage. They need the matching source transform before the image is meaningful in a scene-linear comp.",
    difficulty: "Runner",
    rarity: "Uncommon",
    tags: ["Log", "Camera", "IDT"],
    aliases: ["LogC4", "S-Log3", "V-Log", "flat plate", "camera raw"],
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "fc-linear-math",
    front: "Why does comp math care about scene-linear values?",
    back: "Light operations such as plus, merge, defocus energy, glow, and CG integration behave predictably when values represent linear light.",
    difficulty: "Runner",
    rarity: "Rare",
    tags: ["Linear", "Comp Math", "Merge"],
    aliases: ["plus merge", "over", "glow", "defocus", "light energy"],
    sourceIds: ["aces-docs-overview"],
  },
];

export const scenarios: Scenario[] = [
  {
    id: "sc-logc4",
    title: "LogC4 Misread",
    prompt: "Metadata shows ARRI LogC4 footage, but the Read node is tagged as Linear sRGB.",
    plateState: "The plate is flat in the source, then turns contrasty and clipped once grades stack.",
    aliases: ["ARRI", "LogC4", "wrong input transform", "flat plate", "camera log"],
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
        feedback: "An output transform belongs at viewing/output, not as the source fix for camera log plates.",
      },
    ],
  },
  {
    id: "sc-hdri",
    title: "Hot HDRI Reflection",
    prompt: "A CG chrome pass blooms strangely after an HDRI was converted with a display transform.",
    plateState: "Specular energy feels synthetic: dim mids, hot edges, and odd hue shifts.",
    aliases: ["HDRI", "environment map", "reflection", "lighting", "display transform baked"],
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
    aliases: ["vendor EXR", "metadata", "AOV", "washed out", "ACEScg assumption"],
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
  {
    id: "sc-data-pass",
    title: "The Colored Normal Pass",
    prompt: "A normals pass is going through the same ACES input transform as the beauty pass.",
    plateState: "Relighting vectors are skewed and normals no longer point where expected.",
    aliases: ["normal pass", "data pass", "raw", "AOV", "utility pass"],
    rewardXp: 32,
    suit: "Source",
    choices: [
      {
        id: "set-raw",
        label: "Set the normals pass to Raw/data",
        isCorrect: true,
        feedback: "Correct. Non-color data should not be interpreted like camera or display imagery.",
      },
      {
        id: "use-odt",
        label: "Preview normals with Rec.709 ODT",
        isCorrect: false,
        feedback: "That helps display an image, but it does not protect vector data from color transforms.",
      },
      {
        id: "grade-normal",
        label: "Grade the normal pass until it looks right",
        isCorrect: false,
        feedback: "Data passes are not beauty images. Fix the transform, not the appearance.",
      },
    ],
  },
  {
    id: "sc-review-bake",
    title: "Baked Review LUT Trap",
    prompt: "A plate arrives from editorial with a show LUT already baked, then the Nuke viewer applies the show look again.",
    plateState: "The image looks dramatic but the blacks are crushed and skin is oversaturated.",
    aliases: ["double LUT", "viewer LUT", "baked LUT", "review QuickTime", "crushed blacks"],
    rewardXp: 45,
    suit: "View",
    choices: [
      {
        id: "confirm-bake",
        label: "Confirm whether the incoming plate is display-baked",
        isCorrect: true,
        feedback: "Correct. Determine if the look is already baked before applying another view transform.",
      },
      {
        id: "more-contrast",
        label: "Add contrast to match the reference",
        isCorrect: false,
        feedback: "The reference may already be display-referred. More contrast compounds the problem.",
      },
      {
        id: "change-working-space",
        label: "Switch the whole comp to Rec.709",
        isCorrect: false,
        feedback: "Working display-referred throws away the scene-linear benefits you need for comp.",
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
  {
    id: "viewer-warden",
    title: "Viewer Warden",
    description: "Diagnose viewer transform and baked LUT mistakes before review.",
    xpRequired: 340,
    rarity: "Legendary",
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "aces",
    term: "ACES",
    definition: "Academy Color Encoding System, a color management framework for consistent scene-referred interchange, production, mastering, and display.",
    productionUse: "Use it as the shared language between camera plates, CG renders, grading, VFX, and delivery.",
    mistakes: ["Treating ACES as one single color space instead of a pipeline", "Baking output transforms into comp plates by accident"],
    aliases: ["Academy Color Encoding System", "ACES pipeline", "color management"],
    questions: ["What is ACES?", "Why does VFX use ACES?", "Is ACES a LUT?"],
    tags: ["Pipeline", "Color Management"],
    rarity: "Common",
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "acescg",
    term: "ACEScg",
    definition: "ACES working space using AP1 primaries and a scene-linear transfer, commonly used for CG rendering and compositing.",
    productionUse: "Set as the scene_linear working space in ACES/OCIO Nuke projects when combining renders and plates.",
    mistakes: ["Assuming every EXR is ACEScg", "Using ACEScg as a display/view transform"],
    aliases: ["AP1 linear", "scene_linear", "ACES - ACEScg", "linear AP1"],
    questions: ["When should I use ACEScg?", "Is ACEScg AP0 or AP1?", "Why use ACEScg in Nuke?"],
    tags: ["AP1", "Comp", "CG"],
    rarity: "Rare",
    sourceIds: ["aces-docs-overview", "foundry-ocio"],
  },
  {
    id: "aces2065-1",
    term: "ACES2065-1",
    definition: "The AP0, scene-linear ACES interchange encoding defined for long-term image exchange and preservation.",
    productionUse: "Use for archival/interchange handoff when the spec asks for ACES AP0 linear image data.",
    mistakes: ["Using AP0 as the day-to-day comp working space without a reason", "Confusing AP0 storage with ACEScg working space"],
    aliases: ["ACES 2065-1", "ST2065-1", "AP0", "ACES AP0", "aces_interchange"],
    questions: ["What is ACES2065-1?", "Should I render AP0 or AP1?", "What is ACES interchange?"],
    tags: ["AP0", "Interchange", "Archive"],
    rarity: "Epic",
    sourceIds: ["aces-docs-overview", "ocio-authoring"],
  },
  {
    id: "ap0",
    term: "AP0",
    definition: "The very wide ACES primary set used by ACES2065-1 for interchange and archival encoding.",
    productionUse: "Think of AP0 as a storage/interchange gamut, not usually the most ergonomic working gamut for comp operations.",
    mistakes: ["Calling any ACES file AP0", "Mistaking AP0 for ACEScg"],
    aliases: ["ACES primaries", "ACES2065 primaries", "wide gamut"],
    questions: ["What is AP0?", "Is AP0 ACEScg?", "Why is AP0 so wide?"],
    tags: ["Primaries", "Gamut"],
    rarity: "Rare",
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "ap1",
    term: "AP1",
    definition: "The ACES production primary set used by ACEScg, ACEScc, and ACEScct.",
    productionUse: "Most compositor-facing ACES working and grading spaces use AP1 because it is more practical for image operations.",
    mistakes: ["Exporting AP1 when the delivery requested ACES2065-1 AP0", "Assuming AP1 means display-referred"],
    aliases: ["ACEScg primaries", "production primaries", "Rec.2020 plus"],
    questions: ["What is AP1?", "What uses AP1?", "Is ACEScg AP1?"],
    tags: ["Primaries", "Gamut"],
    rarity: "Rare",
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "idt",
    term: "IDT",
    definition: "Input Device Transform. Converts camera or source encodings into ACES scene-referred values.",
    productionUse: "Set the correct Read/input transform for camera plates, texture maps, scans, and source media.",
    mistakes: ["Using Utility Linear sRGB for camera log footage", "Fixing a bad IDT with a Grade node"],
    aliases: ["Input Device Transform", "input transform", "source transform", "camera IDT"],
    questions: ["What IDT should I use?", "Why is my log plate flat?", "Where do I set the input transform?"],
    tags: ["Source", "Camera", "Read Node"],
    rarity: "Uncommon",
    sourceIds: ["aces-docs-overview", "foundry-ocio"],
  },
  {
    id: "odt",
    term: "Output Transform",
    definition: "The display/output transform that maps scene-referred ACES values to a display target such as SDR, P3, or HDR.",
    productionUse: "Use as a view/output decision, not as the math space for the comp tree.",
    mistakes: ["Baking it before comp", "Applying it twice through the viewer and a LUT node"],
    aliases: ["ODT", "Output Device Transform", "display transform", "view transform", "Rec.709 ODT"],
    questions: ["Where does the ODT go?", "Why does my viewer look different?", "Should I bake Rec.709?"],
    tags: ["Display", "Viewer", "Output"],
    rarity: "Uncommon",
    sourceIds: ["aces-docs-overview", "foundry-ocio"],
  },
  {
    id: "rrt",
    term: "RRT",
    definition: "Reference Rendering Transform, the ACES rendering transform historically paired with ODTs to produce display-referred output.",
    productionUse: "Understand it as part of the ACES output rendering path rather than a source or comp working transform.",
    mistakes: ["Expecting scene-linear ACES values to look normal without a rendering/view transform"],
    aliases: ["Reference Rendering Transform", "rendering transform", "ACES output path"],
    questions: ["What is RRT?", "Why does ACES need rendering transform?", "Why does linear look wrong?"],
    tags: ["Output", "Display", "ACES"],
    rarity: "Rare",
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "lmt",
    term: "LMT",
    definition: "Look Modification Transform. A creative or show-look transform inside the ACES pipeline.",
    productionUse: "Separate show look decisions from source transforms and display transforms.",
    mistakes: ["Treating a show LUT as an IDT", "Baking a creative look into neutral plates unintentionally"],
    aliases: ["Look Modification Transform", "show LUT", "creative look", "look transform"],
    questions: ["What is an LMT?", "Where does show look go?", "Is a LUT an IDT?"],
    tags: ["Look", "Show LUT"],
    rarity: "Rare",
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "ocio",
    term: "OpenColorIO",
    definition: "A color management system used by Nuke to define colorspaces, roles, displays, views, and transforms through config files.",
    productionUse: "Use OCIO configs to keep Read, Write, Viewer, and transform choices consistent across a show.",
    mistakes: ["Mixing native and OCIO assumptions", "Changing OCIO config mid-show without checking defaults"],
    aliases: ["OCIO", "OCIO config", "colorspace config", "roles", "views"],
    questions: ["What is OCIO?", "How does Nuke know ACEScg?", "Where are colorspaces defined?"],
    tags: ["Nuke", "Config", "Pipeline"],
    rarity: "Rare",
    sourceIds: ["foundry-ocio", "ocio-authoring"],
  },
  {
    id: "scene-linear",
    term: "Scene-linear",
    definition: "An image state where values relate linearly to scene light, making light math predictable.",
    productionUse: "Composite, merge, glow, defocus, and integrate CG in scene-linear whenever possible.",
    mistakes: ["Doing light-add math on display-referred footage", "Judging scene-linear values without a viewer transform"],
    aliases: ["linear light", "scene referred", "scene_linear", "linear comp"],
    questions: ["Why scene-linear?", "Why does plus merge look wrong?", "Should I grade in linear?"],
    tags: ["Comp Math", "Light"],
    rarity: "Common",
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "display-referred",
    term: "Display-referred",
    definition: "Image values prepared for a specific display appearance rather than representing original scene light.",
    productionUse: "Use for review and delivery targets, not as the default space for linear VFX integration.",
    mistakes: ["Using display-referred plates as if they were scene-linear", "Applying source IDTs to already display-baked media"],
    aliases: ["display encoded", "Rec709", "sRGB display", "video referred"],
    questions: ["What is display referred?", "Why is Rec709 not linear?", "Why did highlights clip?"],
    tags: ["Display", "Review"],
    rarity: "Common",
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "utility-linear-srgb",
    term: "Utility Linear sRGB",
    definition: "A utility color space with sRGB primaries and linear transfer, useful for some textures and interchange workflows.",
    productionUse: "Useful for known linear-sRGB CG/textures; not a catch-all for log plates or unknown files.",
    mistakes: ["Using it for camera log footage", "Assuming 'linear' means 'correct for every source'"],
    aliases: ["linear sRGB", "lin_srgb", "Utility - Linear - sRGB", "texture linear"],
    questions: ["When do I use linear sRGB?", "Is Linear sRGB an IDT?", "Why does sRGB texture look wrong?"],
    tags: ["Texture", "Linear", "Utility"],
    rarity: "Rare",
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "raw",
    term: "Raw / Data",
    definition: "A read or transform choice for non-color data that should not be color managed as visible image color.",
    productionUse: "Use for depth, normals, positions, motion vectors, IDs, masks, and utility passes.",
    mistakes: ["Applying ACES transforms to normals or depth", "Viewing data passes as if they should look pretty"],
    aliases: ["data", "raw colorspace", "utility pass", "non-color data"],
    questions: ["Should depth be Raw?", "Why are my normals wrong?", "Do masks need ACES?"],
    tags: ["AOV", "Data", "Nuke"],
    rarity: "Rare",
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "viewer-transform",
    term: "Viewer Transform",
    definition: "A non-destructive viewing conversion that previews scene-referred imagery on a display.",
    productionUse: "Set the Nuke viewer to the correct display/view for your monitor and show pipeline.",
    mistakes: ["Mistaking viewer appearance for baked pixel values", "Comparing against references with mismatched viewer transforms"],
    aliases: ["viewer process", "viewer LUT", "display view", "Nuke viewer"],
    questions: ["What viewer should I use?", "Why does Nuke look different from RV?", "Is viewer transform baked?"],
    tags: ["Nuke", "Review", "Display"],
    rarity: "Common",
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "exr-workflow",
    term: "EXR Workflow",
    definition: "A high dynamic range image workflow that preserves linear values, channels, metadata, and render passes through comp.",
    productionUse: "Use EXRs for plates/renders/AOVs when you need high dynamic range and multi-channel production data.",
    mistakes: ["Assuming EXR automatically means ACEScg", "Ignoring metadata and vendor notes"],
    aliases: ["OpenEXR", "multichannel", "AOV", "half float", "render passes"],
    questions: ["Is every EXR linear?", "How do I read AOVs?", "Why is vendor EXR washed out?"],
    tags: ["EXR", "Render", "AOV"],
    rarity: "Common",
    sourceIds: ["aces-docs-overview", "foundry-ocio"],
  },
  {
    id: "hdri",
    term: "HDRI",
    definition: "High dynamic range environment imagery used for lighting, reflection, or reference. Encoding must be confirmed.",
    productionUse: "Treat HDRIs as lighting data; confirm whether they are scene-linear, linear sRGB, ACEScg, or another space.",
    mistakes: ["Display-transforming lighting maps", "Clamping values above 1.0"],
    aliases: ["environment map", "latlong", "reflection map", "lighting map"],
    questions: ["What color space is my HDRI?", "Why are reflections clipped?", "Should HDRI be ACEScg?"],
    tags: ["Lighting", "Source", "Texture"],
    rarity: "Rare",
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "double-transform",
    term: "Double Transform",
    definition: "Applying an input, view, output, or LUT transform twice, often causing contrast, saturation, or highlight errors.",
    productionUse: "Check Read node, transform nodes, viewer process, Write node, and editorial sources when images look crunchy or dark.",
    mistakes: ["Baked LUT plus viewer LUT", "IDT on footage that was already converted", "Output transform before comp math"],
    aliases: ["double LUT", "crunchy image", "too saturated", "too dark", "clipped highlights"],
    questions: ["Why is my image crunchy?", "Why is ACES too contrasty?", "Why are blacks crushed?"],
    tags: ["Mistake", "Troubleshooting"],
    rarity: "Epic",
    sourceIds: ["foundry-ocio", "aces-docs-overview"],
  },
  {
    id: "acescct",
    term: "ACEScct",
    definition: "A logarithmic AP1 ACES grading space with a toe near black, designed for color correction workflows.",
    productionUse: "Useful in grading contexts; less appropriate for raw light math than ACEScg scene-linear.",
    mistakes: ["Doing linear comp operations in ACEScct", "Confusing ACEScct with camera log"],
    aliases: ["ACES cc t", "grading space", "log AP1", "colorist space"],
    questions: ["What is ACEScct?", "Should I comp in ACEScct?", "ACEScc vs ACEScct?"],
    tags: ["Grading", "AP1", "Log"],
    rarity: "Rare",
    sourceIds: ["aces-docs-overview"],
  },
  {
    id: "gamut-compression",
    term: "Gamut Compression",
    definition: "A technique used to manage out-of-gamut colors that can appear as overly saturated or invalid values in wide-gamut workflows.",
    productionUse: "Useful when camera/LED/spectral colors create problematic values that need perceptual compression rather than hard clipping.",
    mistakes: ["Clipping color channels instead of managing gamut", "Treating all saturation issues as grade problems"],
    aliases: ["out of gamut", "negative values", "neon colors", "gamut mapping"],
    questions: ["Why are colors out of gamut?", "What is gamut compression?", "Why do I have negative values?"],
    tags: ["Gamut", "Troubleshooting"],
    rarity: "Epic",
    sourceIds: ["foundry-ocio", "aces-docs-overview"],
  },
  {
    id: "read-node",
    term: "Read Node Transform",
    definition: "The color transform Nuke applies as media enters the script, based on file type, OCIO config, defaults, and user selection.",
    productionUse: "Audit Read nodes first when a plate or render looks wrong.",
    mistakes: ["Leaving default transform unchecked", "Assuming the filename tells the whole story"],
    aliases: ["read colorspace", "input transform", "source colorspace", "read node color"],
    questions: ["What should my Read node be?", "Why is my plate wrong in Nuke?", "Where do I set source color?"],
    tags: ["Nuke", "Read", "Source"],
    rarity: "Common",
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "write-node",
    term: "Write Node Transform",
    definition: "The output color transform Nuke applies as media leaves the script, often tied to the working space and delivery target.",
    productionUse: "Use Write settings to deliver the requested interchange, review, or final display format.",
    mistakes: ["Writing review files as scene-linear EXR", "Writing comp handoff with display transform baked unintentionally"],
    aliases: ["write colorspace", "output colorspace", "delivery transform", "render out"],
    questions: ["What should my Write node be?", "How do I export ACEScg?", "Should I bake Rec709 on write?"],
    tags: ["Nuke", "Write", "Delivery"],
    rarity: "Common",
    sourceIds: ["foundry-ocio"],
  },
];

export const guideArticles: GuideArticle[] = [
  {
    id: "read-node-triage",
    title: "Read Node Triage",
    category: "Nuke Workflow",
    summary: "Confirm source metadata, expected encoding, and the working-space handoff before grading.",
    steps: ["Read metadata and vendor notes", "Identify camera/texture/render encoding", "Assign the correct source transform", "Check neutral values and highlight range", "Compare through the correct viewer transform"],
    relatedTerms: ["IDT", "Read Node Transform", "Viewer Transform"],
    aliases: ["source triage", "read node wrong", "plate ingest"],
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "exr-vendor-check",
    title: "Vendor EXR Check",
    category: "Production Reference",
    summary: "Use metadata, contact sheets, and known-gray checks before assuming a render is ACEScg.",
    steps: ["Inspect channels", "Check metadata", "Ask for render-space notes", "Compare known grays", "Document the confirmed space"],
    relatedTerms: ["EXR Workflow", "ACEScg", "ACES2065-1"],
    aliases: ["vendor handoff", "AOV check", "render ingest"],
    sourceIds: ["aces-docs-overview", "foundry-ocio"],
  },
  {
    id: "viewer-vs-bake",
    title: "Viewer Transform vs Bake",
    category: "Troubleshooting",
    summary: "Keep review transforms in the viewer/output path unless delivery explicitly requires a baked display file.",
    steps: ["Keep comp scene-linear", "Preview through show/view transform", "Check if editorial reference is already baked", "Bake only at output", "Label deliverables clearly"],
    relatedTerms: ["Output Transform", "Viewer Transform", "Double Transform"],
    aliases: ["viewer lut", "baked lut", "review transform"],
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "data-pass-protection",
    title: "Protect Data Passes",
    category: "CG Integration",
    summary: "Depth, normals, positions, IDs, masks, and vectors are data, not color-managed beauty pixels.",
    steps: ["Identify utility channels", "Set data passes to Raw", "Do not apply IDTs/ODTs to data", "Preview only through utility viewers", "Keep data separate from beauty color operations"],
    relatedTerms: ["Raw / Data", "EXR Workflow"],
    aliases: ["normals wrong", "depth wrong", "data aov"],
    sourceIds: ["foundry-ocio"],
  },
  {
    id: "aces-review-checklist",
    title: "ACES Review Checklist",
    category: "Review Room",
    summary: "A quick pre-review scan for the most common ACES mistakes before showing a shot.",
    steps: ["Confirm Read transforms", "Confirm working space", "Confirm viewer display/view", "Check for baked LUTs", "Check Write/output transform", "Compare against known reference"],
    relatedTerms: ["OpenColorIO", "Viewer Transform", "Write Node Transform"],
    aliases: ["review mismatch", "client review", "shot check"],
    sourceIds: ["foundry-ocio", "acescentral-foundry-video"],
  },
];

export const videoTutorials: VideoTutorial[] = [
  {
    id: "foundry-victor-perez-series",
    title: "Color Management Fundamentals & ACES Workflows in Nuke",
    channel: "Foundry / Victor Perez",
    playlistId: "PL70z9un4UL0aN-CZwuEnM7Ox0SsY7wBoa",
    summary: "A full ACES/Nuke learning series covering color management fundamentals and production workflow concepts.",
    tags: ["Foundry", "Nuke", "ACES", "Color Management", "Foundation"],
    level: "Foundation",
    sourceUrl: "https://www.youtube.com/playlist?list=PL70z9un4UL0aN-CZwuEnM7Ox0SsY7wBoa",
  },
  {
    id: "understanding-aces-nuke-x",
    title: "Understanding The ACES Color Workflow In Nuke X",
    channel: "Foundry",
    youtubeId: "Y2mcVM8c7cA",
    summary: "Foundry presentation focused on how ACES color workflow applies inside Nuke X.",
    tags: ["Foundry", "Nuke X", "ACES", "Workflow"],
    level: "Production",
    sourceUrl: "https://www.youtube.com/watch?v=Y2mcVM8c7cA",
  },
  {
    id: "aces-ocio-maya-ae-nuke",
    title: "ACES and OpenColorIO Workflow with Maya, After Effects, and Nuke",
    channel: "Guy Micciche",
    youtubeId: "llwFTH4sh_0",
    summary: "Cross-application ACES/OCIO workflow reference for moving between DCC, comp, and post tools.",
    tags: ["OCIO", "Maya", "After Effects", "Nuke", "Pipeline"],
    level: "Production",
    sourceUrl: "https://www.youtube.com/watch?v=llwFTH4sh_0",
  },
  {
    id: "aces-color-management-nuke",
    title: "ACES Color Management in NUKE",
    channel: "ACES / community tutorial",
    youtubeId: "umw0mGN3M9Q",
    summary: "Step-by-step ACES color management setup for Nuke and Nuke Studio.",
    tags: ["Nuke", "Setup", "OCIO", "ACES"],
    level: "Foundation",
    sourceUrl: "https://www.youtube.com/watch?v=umw0mGN3M9Q",
  },
  {
    id: "color-management-nuke-aces",
    title: "Color Management in Nuke with ACES",
    channel: "Compositing tutorial",
    youtubeId: "ha_8izaSMaY",
    summary: "Practical walkthrough for using ACES color management inside Nuke.",
    tags: ["Nuke", "ACES", "Compositing"],
    level: "Foundation",
    sourceUrl: "https://www.youtube.com/watch?v=ha_8izaSMaY",
  },
  {
    id: "aces-colorspace-workflow-nuke",
    title: "ACES Colorspace Workflow in Nuke",
    channel: "Compositing tutorial",
    youtubeId: "iKJI1vVvE-Q",
    summary: "Introductory ACES colorspace workflow video for Nuke compositors.",
    tags: ["Nuke", "ACEScg", "Colorspace", "Workflow"],
    level: "Foundation",
    sourceUrl: "https://www.youtube.com/watch?v=iKJI1vVvE-Q",
  },
  {
    id: "acescg-workflow-nuke",
    title: "Setting up ACES-CG Colorspace Workflow in Nuke",
    channel: "Nuke tutorial",
    youtubeId: "2-Q_RRdR9O8",
    summary: "Focused ACEScg setup tutorial for Nuke projects.",
    tags: ["ACEScg", "Nuke", "Setup", "AP1"],
    level: "Foundation",
    sourceUrl: "https://www.youtube.com/watch?v=2-Q_RRdR9O8",
  },
  {
    id: "ocio-aces-nuke-old-but-useful",
    title: "Color Management in Nuke: OCIO and ACES",
    channel: "Workflowers / Cédric Lejeune",
    youtubeId: "bR0WPtkTGZ4",
    summary: "Older but still conceptually useful explanation of OCIO and ACES setup in Nuke.",
    tags: ["OCIO", "ACES", "Nuke", "Config"],
    level: "Advanced",
    sourceUrl: "https://www.youtube.com/watch?v=bR0WPtkTGZ4",
  },
  {
    id: "nuke-ocio-updates",
    title: "Nuke 15.0 & 14.1 OpenColorIO Updates",
    channel: "Foundry",
    youtubeId: "vF_wGO8_82U",
    summary: "Foundry overview of Nuke OCIO updates that matter for modern color-managed workflows.",
    tags: ["Foundry", "Nuke", "OCIO", "Updates"],
    level: "Production",
    sourceUrl: "https://www.youtube.com/watch?v=vF_wGO8_82U",
  },
  {
    id: "resolve-nuke-aces-roundtrip",
    title: "DaVinci Resolve to Nuke Roundtrip Using ACES",
    channel: "VFX workflow tutorial",
    youtubeId: "8SG80SSkyGU",
    summary: "Roundtrip workflow reference for ACES plates moving from Resolve into Nuke.",
    tags: ["Resolve", "Nuke", "Roundtrip", "ACES"],
    level: "Advanced",
    sourceUrl: "https://www.youtube.com/watch?v=8SG80SSkyGU",
  },
];

export const youtubeSearches = [
  {
    label: "Search YouTube: Nuke ACES",
    href: "https://www.youtube.com/results?search_query=Nuke+ACES+color+management+tutorial",
  },
  {
    label: "Search YouTube: ACEScg Nuke",
    href: "https://www.youtube.com/results?search_query=ACEScg+Nuke+workflow+tutorial",
  },
  {
    label: "Search YouTube: OCIO Nuke",
    href: "https://www.youtube.com/results?search_query=OpenColorIO+Nuke+ACES+tutorial",
  },
  {
    label: "Search YouTube: EXR ACES VFX",
    href: "https://www.youtube.com/results?search_query=EXR+ACES+VFX+compositing+workflow",
  },
];

export const totalStarterXp = topics.reduce((sum, topic) => sum + topic.xp, 0);
