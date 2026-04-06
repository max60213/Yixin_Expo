import { DurationCard } from "./DurationCard";
import { LocationCard } from "./LocationCard";
import { TimeCard } from "./TimeCard";
import { PriceCard } from "./PriceCard";

export interface EventInfo {
  duration?: {
    startDate: string;
    endDate: string;
  };
  location?: string;
  openingHours?: Array<{
    day: string;
    time: string;
  }>;
  note?: string;
  pricing?: Array<{
    type: string;
    price: string;
  }>;
  priceNote?: string;
}

export const EventInfoSection = ({ info }: { info: EventInfo }) => (
  <>
    {info.duration && (
      <DurationCard
        type="multi-day"
        startDate={info.duration.startDate}
        endDate={info.duration.endDate}
      />
    )}

    {info.location && (
      <LocationCard
        location={info.location}
        hasGuidMap={true}
        hasMap={true}
      />
    )}

    {info.openingHours && (
      <TimeCard
        openingHours={info.openingHours}
        note={info.note}
      />
    )}

    {info.pricing && (
      <PriceCard
        pricing={info.pricing}
        priceNote={info.priceNote}
        hasTicketButton={true}
      />
    )}
  </>
);
