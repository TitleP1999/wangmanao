import type { Partner } from "@/content/company";

export function PartnerIdentity({ partner }: { partner: Partner }) {
  return (
    <div className="partner-identity">
      <div className="partner-artwork">
        <img
          src={partner.image}
          alt=""
          width={160}
          height={72}
          loading="lazy"
        />
      </div>
      <span className="partner-name">{partner.name}</span>
    </div>
  );
}
