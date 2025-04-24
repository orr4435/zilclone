import axios from 'axios';
import { Property } from '../types/property';

// The Google Sheets API endpoint for your specific sheet
// Using the direct CSV export URL format
const SHEET_ID = '1pOObxqnLmQCgex1g6tFWZ_wgH3mUanl5TvHKOTyzF8E';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Mapping between the sheet columns and our property fields
const mapSheetRowToProperty = (row: string[]): Property => {
  return {
    id: row[0] || '',
    requestNumber: row[1] || '',
    address: row[3] || '',
    city: row[4] || '',
    streetCode: row[5] || '',
    streetName: row[6] || '',
    houseNumber: row[7] || '',
    entrance: row[8] || '',
    block: row[9] || '',
    parcel: row[10] || '',
    plot: row[11] || '',
    event: row[12] || '',
    eventDate: row[13] || '',
    mainUsage: row[14] || '',
    requestDescription: row[15] || '',
    requesterDetails: row[16] || '',
    mainArea: parseFloat(row[17]) || 0,
    serviceArea: parseFloat(row[18]) || 0,
    existingUnits: parseFloat(row[19]) || 0,
    requestedUnits: parseFloat(row[20]) || 0,
    otherArea: row[21] || '',
    height: parseFloat(row[22]) || 0,
    contractor: row[23] || '',
    daysFromSubmission: parseFloat(row[24]) || 0,
    lastCommittee: row[25] || '',
    lastMeeting: row[26] || '',
    handler: row[27] || '',
    permitNumber: row[28] || '',
    holder: row[29] || '',
    notes: row[30] || '',
    relatedRequestNumber: row[31] || '',
    agreement: row[32] || '',
    agreementDescription: row[33] || '',
    latitude: parseFloat(row[34]) || 0,
    longitude: parseFloat(row[35]) || 0
  };
};

// Parse CSV data
const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.split('\n');
  return lines.map(line => {
    // Handle commas within quoted strings
    const result = [];
    let inQuotes = false;
    let currentField = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(currentField);
        currentField = '';
      } else {
        currentField += char;
      }
    }
    
    result.push(currentField);
    return result;
  });
};

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    // Direct request to the Google Sheets CSV export URL
    const response = await axios.get(SHEET_URL);
    const csvData = response.data;
    const rows = parseCSV(csvData);
    
    // Skip the header row
    const properties = rows.slice(1).map(row => mapSheetRowToProperty(row));
    
    // Filter out incomplete entries (must have coordinates)
    return properties.filter(p => p.latitude && p.longitude);
  } catch (error) {
    console.error('Error fetching properties:', error);
    
    // For development/demonstration purposes, return mock data
    return getMockProperties();
  }
};

// Mock data for development and backup
const getMockProperties = (): Property[] => {
  return [
    {
      id: '2014657',
      requestNumber: '',
      address: 'החילזון 12',
      city: 'רמת-גן',
      streetCode: '409',
      streetName: 'החילזון',
      houseNumber: '12',
      entrance: '0',
      block: '6109',
      parcel: '365',
      plot: '',
      event: 'הפקת טופס 4',
      eventDate: '1/5/2016',
      mainUsage: 'משרדים + מסחרי',
      requestDescription: 'שינויים',
      requesterDetails: 'הראל חברה לביטוח בע"',
      mainArea: 5,
      serviceArea: 0,
      existingUnits: 0,
      requestedUnits: 0,
      otherArea: '',
      height: 0,
      contractor: 'יוסי מזרחי - מנהל מח\' פיקוח על הבניה - לא פעיל',
      daysFromSubmission: 498,
      lastCommittee: 'ועדת רשות רישוי לתכנון ולבניה',
      lastMeeting: '2014031',
      handler: '',
      permitNumber: '2015001',
      holder: 'לא ידוע',
      notes: '',
      relatedRequestNumber: '',
      agreement: '',
      agreementDescription: '',
      latitude: 31.86602900,
      longitude: 34.74268300
    },
    {
      id: '2012212',
      requestNumber: '',
      address: 'הגולן 5',
      city: 'רמת-גן',
      streetCode: '1657',
      streetName: 'הגולן',
      houseNumber: '5',
      entrance: '0',
      block: '6183',
      parcel: '250',
      plot: '',
      event: 'הפקת טופס 4',
      eventDate: '1/10/2016',
      mainUsage: 'מגורים',
      requestDescription: 'תוספת דירה',
      requesterDetails: 'צפורה ורמי דהרי',
      mainArea: 84.98,
      serviceArea: 16,
      existingUnits: 8,
      requestedUnits: 1,
      otherArea: '41',
      height: 0,
      contractor: 'יוסי מזרחי - מנהל מח\' פיקוח על הבניה - לא פעיל',
      daysFromSubmission: 1386,
      lastCommittee: 'ועדת רשות רישוי לתכנון ולבניה',
      lastMeeting: '2012018',
      handler: '',
      permitNumber: '2013284',
      holder: 'לא ידוע',
      notes: '',
      relatedRequestNumber: '',
      agreement: '',
      agreementDescription: '',
      latitude: 31.86657600,
      longitude: 34.74277800
    },
    {
      id: '2012213',
      requestNumber: '',
      address: 'בן גוריון 20',
      city: 'רמת-גן',
      streetCode: '155',
      streetName: 'בן גוריון',
      houseNumber: '20',
      entrance: '0',
      block: '6183',
      parcel: '251',
      plot: '',
      event: 'הפקת טופס 4',
      eventDate: '5/5/2016',
      mainUsage: 'מגורים',
      requestDescription: 'בניה חדשה',
      requesterDetails: 'חברת בניה אלפא',
      mainArea: 250,
      serviceArea: 30,
      existingUnits: 0,
      requestedUnits: 6,
      otherArea: '80',
      height: 20,
      contractor: 'אבי לוי בניה',
      daysFromSubmission: 450,
      lastCommittee: 'ועדת רשות רישוי לתכנון ולבניה',
      lastMeeting: '2012020',
      handler: '',
      permitNumber: '2014001',
      holder: 'חברת בניה אלפא',
      notes: '',
      relatedRequestNumber: '',
      agreement: '',
      agreementDescription: '',
      latitude: 31.86700000,
      longitude: 34.74300000
    }
  ];
};