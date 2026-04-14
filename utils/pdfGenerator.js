const PDFDocument = require("pdfkit");

exports.generateTicket = (res, booking) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=ticket.pdf"
  );

  doc.pipe(res);

  doc.fontSize(22).text("Bus Ticket", 100, 100);
  doc.text(`Passenger: ${booking.passenger_name}`);
  doc.text(`Bus: ${booking.bus_id}`);
  doc.text(`Seat: ${booking.seat_number}`);

  doc.end();
};