let slot1 = 0;
let slot2 = 0;

function updateSlot(slotNumber, value) {

    let element = document.getElementById("slot" + slotNumber + "Status");

    if (value === 1) {
        element.innerText = "OCCUPIED";
        element.className = "status occupied";
    } else {
        element.innerText = "AVAILABLE";
        element.className = "status available";
    }
}

function updateSummary() {

    let occupied = slot1 + slot2;
    let available = 2 - occupied;

    document.getElementById("occupiedSlots").innerText = occupied;
    document.getElementById("availableSlots").innerText = available;
}

async function getParkingData() {

    try {

        const response = await fetch("/api/status");
        const data = await response.json();

        slot1 = data.slot1;
        slot2 = data.slot2;

        updateSlot(1, slot1);
        updateSlot(2, slot2);
        updateSummary();

    } catch (error) {

        console.log("Error getting parking data:", error);

    }
}

// Get data immediately
getParkingData();

// Update every 2 seconds
setInterval(getParkingData, 2000);