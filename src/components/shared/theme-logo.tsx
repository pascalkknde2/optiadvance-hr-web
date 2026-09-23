import Link from "next/link";

function ThemeLogo() {
  return (
    <Link href="/">
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, next/image's optimizer rejects local SVGs without extra config */}
      <img src="/logo/optiadvance-logo-refined.svg" alt="OptiAdvance" width={168} height={40} />
    </Link>
  );
}

export default ThemeLogo;
