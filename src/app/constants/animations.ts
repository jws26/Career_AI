/**
 * Motion 애니메이션 variants
 * 프로젝트 전체에서 일관된 애니메이션 효과 제공
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VariantWithCustom = Record<string, any>;

export const fadeUp: VariantWithCustom = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const fadeIn: VariantWithCustom = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};

export const slideLeft: VariantWithCustom = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const scaleUp: VariantWithCustom = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};
