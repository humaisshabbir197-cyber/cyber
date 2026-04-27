const inventoryKey = "bikeShopInventory";
const invoicesKey = "bikeShopInvoices";

let inventory = JSON.parse(localStorage.getItem(inventoryKey) || "[]");
let billItems = [];
let invoices = JSON.parse(localStorage.getItem(invoicesKey) || "[]");

let mediaStream = null;
let scanInterval = null;

const el = (id) => document.getElementById(id);

function seedInventory() {
  if (inventory.length > 0) return;
  inventory = [
    { barcode: "890100000101", name: "Hydraulic Brake Pads", brand: "Shimano", category: "Brakes", price: 18.5, stock: 30 },
    { barcode: "890100000102", name: "Derailleur Cable", brand: "SRAM", category: "Drivetrain", price: 6.25, stock: 50 },
    { barcode: "890100000103", name: "26x2.10 Tube", brand: "Maxxis", category: "Tires & Tubes", price: 9.99, stock: 40 },
  ];
  persistInventory();
}

function persistInventory() {
  localStorage.setItem(inventoryKey, JSON.stringify(inventory));
}

function persistInvoices() {
  localStorage.setItem(invoicesKey, JSON.stringify(invoices));
}

function generateInvoiceNo() {
  return `INV-${Date.now()}`;
}

function renderInventory() {
  const tbody = el("inventoryTableBody");
  tbody.innerHTML = inventory
    .map(
      (item) => `
      <tr>
        <td>${item.barcode}</td>
        <td>${item.name}</td>
        <td>${item.brand}</td>
        <td>${item.category}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${item.stock}</td>
      </tr>`
    )
    .join("");
}

function renderBill() {
  const tbody = el("billTableBody");
  tbody.innerHTML = billItems
    .map(
      (item, idx) => `
      <tr>
        <td>${item.barcode}</td>
        <td>${item.name}</td>
        <td>${item.brand}</td>
        <td>${item.price.toFixed(2)}</td>
        <td><input type="number" min="1" value="${item.qty}" data-idx="${idx}" class="qty-input" /></td>
        <td>${(item.price * item.qty).toFixed(2)}</td>
        <td><button data-remove="${idx}" class="danger">Remove</button></td>
      </tr>`
    )
    .join("");

  tbody.querySelectorAll(".qty-input").forEach((node) => {
    node.addEventListener("change", (e) => {
      const idx = Number(e.target.dataset.idx);
      billItems[idx].qty = Math.max(1, Number(e.target.value) || 1);
      renderBill();
      updateTotals();
    });
  });

  tbody.querySelectorAll("button[data-remove]").forEach((node) => {
    node.addEventListener("click", (e) => {
      const idx = Number(e.target.dataset.remove);
      billItems.splice(idx, 1);
      renderBill();
      updateTotals();
    });
  });
}

function renderInvoices() {
  const tbody = el("invoiceTableBody");
  tbody.innerHTML = invoices
    .slice()
    .reverse()
    .map(
      (inv) => `
      <tr>
        <td>${inv.invoiceNumber}</td>
        <td>${inv.date}</td>
        <td>${inv.customerName || "Walk-in"}</td>
        <td>${inv.items.length}</td>
        <td>${inv.grandTotal.toFixed(2)}</td>
        <td>${inv.paymentMethod}</td>
      </tr>`
    )
    .join("");
}

function updateTotals() {
  const subtotal = billItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountPct = Number(el("discountPercent").value) || 0;
  const taxPct = Number(el("taxPercent").value) || 0;
  const discountValue = subtotal * (discountPct / 100);
  const taxable = subtotal - discountValue;
  const taxValue = taxable * (taxPct / 100);
  const grandTotal = taxable + taxValue;

  el("subtotal").textContent = subtotal.toFixed(2);
  el("discountValue").textContent = discountValue.toFixed(2);
  el("taxValue").textContent = taxValue.toFixed(2);
  el("grandTotal").textContent = grandTotal.toFixed(2);

  return { subtotal, discountValue, taxValue, grandTotal, discountPct, taxPct };
}

function addOrUpdateInventoryItem() {
  const barcode = el("invBarcode").value.trim();
  const name = el("invName").value.trim();
  const brand = el("invBrand").value.trim();
  const category = el("invCategory").value;
  const price = Number(el("invPrice").value);
  const stock = Number(el("invStock").value);

  if (!barcode || !name || !brand || Number.isNaN(price) || Number.isNaN(stock)) {
    alert("Please fill barcode, name, brand, price and stock.");
    return;
  }

  const existing = inventory.find((item) => item.barcode === barcode);
  if (existing) {
    existing.name = name;
    existing.brand = brand;
    existing.category = category;
    existing.price = price;
    existing.stock = stock;
  } else {
    inventory.push({ barcode, name, brand, category, price, stock });
  }

  persistInventory();
  renderInventory();

  ["invBarcode", "invName", "invBrand", "invPrice", "invStock"].forEach((id) => (el(id).value = ""));
}

function findItemByBarcodeOrSearch(term) {
  const normalized = term.trim().toLowerCase();
  return inventory.find(
    (item) => item.barcode === term.trim() || item.name.toLowerCase().includes(normalized) || item.brand.toLowerCase().includes(normalized)
  );
}

function addToBill(item, qty = 1) {
  if (!item) {
    alert("Item not found in inventory.");
    return;
  }

  if (item.stock < qty) {
    alert(`Not enough stock. Available: ${item.stock}`);
    return;
  }

  const existing = billItems.find((row) => row.barcode === item.barcode);
  if (existing) {
    if (item.stock < existing.qty + qty) {
      alert(`Not enough stock. Available: ${item.stock}`);
      return;
    }
    existing.qty += qty;
  } else {
    billItems.push({ ...item, qty });
  }

  renderBill();
  updateTotals();
}

function addByBarcodeAction() {
  const code = el("scanBarcode").value.trim();
  const search = el("searchPart").value.trim();
  const qty = Math.max(1, Number(el("scanQty").value) || 1);
  const item = code ? inventory.find((i) => i.barcode === code) : findItemByBarcodeOrSearch(search);

  addToBill(item, qty);
  el("scanBarcode").value = "";
  el("searchPart").value = "";
  el("scanBarcode").focus();
}

function saveInvoice() {
  if (billItems.length === 0) {
    alert("Add items before saving invoice.");
    return;
  }

  const totals = updateTotals();
  const invoice = {
    invoiceNumber: el("invoiceNumber").value || generateInvoiceNo(),
    date: new Date().toISOString(),
    shopName: el("shopName").value,
    shopPhone: el("shopPhone").value,
    shopTaxId: el("shopTaxId").value,
    customerName: el("customerName").value,
    customerPhone: el("customerPhone").value,
    paymentMethod: el("paymentMethod").value,
    items: billItems.map((item) => ({ ...item })),
    ...totals,
  };

  // reduce stock
  invoice.items.forEach((line) => {
    const inv = inventory.find((item) => item.barcode === line.barcode);
    if (inv) inv.stock -= line.qty;
  });

  invoices.push(invoice);
  persistInventory();
  persistInvoices();
  renderInventory();
  renderInvoices();

  alert(`Invoice ${invoice.invoiceNumber} saved.`);
}

function clearBill() {
  if (!confirm("Clear current bill?")) return;
  billItems = [];
  renderBill();
  updateTotals();
}

function printInvoice() {
  window.print();
}

async function startCameraScan() {
  if (!("BarcodeDetector" in window)) {
    el("scanStatus").textContent = "BarcodeDetector not supported. Use scanner in keyboard mode.";
    return;
  }

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    const video = el("cameraPreview");
    video.srcObject = mediaStream;
    video.style.display = "block";

    const detector = new BarcodeDetector({ formats: ["ean_13", "code_128", "qr_code"] });
    el("scanStatus").textContent = "Camera scanner running...";
    el("startCameraScanBtn").disabled = true;
    el("stopCameraScanBtn").disabled = false;

    scanInterval = setInterval(async () => {
      const barcodes = await detector.detect(video);
      if (barcodes.length > 0) {
        const code = barcodes[0].rawValue;
        el("scanBarcode").value = code;
        addByBarcodeAction();
        el("scanStatus").textContent = `Scanned: ${code}`;
      }
    }, 1200);
  } catch (err) {
    el("scanStatus").textContent = `Camera scan failed: ${err.message}`;
  }
}

function stopCameraScan() {
  if (scanInterval) clearInterval(scanInterval);
  scanInterval = null;

  if (mediaStream) {
    mediaStream.getTracks().forEach((t) => t.stop());
    mediaStream = null;
  }

  el("cameraPreview").style.display = "none";
  el("scanStatus").textContent = "Scanner idle.";
  el("startCameraScanBtn").disabled = false;
  el("stopCameraScanBtn").disabled = true;
}

function bindEvents() {
  el("addInventoryBtn").addEventListener("click", addOrUpdateInventoryItem);
  el("addByBarcodeBtn").addEventListener("click", addByBarcodeAction);
  el("saveInvoiceBtn").addEventListener("click", saveInvoice);
  el("clearBillBtn").addEventListener("click", clearBill);
  el("printInvoiceBtn").addEventListener("click", printInvoice);
  el("discountPercent").addEventListener("input", updateTotals);
  el("taxPercent").addEventListener("input", updateTotals);
  el("startCameraScanBtn").addEventListener("click", startCameraScan);
  el("stopCameraScanBtn").addEventListener("click", stopCameraScan);

  el("scanBarcode").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addByBarcodeAction();
  });

  el("invoiceNumber").value = generateInvoiceNo();
}

function init() {
  seedInventory();
  bindEvents();
  renderInventory();
  renderBill();
  renderInvoices();
  updateTotals();
}

init();
