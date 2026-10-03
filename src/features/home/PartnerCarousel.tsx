"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { partners } from "@/content/company";
import { PartnerIdentity } from "@/components/ui/PartnerIdentity";

export function PartnerCarousel() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="partner-carousel">
      <div className="partner-strip" data-paused={paused}>
        <div
          className="partner-track"
          style={{ animationDuration: `${partners.length * 4.7}s` }}
        >
          {[false, true].map((duplicate) => (
            <div
              className="partner-group"
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
            >
              {partners.map((partner) => (
                <div className="partner-logo" key={partner.name}>
                  <PartnerIdentity partner={partner} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="partner-pause"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "เล่นสไลด์โลโก้ต่อ" : "หยุดสไลด์โลโก้ชั่วคราว"}
        aria-pressed={paused}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
      </button>
    </div>
  );
}
