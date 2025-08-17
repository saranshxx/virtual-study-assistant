// Theme change
document.getElementById('themeSelector').addEventListener('change', e => {
  document.body.className = "theme-" + e.target.value;
});

// Tasks
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const priority = document.getElementById('prioritySelect').value;
  if (!taskInput.value) return;
  const li = document.createElement('li');
  li.textContent = `${taskInput.value} [${priority}]`;
  li.onclick = () => li.style.textDecoration = "line-through";
  document.getElementById('taskList').appendChild(li);
  taskInput.value = '';
}

// Pomodoro Timer
let pomodoroTime = 25 * 60;
let pomodoroInterval;
function startPomodoro() {
  if (pomodoroInterval) return;
  pomodoroInterval = setInterval(() => {
    pomodoroTime--;
    updateTimer();
    if (pomodoroTime <= 0) {
      clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      alert("Time's up!");
    }
  }, 1000);
}
function resetPomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  pomodoroTime = 25 * 60;
  updateTimer();
}
function updateTimer() {
  const minutes = Math.floor(pomodoroTime / 60);
  const seconds = pomodoroTime % 60;
  document.getElementById('timerDisplay').textContent = `${minutes}:${seconds.toString().padStart(2,'0')}`;
}
updateTimer();

// Notes
function addNote() {
  const noteInput = document.getElementById('noteInput');
  if (!noteInput.value) return;
  const div = document.createElement('div');
  div.textContent = noteInput.value;
  document.getElementById('notesContainer').appendChild(div);
  noteInput.value = '';
}

// Flashcards
let flashcards = [];
function addFlashcard() {
  const q = document.getElementById('flashQ').value;
  const a = document.getElementById('flashA').value;
  if (!q || !a) return;
  const card = document.createElement('div');
  card.textContent = q;
  card.style.border = "1px solid white";
  card.style.padding = "5px";
  card.onclick = () => card.textContent = (card.textContent === q ? a : q);
  document.getElementById('flashcardContainer').appendChild(card);
  flashcards.push({q, a});
}

// Timetable generator
const times = ["8-9 AM", "9-10 AM", "10-11 AM", "11-12 PM", "12-1 PM", "1-2 PM", "2-3 PM", "3-4 PM"];
const tbody = document.getElementById('timetableBody');
times.forEach(time => {
  const row = document.createElement('tr');
  const timeCell = document.createElement('td');
  timeCell.textContent = time;
  row.appendChild(timeCell);
  for (let i=0; i<7; i++) {
    const cell = document.createElement('td');
    cell.contentEditable = true;
    row.appendChild(cell);
  }
  tbody.appendChild(row);
});
