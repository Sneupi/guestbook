import { ref } from "process";
import { Entry } from "../entry";

// Populate entry HTML from JSON
function populate(data: Array<Entry>) {
    let entries = document.getElementById("entries");
    if (!entries) return;
    entries.innerHTML = ""; // Clear existing entries

    for (let entry of data) {
        let div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `<p>${entry.name}: ${entry.message}</p>`;
        entries.appendChild(div);
    }
}

// Fetch entries from server, populate HTML
async function refresh_entries() {
    let res = await fetch("/entries");
    let data = await res.text();
    populate(JSON.parse(data));
}

// On submit, post entry, refresh the entry list
document.getElementById("guestbook-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    let name = (document.getElementById("name") as HTMLInputElement).value;
    let message = (document.getElementById("message") as HTMLInputElement).value;
    await fetch("/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
    });
    (document.getElementById("guestbook-form") as HTMLFormElement).reset();
    refresh_entries();
});

// Initial load
refresh_entries();