export const viewportRanges = {
  compact: {
    min: 320,
    max: 767,
  },
  regular: {
    min: 768,
    max: 1399,
  },
  wide: {
    min: 1400,
  },
} as const;

export const layoutMetrics = {
  commandBarHeight: {
    compact: 56,
    regular: 64,
  },
  toolRailWidth: 56,
  inspectorWidth: 288,
  canvasPadding: {
    compact: 16,
    regular: 24,
    wide: 32,
  },
  mobileToolbarHeight: 64,
  mobileSheetMaxViewportHeight: 72,
  controlHeight: {
    default: 36,
    primary: 40,
    touch: 44,
  },
  iconSize: {
    default: 16,
    touch: 20,
  },
  gap: {
    inline: 8,
    group: 16,
    regionRegular: 24,
    regionWide: 32,
  },
} as const;

export const canvasSizes = {
  default: {
    width: 750,
    height: 420,
  },
  portrait: {
    width: 540,
    height: 720,
  },
} as const;

export type ViewportRange = keyof typeof viewportRanges;
export type CanvasLayout = keyof typeof canvasSizes;
