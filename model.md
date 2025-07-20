```
model TravelPlan {
  id                 String     @id @default(cuid())
  userId             String
  user               User       @relation("UserTravelPlans", fields: [userId], references: [id])

  title              String
  isPublic           Boolean    @default(false)
  minBudget          Float?
  maxBudget          Float?

  travelSteps        Json       // Her adım: lokasyon, tarih, ulaşım, süre, maliyet ve konaklama tercihi içerir

  interests          Interest[]

  appliedCampaigns   Campaign[] @relation("AppliedCampaigns")
  recommendations    Json       // Place ve etkinlik önerileri (ör: places[], events[])
  reviews            Review[]   @relation("TravelPlanReviews")

  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt
}


"travelSteps": [
  {
    "country": "İtalya",
    "city": "Roma",
    "district": "Trastevere",
    "arrivalDate": "2025-08-01",
    "departureDate": "2025-08-04",
    "transport": "Plane",
    "travelDurationMinutes": 120,
    "travelCost": 150.0
  },
  {
    "country": "Fransa",
    "city": "Paris",
    "district": "Montmartre",
    "arrivalDate": "2025-08-04",
    "departureDate": "2025-08-09",
    "transport": "Train",
    "travelDurationMinutes": 240,
    "travelCost": 80.0
  }
]

"recommendations": {
  "places": [
    { "id": "place1", "name": "Müze", "category": "museum" },
    { "id": "place2", "name": "Kafe", "category": "cafe" }
  ],
  "events": [
    { "id": "event1", "name": "Rock Festivali", "type": "concert", "date": "2025-08-12" },
    { "id": "event2", "name": "Yaz Karnavalı", "type": "festival", "date": "2025-08-14" }
  ]
}

```