import { reactive } from 'vue'

const starterData = {
  sessions: [
    {
      id: 'session-101',
      title: 'Sunrise trail run',
      activity: 'Running',
      date: '2026-09-28',
      durationMinutes: 42,
      notes: 'Easy pace along the river. Felt strong on the final hill.',
    },
    {
      id: 'session-102',
      title: 'Strength foundations',
      activity: 'Strength',
      date: '2026-09-25',
      durationMinutes: 55,
      notes: 'Squats, rows, and presses. Focused on controlled movement.',
    },
    {
      id: 'session-103',
      title: 'Pool intervals',
      activity: 'Swimming',
      date: '2026-09-22',
      durationMinutes: 35,
      notes: 'Eight steady lengths with short rests.',
    },
  ],
  ratings: [
    {
      id: 'rating-201',
      sessionId: 'session-101',
      title: 'A good start to the week',
      rating: 8,
      mood: 'Energised',
      comment: 'The cool morning made the run especially enjoyable.',
    },
    {
      id: 'rating-202',
      sessionId: 'session-102',
      title: 'Steady progress',
      rating: 7,
      mood: 'Focused',
      comment: 'Good form throughout. Ready to add a little weight next time.',
    },
  ],
}

function loadCollection(name) {
  const stored = localStorage.getItem(`fieldnotes-${name}`)
  return stored ? JSON.parse(stored) : starterData[name]
}

export const database = reactive({
  sessions: loadCollection('sessions'),
  ratings: loadCollection('ratings'),
})

export function addDocument(collection, document) {
  database[collection].unshift({
    id: `${collection.slice(0, -1)}-${Date.now()}`,
    ...document,
  })
  localStorage.setItem(`fieldnotes-${collection}`, JSON.stringify(database[collection]))
}
