# Bike Parts Shop Billing Software

A lightweight browser-based billing system for a bike parts store.

## Features
- Inventory management (barcode, part details, stock, category, brand).
- Add items to bill via barcode scanner (keyboard mode) or camera scan.
- Real-time totals with discount and tax.
- Customer and shop details on invoice.
- Payment method tracking.
- Invoice saving and history (stored in browser localStorage).
- Printable invoice with one click.

## Run
Open `index.html` directly in a modern browser.

## Barcode Scanning
1. **USB/Bluetooth scanner (keyboard wedge):**
   - Click `Scan/Input Barcode` field.
   - Scan barcode and press Enter (or scanner sends Enter automatically).
   - Item is added to bill.
2. **Camera scanner:**
   - Click `Start Camera Scan`.
   - Allow camera permission.
   - If browser supports BarcodeDetector, scanned code is auto-added.

## Notes
- Data is saved locally in browser storage.
- To integrate with backend/database later, replace localStorage calls in `app.js`.
