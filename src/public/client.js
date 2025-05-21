var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
// Populate entry HTML from JSON
function populate(data) {
    let entries = document.getElementById("guestbook-entries");
    if (!entries)
        return;
    entries.innerHTML = ""; // Clear existing entries
    for (let entry of data.reverse()) {
        let row = document.createElement("tr");
        row.className = "entry";
        let msg = document.createElement("td");
        msg.innerText = entry.message;
        msg.className = "entry-message";
        let name = document.createElement("td");
        name.innerText = entry.name;
        name.className = "entry-name";
        row.appendChild(name);
        row.appendChild(msg);
        entries.appendChild(row);
    }
}
// Fetch entries from server, populate HTML
function refresh_entries() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch("/entries");
        let data = yield res.text();
        populate(JSON.parse(data));
    });
}
// On submit, post entry, refresh the entry list
(_a = document.getElementById("guestbook-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let name = document.getElementById("name").value;
        let message = document.getElementById("message").value;
        yield fetch("/entry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message }),
        });
        document.getElementById("guestbook-form").reset();
        refresh_entries();
    });
});
// Initial load
refresh_entries();
export {};
