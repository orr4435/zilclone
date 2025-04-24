export interface Property {
  id: string;
  requestNumber: string;
  address: string;
  city: string;
  streetCode: string;
  streetName: string;
  houseNumber: string;
  entrance: string;
  block: string;
  parcel: string;
  plot: string;
  event: string;
  eventDate: string;
  mainUsage: string;
  requestDescription: string;
  requesterDetails: string;
  mainArea: number;
  serviceArea: number;
  existingUnits: number;
  requestedUnits: number;
  otherArea: string;
  height: number;
  contractor: string;
  daysFromSubmission: number;
  lastCommittee: string;
  lastMeeting: string;
  handler: string;
  permitNumber: string;
  holder: string;
  notes: string;
  relatedRequestNumber: string;
  agreement: string;
  agreementDescription: string;
  latitude: number;
  longitude: number;
}

export interface PropertyMarker {
  id: string;
  position: [number, number];
  address: string;
  mainUsage: string;
}