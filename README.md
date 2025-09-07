# Sticky Notes App with Redux Toolkit

A modern note-taking application built with React, Redux Toolkit, and a Node.js/Express backend with SQLite database.

## Features

- ✅ **Create Notes**: Add new sticky notes with title and content
- ✅ **View All Notes**: Display all notes in a responsive grid layout
- ✅ **Edit Notes**: Inline editing with real-time updates
- ✅ **Delete Notes**: Remove notes with confirmation
- ✅ **Redux Toolkit Integration**: State management with async thunks
- ✅ **API Integration**: Full CRUD operations with backend
- ✅ **Form Validation**: Zod schema validation
- ✅ **Modern UI**: Beautiful sticky note design with Tailwind CSS
- ✅ **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management with async thunks
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── CreateNoteForm.jsx    # Note creation form
│   │   ├── Header.jsx            # Navigation header
│   │   └── NoteCard.jsx          # Individual note display/edit
│   ├── pages/
│   │   ├── CreateNote.jsx        # Create note page
│   │   └── ViewNotes.jsx         # View all notes page
│   ├── store/
│   │   ├── index.js              # Redux store configuration
│   │   ├── Base-url.js           # API base URL
│   │   └── slice/
│   │       └── slice.js          # Redux Toolkit slice with async thunks
│   ├── schema/
│   │   └── notes.js              # Zod validation schema
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # App entry point
├── server/
│   ├── routes/
│   │   └── notes.js              # API routes for CRUD operations
│   ├── db.js                     # Database configuration
│   └── index.js                  # Express server
└── package.json
```

## Redux Toolkit Implementation

The app uses Redux Toolkit with async thunks for API operations:

### Async Thunks
- `fetchsend` - Create a new note
- `fetchNotes` - Fetch all notes
- `updateNote` - Update an existing note
- `deleteNote` - Delete a note

### State Management
- **Loading States**: Track API request status
- **Error Handling**: Display error messages
- **Optimistic Updates**: Immediate UI feedback
- **Data Persistence**: Sync with backend

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Week14_NoteTakingApp_Redux_Toolkit
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:3001`

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the application

## Usage

1. **Create a Note**: Click "Create" in the header or navigate to the home page
2. **Add Content**: Fill in the title and content fields
3. **Save**: Click "Save Note" to create the note
4. **View Notes**: Click "View All" to see all your notes
5. **Edit**: Click the edit icon on any note to modify it
6. **Delete**: Click the trash icon to remove a note

## Features in Detail

### Create Note
- Form validation with Zod schema
- Real-time error feedback
- Success message with auto-redirect
- Loading states during submission

### View Notes
- Responsive grid layout
- Loading and error states
- Empty state with call-to-action
- Real-time updates after operations

### Edit Note
- Inline editing interface
- Save and cancel options
- Validation before saving
- Loading states during update

### Delete Note
- Confirmation dialog
- Optimistic UI updates
- Error handling

## Database Schema

```sql
CREATE TABLE notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

## Error Handling

- **Frontend**: User-friendly error messages with retry options
- **Backend**: Proper HTTP status codes and error responses
- **Validation**: Client and server-side validation
- **Network**: Graceful handling of network failures

## Performance Features

- **Optimistic Updates**: Immediate UI feedback
- **Loading States**: Clear indication of ongoing operations
- **Error Boundaries**: Graceful error handling
- **Rate Limiting**: API protection against abuse

## Future Enhancements

- [ ] Search and filter notes
- [ ] Categories/tags for notes
- [ ] Rich text editing
- [ ] Image attachments
- [ ] User authentication
- [ ] Note sharing
- [ ] Dark mode theme
- [ ] Offline support with service workers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
