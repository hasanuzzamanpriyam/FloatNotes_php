document.getElementById('addNoteBtn').addEventListener('click', function() {
    addNote();
});

function addNote() {
    const noteContainer = document.getElementById('noteContainer');
    const note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = '<textarea></textarea>';

    // Set random position
    const containerRect = noteContainer.getBoundingClientRect();
    const randomTop = Math.random() * (containerRect.height - 150);
    const randomLeft = Math.random() * (containerRect.width - 200);
    note.style.top = `${randomTop}px`;
    note.style.left = `${randomLeft}px`;

    noteContainer.appendChild(note);

    makeDraggable(note);

    // Save new note to the database
    saveNoteToDatabase(note);
}

function makeDraggable(note) {
    let isDragging = false;

    note.addEventListener('mousedown', function(e) {
        isDragging = true;
        let offsetX = e.clientX - note.offsetLeft;
        let offsetY = e.clientY - note.offsetTop;

        function onMouseMove(e) {
            if (isDragging) {
                note.style.left = `${e.clientX - offsetX}px`;
                note.style.top = `${e.clientY - offsetY}px`;
            }
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // Update note position in the database
            updateNotePosition(note);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

function saveNoteToDatabase(note) {
    const content = note.querySelector('textarea').value;
    const positionTop = parseInt(note.style.top);
    const positionLeft = parseInt(note.style.left);

    fetch('save_note.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, positionTop, positionLeft })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            note.dataset.id = data.id; // Set the note ID for future reference
        } else {
            console.error('Error saving note:', data.message);
        }
    });
}

function updateNotePosition(note) {
    const id = note.dataset.id;
    const content = note.querySelector('textarea').value; // Capture the updated content
    const positionTop = parseInt(note.style.top);
    const positionLeft = parseInt(note.style.left);

    fetch('update_note.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, content, positionTop, positionLeft }) // Include content in the update request
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            console.error('Error updating note position:', data.message);
        }
    });
}
