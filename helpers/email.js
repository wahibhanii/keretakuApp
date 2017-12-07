const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service : 'gmail',
  secure  : false,
  port    : 5432,
  auth    : {
    user: 'keretakuapp@gmail.com',
    pass: 'keretakuapp123'
  },
  tls:{
    rejectUnauthorized: false
  }
});

function sendBookingInfo(bookingInfo){

  let HelperOptions = {
    from    : "KeretakuApp" <'keretakuapp@gmail.com',
    to      : bookingInfo.email,
    subject : "E-Booking Tiket Anda - No. Pemesanan",
    text    : `
  Dear Pelanggan Yang Terhormat
  Berikut adalah E-booking tiket Anda
  
    Detail Pemasanan 

  - User E-mail        : ${bookingInfo.email}
  - Kode Booking    : #KAPP${bookingInfo.UserId}/${bookingInfo.TrainRouteId}
  - Nama Kereta     : ${bookingInfo.trainName}
  - Kota Asal         : ${bookingInfo.departure}
  - Kota Tujuan       : ${bookingInfo.arrival}
  
  Atur pesanan Anda dengan penuh kenyamanan
  Akses e-tiket dan ubah pesanan kapan saja, bebas repot`

  };
  
  transporter.sendMail(HelperOptions, (err, info)=>{
    if(err){
       return console.log(err);
    } else {
      console.log("The message was sent!");
      console.log(info);
    }
  });

  
}

module.exports = sendBookingInfo
// let HelperOptions = {
//   from : "KeretakuApp" <'keretakuapp@gmail.com',
//   to : 'tobiaskusnaman@gmail.com',
//   subject : "E-Booking Tiket Anda - No. Pemesanan",
//   text : 'Dear pelanggan'

/*
Dear [Nama pelanggan],
Berikut adalah E-booking tiket Anda, mohon lakukan pembayaran

Detail Pemasanan :


Atur pesanan Anda dengan penuh kenyamanan
Akses e-tiket dan ubah pesanan kapan saja, bebas repot
*/

// };

// transporter.sendMail(HelperOptions, (err, info)=>{
//   if(err){
//      return console.log(err);
//   } else {
//     console.log("The message was sent!");
//     console.log(info);
//   }
// });
