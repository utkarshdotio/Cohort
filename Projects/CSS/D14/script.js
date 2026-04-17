const STORAGE_KEY = "cashbook-tracker-v1";
const currency = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

const now = new Date();
const monthInputValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

const elements = {
  monthTitle: document.getElementById("monthTitle"),
  monthFilter: document.getElementById("monthFilter"),
  categoryFilter: document.getElementById("categoryFilter"),
  typeFilter: document.getElementById("typeFilter"),
  searchInput: document.getElementById("searchInput"),
  openInForm: document.getElementById("openInForm"),
  openOutForm: document.getElementById("openOutForm"),
  entryForm: document.getElementById("entryForm"),
  cancelForm: document.getElementById("cancelForm"),
  detail: document.getElementById("detail"),
  category: document.getElementById("category"),
  mode: document.getElementById("mode"),
  amount: document.getElementById("amount"),
  entryDate: document.getElementById("entryDate"),
  entriesTable: document.getElementById("entriesTable"),
  entriesCount: document.getElementById("entriesCount"),
  emptyState: document.getElementById("emptyState"),
  cashInTotal: document.getElementById("cashInTotal"),
  cashOutTotal: document.getElementById("cashOutTotal"),
  netBalance: document.getElementById("netBalance")
};

let pendingType = "in";
let entries = loadEntries();

seedIfEmpty();
initialize();
render();

function initialize() {
  elements.monthFilter.value = monthInputValue;
  elements.entryDate.value = toDateTimeLocal(new Date());

  elements.openInForm.addEventListener("click", () => showForm("in"));
  elements.openOutForm.addEventListener("click", () => showForm("out"));

  elements.cancelForm.addEventListener("click", hideForm);

  elements.entryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const detail = elements.detail.value.trim();
    const category = elements.category.value;
    const mode = elements.mode.value;
    const amount = Number(elements.amount.value);
    const dateTime = elements.entryDate.value;

    if (!detail || !category || !mode || !amount || amount <= 0 || !dateTime) return;

    entries.unshift({
      id: crypto.randomUUID(),
      detail,
      category,
      mode,
      amount,
      type: pendingType,
      dateTime
    });

    persist();
    elements.entryForm.reset();
    elements.entryDate.value = toDateTimeLocal(new Date());
    hideForm();
    render();
  });

  [elements.monthFilter, elements.categoryFilter, elements.typeFilter].forEach((el) => {
    el.addEventListener("change", render);
  });

  elements.searchInput.addEventListener("input", render);

  elements.entriesTable.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.matches("[data-delete]")) return;

    const id = target.getAttribute("data-delete");
    entries = entries.filter((item) => item.id !== id);
    persist();
    render();
  });
}

function showForm(type) {
  pendingType = type;
  elements.entryForm.classList.remove("hidden");
  elements.entryForm.querySelector(".btn-primary").textContent = type === "in" ? "Save Cash In" : "Save Cash Out";
}

function hideForm() {
  elements.entryForm.classList.add("hidden");
}

function getFilteredEntries() {
  const month = elements.monthFilter.value;
  const category = elements.categoryFilter.value;
  const type = elements.typeFilter.value;
  const query = elements.searchInput.value.trim().toLowerCase();

  return entries.filter((item) => {
    const monthMatch = !month || item.dateTime.startsWith(month);
    const categoryMatch = category === "all" || item.category === category;
    const typeMatch = type === "all" || item.type === type;

    const queryMatch =
      !query ||
      item.detail.toLowerCase().includes(query) ||
      String(item.amount).includes(query) ||
      item.category.toLowerCase().includes(query);

    return monthMatch && categoryMatch && typeMatch && queryMatch;
  });
}

function render() {
  const filtered = getFilteredEntries().sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  renderMonthHeading();
  renderStats(filtered);
  renderRows(filtered);
}

function renderMonthHeading() {
  const value = elements.monthFilter.value || monthInputValue;
  const [year, month] = value.split("-").map(Number);
  const heading = new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  elements.monthTitle.textContent = heading;
}

function renderStats(list) {
  const cashIn = list.filter((item) => item.type === "in").reduce((sum, item) => sum + item.amount, 0);
  const cashOut = list.filter((item) => item.type === "out").reduce((sum, item) => sum + item.amount, 0);
  const net = cashIn - cashOut;

  elements.cashInTotal.textContent = currency.format(cashIn);
  elements.cashOutTotal.textContent = currency.format(cashOut);
  elements.netBalance.textContent = net.toLocaleString("en-IN");

  elements.netBalance.classList.remove("positive", "negative");
  elements.netBalance.classList.add(net >= 0 ? "positive" : "negative");
}

function renderRows(list) {
  elements.entriesTable.innerHTML = "";

  let runningBalance = 0;
  const ascending = [...list].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  const balanceMap = new Map();

  ascending.forEach((item) => {
    runningBalance += item.type === "in" ? item.amount : -item.amount;
    balanceMap.set(item.id, runningBalance);
  });

  list.forEach((item) => {
    const row = document.createElement("tr");
    const when = new Date(item.dateTime);

    row.innerHTML = `
      <td>${formatDateTime(when)}</td>
      <td>${escapeHtml(item.detail)}</td>
      <td>${item.category}</td>
      <td>${item.mode}</td>
      <td><span class="type-pill ${item.type === "in" ? "type-in" : "type-out"}">${item.type === "in" ? "Cash In" : "Cash Out"}</span></td>
      <td class="${item.type === "in" ? "amount-in" : "amount-out"}">${item.type === "in" ? "" : "-"}${currency.format(item.amount)}</td>
      <td>${balanceMap.get(item.id).toLocaleString("en-IN")}</td>
      <td><button class="delete-btn" data-delete="${item.id}">Delete</button></td>
    `;

    elements.entriesTable.appendChild(row);
  });

  elements.entriesCount.textContent = `Showing ${list.length} entr${list.length === 1 ? "y" : "ies"}`;
  elements.emptyState.style.display = list.length ? "none" : "block";
}

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function seedIfEmpty() {
  if (entries.length) return;

  entries = [
    {
      id: crypto.randomUUID(),
      detail: "Salary",
      category: "Salary",
      mode: "Bank",
      amount: 45000,
      type: "in",
      dateTime: `${monthInputValue}-05T10:15`
    },
    {
      id: crypto.randomUUID(),
      detail: "Groceries",
      category: "Food",
      mode: "UPI",
      amount: 2418,
      type: "out",
      dateTime: `${monthInputValue}-08T20:35`
    },
    {
      id: crypto.randomUUID(),
      detail: "Cab",
      category: "Transport",
      mode: "Cash",
      amount: 550,
      type: "out",
      dateTime: `${monthInputValue}-11T09:20`
    },
    {
      id: crypto.randomUUID(),
      detail: "Freelance Payment",
      category: "Other",
      mode: "Bank",
      amount: 12500,
      type: "in",
      dateTime: `${monthInputValue}-14T13:00`
    }
  ];

  persist();
}

function toDateTimeLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatDateTime(date) {
  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const timePart = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return `${datePart}, ${timePart}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
