import React, { useState, useEffect } from "react";

export const NotesApp = ({
  accent = "#6366f1",
  bg = "#0f172a",
  initialNotes = [
    { id: 1, text: "First note", color: "#6366f1" },
    { id: 2, text: "Second note", color: "#059669" },
    { id: 3, text: "Third note", color: "#e11d48" }
  ]
}) => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [selectedColor, setSelectedColor] = useState(accent);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const colors = ["#6366f1", "#7c3aed", "#059669", "#e11d48", "#0ea5e9"];

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { 
        id: Date.now(), 
        text: newNote, 
        color: selectedColor 
      }]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const startEdit = (note) => {
    setIsEditing(note.id);
    setEditText(note.text);
  };

  const saveEdit = () => {
    setNotes(notes.map(note => 
      note.id === isEditing ? { ...note, text: editText } : note
    ));
    setIsEditing(null);
  };

  return (
    <div style={{
      background: bg,
      borderRadius: "20px",
      padding: "24px",
      width: "360px",
      fontFamily: "system-ui, sans-serif",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      border: "1px solid rgba(255,255,255,0.08)"
    }}>
      <h2 style={{
        color: "#fff",
        margin: "0 0 20px",
        fontSize: "20px",
        fontWeight: "700"
      }}>Notes</h2>
      
      <div style={{
        display: "flex",
        gap: "8px",
        marginBottom: "16px"
      }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: "14px",
            outline: "none"
          }}
          onKeyPress={(e) => e.key === "Enter" && addNote()}
        />
        <button
          onClick={addNote}
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: "none",
            background: accent,
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Add
        </button>
      </div>
      
      <div style={{
        display: "flex",
        gap: "6px",
        marginBottom: "16px"
      }}>
        {colors.map(color => (
          <div 
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: color,
              cursor: "pointer",
              border: selectedColor === color ? "2px solid #fff" : "none",
              boxShadow: selectedColor === color ? "0 0 0 2px " + alpha(color, 0.3) : "none"
            }}
          />
        ))}
      </div>
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxHeight: "400px",
        overflowY: "auto",
        paddingRight: "8px"
      }}>
        {notes.map(note => (
          <div 
            key={note.id}
            style={{
              background: alpha(note.color, 0.12),
              border: "1px solid " + alpha(note.color, 0.3),
              borderRadius: "12px",
              padding: "14px",
              position: "relative"
            }}
          >
            {isEditing === note.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid " + alpha(note.color, 0.5),
                  background: "rgba(0,0,0,0.2)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  marginBottom: "8px"
                }}
                autoFocus
              />
            ) : (
              <p style={{
                color: "#fff",
                margin: "0",
                fontSize: "14px",
                lineHeight: 1.5
              }}>{note.text}</p>
            )}
            
            <div style={{
              display: "flex",
              gap: "8px",
              marginTop: "12px",
              justifyContent: "flex-end"
            }}>
              {isEditing === note.id ? (
                <button
                  onClick={saveEdit}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background: note.color,
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(note)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
              )}
              
              <button
                onClick={() => deleteNote(note.id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "rgba(255,255,255,0.1)",
                  color: "#e11d48",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};