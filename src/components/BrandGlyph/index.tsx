interface BrandGlyphProps {
  className?: string;
}

const BrandGlyph: React.FC<BrandGlyphProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M9.25 10.25h8.5a4 4 0 0 1 4 4v7.5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.25 21.75h-2a4 4 0 0 1-4-4v-7.5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <rect x="3.5" y="4.5" width="8" height="8" rx="3.1" fill="currentColor" fillOpacity=".96" />
    <rect x="20.5" y="19.5" width="8" height="8" rx="3.1" fill="currentColor" fillOpacity=".96" />
    <path d="M11.5 8.5h5.75" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="m15.5 5.75 2.75 2.75-2.75 2.75" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default BrandGlyph;
