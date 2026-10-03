import { Building2, Handshake } from "lucide-react";
import type { Partner } from "@/content/company";

/** Missing artwork uses a neutral icon; never impersonate a partner's logo. */
export function PartnerIdentity({ partner }: { partner: Partner }) {
  const Icon = partner.kind === "cooperative" ? Handshake : Building2;
  return (
    <div className="partner-identity">
      <div className="partner-artwork">
        {partner.image ? (
          <img
            src={partner.image}
            alt=""
            width={160}
            height={72}
            loading="lazy"
          />
        ) : (
          <span className="partner-neutral-mark" aria-hidden="true">
            <Icon size={34} strokeWidth={1.35} />
          </span>
        )}
      </div>
      <span className="partner-name">{partner.name}</span>
    </div>
  );
}
